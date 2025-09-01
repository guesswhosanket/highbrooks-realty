import fetch from 'node-fetch';

// Type definitions for Google Maps API responses
interface GeocodeResponse {
  results: {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';
}

interface PlacesNearbySearchResponse {
  results: Place[];
  status: 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';
}

interface PlaceDetailsResponse {
  result: any; // Can be more specific if needed
  status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Place {
  place_id: string;
  name: string;
  vicinity?: string;
  formatted_address?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  types: string[];
}

interface AlternativeLocation {
  name: string;
  address: string;
  coordinates: Coordinates;
  score: number;
  reasons: string[];
}

class GoogleMapsService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://maps.googleapis.com/maps/api';
  }

  async geocodeAddress(address: string): Promise<Coordinates> {
    const url = `${this.baseUrl}/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json() as GeocodeResponse;
      
      if (data.status !== 'OK' || !data.results.length) {
        throw new Error(`Geocoding failed: ${data.status}`);
      }
      
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }

  async getNearbyPlaces(coordinates: Coordinates, category: string, radius: number = 1000): Promise<Place[]> {
    // Map business categories to Google Places types
    const typeMapping: { [key: string]: string } = {
      'restaurant': 'restaurant',
      'cafe': 'cafe',
      'hotel': 'lodging',
      'hostel': 'lodging'
    };
    
    const type = typeMapping[category.toLowerCase()] || 'establishment';
    const url = `${this.baseUrl}/place/nearbysearch/json?location=${coordinates.lat},${coordinates.lng}&radius=${radius}&type=${type}&key=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json() as PlacesNearbySearchResponse;
      
      if (data.status !== 'OK') {
        console.warn(`Places search warning: ${data.status}`);
        return [];
      }
      
      return data.results || [];
    } catch (error) {
      console.error('Places search error:', error);
      return [];
    }
  }

  async getPlaceDetails(placeId: string): Promise<any> {
    const fields = 'name,formatted_address,geometry,rating,user_ratings_total,price_level,opening_hours,photos,reviews';
    const url = `${this.baseUrl}/place/details/json?place_id=${placeId}&fields=${fields}&key=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json() as PlaceDetailsResponse;
      
      if (data.status !== 'OK') {
        throw new Error(`Place details failed: ${data.status}`);
      }
      
      return data.result;
    } catch (error) {
      console.error('Place details error:', error);
      throw error;
    }
  }

  async findAlternativeLocations(lat: number, lng: number, category: string, count: number = 5): Promise<AlternativeLocation[]> {
    const alternatives: AlternativeLocation[] = [];
    
    // Search in multiple directions and distances
    const searchPoints = [
      { lat: lat + 0.01, lng: lng, name: 'North' },
      { lat: lat - 0.01, lng: lng, name: 'South' },
      { lat: lat, lng: lng + 0.01, name: 'East' },
      { lat: lat, lng: lng - 0.01, name: 'West' },
      { lat: lat + 0.005, lng: lng + 0.005, name: 'Northeast' },
      { lat: lat - 0.005, lng: lng - 0.005, name: 'Southwest' }
    ];
    
    for (const point of searchPoints) {
      try {
        const places = await this.getNearbyPlaces(point, category, 2000);
        
        for (const place of places.slice(0, 2)) {
          if (alternatives.length >= count) break;
          
          const score = this.calculateLocationScore(place);
          const reasons = this.generateScoreReasons(place, score);
          
          alternatives.push({
            name: place.name,
            address: place.vicinity || place.formatted_address || 'Address not available',
            coordinates: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            },
            score,
            reasons
          });
        }
        
        if (alternatives.length >= count) break;
      } catch (error) {
        console.warn(`Error searching ${point.name}:`, error);
      }
    }
    
    // Sort by score and return top alternatives
    return alternatives
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  private calculateLocationScore(place: Place): number {
    let score = 50; // Base score
    
    // Rating factor (0-5 stars)
    if (place.rating) {
      score += (place.rating - 2.5) * 10; // -25 to +25
    }
    
    // Reviews count factor
    if (place.user_ratings_total) {
      const reviewScore = Math.min(place.user_ratings_total / 100, 1) * 15; // 0 to 15
      score += reviewScore;
    }
    
    // Price level factor (lower is better for some categories)
    if (place.price_level !== undefined) {
      score += (3 - place.price_level) * 5; // Prefer mid-range pricing
    }
    
    // Type relevance
    const relevantTypes = ['restaurant', 'cafe', 'lodging', 'tourist_attraction'];
    const hasRelevantType = place.types.some(type => relevantTypes.includes(type));
    if (hasRelevantType) {
      score += 10;
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private generateScoreReasons(place: Place, score: number): string[] {
    const reasons: string[] = [];
    
    if (place.rating && place.rating >= 4.0) {
      reasons.push(`High rating (${place.rating}/5)`);
    }
    
    if (place.user_ratings_total && place.user_ratings_total > 100) {
      reasons.push(`Popular (${place.user_ratings_total} reviews)`);
    }
    
    if (place.price_level !== undefined) {
      const priceLabels = ['Free', 'Inexpensive', 'Moderate', 'Expensive', 'Very Expensive'];
      reasons.push(`${priceLabels[place.price_level]} pricing`);
    }
    
    if (score >= 75) {
      reasons.push('Excellent location score');
    } else if (score >= 60) {
      reasons.push('Good location potential');
    }
    
    return reasons;
  }

  async reverseGeocode(lat: number, lng: number): Promise<string> {
    const url = `${this.baseUrl}/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json() as GeocodeResponse;
      
      if (data.status !== 'OK' || !data.results.length) {
        throw new Error(`Reverse geocoding failed: ${data.status}`);
      }
      
      return data.results[0].formatted_address;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw error;
    }
  }
}

export default GoogleMapsService;
