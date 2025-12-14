import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import GoogleMapsService from '../../lib/googleMapsService';
import OpenAIService from '../../lib/openaiService';
import { supabase } from '../../lib/supabaseClient';
import { AnalysisResult, Competitor } from '../../shared/types/analysis';

// Temporary cache for analysis results
const analysisCache = new Map<string, AnalysisResult>();
const MAX_CACHE = 50;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return handleAnalyze(req, res);
  } else if (req.method === 'GET') {
    return handleGetAnalysis(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleAnalyze(req: NextApiRequest, res: NextApiResponse) {
  const { location, category } = req.body;

  if (!location || !category) {
    return res.status(400).json({ error: 'Location and category are required' });
  }

  const analysisId = randomUUID();
  console.log(`[${analysisId}] Starting analysis for ${category} at ${location}`);

  try {
    // Initialize services with environment variables
    if (!process.env.GOOGLE_MAPS_SERVER_KEY || !process.env.OPENAI_API_KEY) {
      throw new Error('Missing API keys for Google Maps or OpenAI');
    }

    const googleMapsService = new GoogleMapsService(process.env.GOOGLE_MAPS_SERVER_KEY);
    const openAIService = new OpenAIService(process.env.OPENAI_API_KEY);

    // 1. Geocode location
    const coordinates = await googleMapsService.geocodeAddress(location);

    // 2. Find nearby places
    const nearbyPlaces = await googleMapsService.getNearbyPlaces(coordinates, category);

    // 2b. Estimate footfall from Google Places reviews volume (simple heuristic)
    const footfallEstimate = nearbyPlaces.reduce((sum, p) => sum + (p.user_ratings_total || 0), 0);

    // 3. Find alternatives
    const alternativesRaw = await googleMapsService.findAlternativeLocations(coordinates.lat, coordinates.lng, category);
    const alternatives = alternativesRaw.map(alt => ({
      name: alt.name,
      address: alt.address,
      lat: alt.coordinates.lat,
      lng: alt.coordinates.lng,
      score: alt.score,
      reasons: alt.reasons
    }));

    // 3b. Build Top Competitors (up to 10) with details
    const topNearby = [...nearbyPlaces]
      .sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0))
      .slice(0, 10);

    const competitors: Competitor[] = await Promise.all(
      topNearby.map(async (p) => {
        try {
          const details = p.place_id ? await googleMapsService.getPlaceDetails(p.place_id) : null;
          const loc = (details?.geometry?.location) || (p.geometry?.location) || {};
          return {
            name: details?.name || p.name || 'Unknown',
            address: details?.formatted_address || p.vicinity || 'Unknown address',
            lat: typeof loc.lat === 'function' ? loc.lat() : loc.lat,
            lng: typeof loc.lng === 'function' ? loc.lng() : loc.lng,
            rating: details?.rating ?? p.rating ?? null,
            user_ratings_total: details?.user_ratings_total ?? p.user_ratings_total ?? 0,
            price_level: details?.price_level ?? p.price_level ?? null,
            website: details?.website || null,
            phone: details?.formatted_phone_number || null,
            google_url: details?.url || null,
            footfall: details?.user_ratings_total ?? p.user_ratings_total ?? 0,
            average_price_for_2: calculateAveragePrice(details?.price_level ?? p.price_level ?? null)
          };
        } catch (e) {
          // Fallback if details fetch fails
          return {
            name: p.name || 'Unknown',
            address: p.vicinity || 'Unknown address',
            lat: p.geometry?.location?.lat,
            lng: p.geometry?.location?.lng,
            rating: p.rating ?? null,
            user_ratings_total: p.user_ratings_total ?? 0,
            price_level: p.price_level ?? null,
            footfall: p.user_ratings_total ?? 0,
            average_price_for_2: calculateAveragePrice(p.price_level ?? null)
          };
        }
      })
    );

    // 4. Demographics: accept optional input from client (no hardcoded defaults)
    const demographics = (req.body && typeof req.body.demographics === 'object')
      ? req.body.demographics
      : undefined;

    // 5. Generate OpenAI analysis
    const analysis = await openAIService.generateLocationAnalysis(location, category, {
      location,
      category,
      coordinates,
      nearbyPlaces,
      alternatives,
      competitors,
      footfallEstimate,
      ...(demographics ? { demographics } : {})
    });

    // 6. Assemble the final report
    const report: AnalysisResult = {
      id: analysisId,
      location,
      category,
      coordinates,
      summary: analysis.summary || 'No summary available.',
      metrics: {
        viabilityScore: analysis.metrics?.viabilityScore,
        competitionLevel: analysis.metrics?.competitionLevel,
        marketSaturation: analysis.metrics?.marketSaturation,
        avgRevenue: analysis.metrics?.avgRevenue,
        expectedRevenue: analysis.metrics?.expectedRevenue,
        tam: analysis.metrics?.tam,
        competitorCount: nearbyPlaces.length,
        footfall: footfallEstimate,
      },
      recommendation: analysis.recommendation || 'No recommendation available.',
      alternatives,
      competitors,
      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || [],
      opportunities: analysis.opportunities || [],
      threats: analysis.threats || [],
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    // Cache the result
    analysisCache.set(analysisId, report);
    if (analysisCache.size > MAX_CACHE) {
      const oldestKey = analysisCache.keys().next().value;
      if (oldestKey) {
        analysisCache.delete(oldestKey);
      }
    }

    // 7. Store in Supabase
    // Note: Database schema might need to match these fields or be updated. 
    // Assuming 'metrics' column is JSONB.
    const { error } = await supabase.from('analyses').insert([{
      id: analysisId,
      location,
      category,
      summary: report.summary,
      metrics: report.metrics,
      recommendation: report.recommendation,
      coordinates: report.coordinates,
      alternatives: report.alternatives,
      created_at: report.timestamp,
      user_id: null 
    }]);

    if (error) {
      console.error(`[${analysisId}] Supabase insert error:`, error.message);
    }

    res.json(report);

  } catch (error: unknown) {
    console.error(`Critical error in analysis for ${location}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      id: analysisId,
      success: false,
      error: 'Analysis failed',
      message: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}

async function handleGetAnalysis(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Analysis ID is required' });
  }

  // Check cache first
  if (analysisCache.has(id)) {
    return res.json(analysisCache.get(id));
  }

  try {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      // Fallback to cache again (in case it was added after initial check)
      if (analysisCache.has(id)) return res.json(analysisCache.get(id));
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json(data);
  } catch (error) {
    console.error(`Error fetching analysis ${id}:`, error);
    if (analysisCache.has(id)) return res.json(analysisCache.get(id));
    res.status(500).json({ error: 'Failed to fetch analysis' });
  }
}

// Helper function to estimate average price for 2 people based on Google Places price_level
function calculateAveragePrice(priceLevel: number | null): number | null {
  if (!priceLevel) return null;
  
  // Price level mapping for Indian restaurants/cafes (approximate for 2 people)
  const priceMappings: Record<number, number> = {
    1: 400,   // Inexpensive: ₹200-600 for 2
    2: 800,   // Moderate: ₹600-1000 for 2  
    3: 1500,  // Expensive: ₹1000-2000 for 2
    4: 2500   // Very Expensive: ₹2000+ for 2
  };
  
  return priceMappings[priceLevel] || null;
}

