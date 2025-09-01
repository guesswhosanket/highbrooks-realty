export interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
  score?: number;
}

export interface AnalysisMetrics {
  avgRevenue: number;
  tam: number; // Total Addressable Market
  expectedRevenue: number;
  footfall?: number;
  competitorCount?: number;
  populationDensity?: number;
  averageIncome?: number;
}

export interface Competitor {
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  rating?: number | null;
  user_ratings_total?: number;
  price_level?: number | null;
  website?: string | null;
  phone?: string | null;
  google_url?: string | null;
  footfall?: number;
  average_price_for_2?: number | null;
  revenue?: number | null;
}

export interface AnalysisResult {
  id: string;
  location: string;
  category: 'cafe' | 'restaurant' | 'hotel' | 'hostel';
  coordinates: {
    lat: number;
    lng: number;
  };
  summary: string;
  metrics: AnalysisMetrics;
  recommendation: string;
  alternatives: Location[];
  competitors?: Competitor[];
  timestamp?: string; // Changed from createdAt to timestamp
  createdAt?: string; // Keep for backward compatibility
  userId?: string;
  // New fields from our enhanced analysis
  strengths?: string[];
  weaknesses?: string[];
}
