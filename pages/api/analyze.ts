import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import GoogleMapsService from '../../lib/googleMapsService';
import OpenAIService from '../../lib/openaiService';
import { supabase } from '../../lib/supabaseClient';

// Temporary cache for analysis results
const analysisCache = new Map();
const MAX_CACHE = 50;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== API ROUTE DEBUG ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  
  if (req.method === 'POST') {
    console.log('Processing POST request...');
    return handleAnalyze(req, res);
  } else if (req.method === 'GET') {
    console.log('Processing GET request...');
    return handleGetAnalysis(req, res);
  } else {
    console.log('Method not allowed:', req.method);
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleAnalyze(req: NextApiRequest, res: NextApiResponse) {
  const { location, category } = req.body;

  console.log('=== ANALYZE API DEBUG ===');
  console.log('Request body:', req.body);
  console.log('Location:', location);
  console.log('Category:', category);
  console.log('GOOGLE_MAPS_SERVER_KEY exists:', !!process.env.GOOGLE_MAPS_SERVER_KEY);
  console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);

  if (!location || !category) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'Location and category are required' });
  }

  const analysisId = randomUUID();
  console.log(`[${analysisId}] Analysis initiated.`);

  try {
    console.log(`Starting analysis for ${location}...`);
    console.log(`[${analysisId}] Step 1: Initializing services...`);

    // Initialize services with environment variables
    if (!process.env.GOOGLE_MAPS_SERVER_KEY) {
      throw new Error('GOOGLE_MAPS_SERVER_KEY environment variable is missing');
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is missing');
    }

    console.log(`[${analysisId}] Initializing services...`);
    const googleMapsService = new GoogleMapsService(process.env.GOOGLE_MAPS_SERVER_KEY);
    const openAIService = new OpenAIService(process.env.OPENAI_API_KEY);
    console.log(`[${analysisId}] Services initialized.`);

    // 1. Geocode location
    console.log('Step 1: Geocoding...');
    console.log(`[${analysisId}] Step 1: Geocoding address...`);
    const coordinates = await googleMapsService.geocodeAddress(location);
    console.log(`[${analysisId}] Step 1 SUCCESS: Geocoded to ${JSON.stringify(coordinates)}`);

    // 2. Find nearby places
    console.log(`[${analysisId}] Step 2: Finding nearby places...`);
    const nearbyPlaces = await googleMapsService.getNearbyPlaces(coordinates, category);
    console.log(`[${analysisId}] Step 2 SUCCESS: Found ${nearbyPlaces.length} nearby places.`);

    // 2b. Estimate footfall from Google Places reviews volume (simple heuristic)
    const footfallEstimate = nearbyPlaces.reduce((sum, p) => sum + (p.user_ratings_total || 0), 0);

    // 3. Find alternatives
    console.log(`[${analysisId}] Step 3: Finding alternative locations...`);
    const alternatives = await googleMapsService.findAlternativeLocations(coordinates.lat, coordinates.lng, category);
    console.log(`[${analysisId}] Step 3 SUCCESS: Found ${alternatives.length} alternatives.`);

    // 3b. Build Top Competitors (up to 10) with details
    const topNearby = [...nearbyPlaces]
      .sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0))
      .slice(0, 10);

    const competitors = await Promise.all(
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
          return {
            name: p.name || 'Unknown',
            address: p.vicinity || 'Unknown address',
            lat: p.geometry?.location?.lat,
            lng: p.geometry?.location?.lng,
            rating: p.rating ?? null,
            user_ratings_total: p.user_ratings_total ?? 0,
            price_level: p.price_level ?? null,
            website: null,
            phone: null,
            google_url: null,
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
    console.log(`[${analysisId}] Step 5: Generating OpenAI analysis...`);
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

    console.log('OpenAI Analysis Object:', JSON.stringify(analysis, null, 2));

    // 6. Assemble the final report
    console.log(`[${analysisId}] Step 5 SUCCESS: OpenAI analysis generated.`);

    // 6. Assemble the final report
    console.log(`[${analysisId}] Step 6: Assembling final report...`);
    const report = {
      id: analysisId,
      location,
      category,
      summary: analysis.summary || 'No summary available.',
      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || [],
      opportunities: analysis.opportunities || [],
      threats: analysis.threats || [],
      recommendation: analysis.recommendation || 'No recommendation available.',
      coordinates,
      alternatives,
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
      competitors,
      createdAt: new Date().toISOString()
    };

    // Cache the result
    console.log(`[${analysisId}] Step 6 SUCCESS: Report assembled.`);

    // Cache the result
    analysisCache.set(analysisId, report);
    if (analysisCache.size > MAX_CACHE) {
      const oldestKey = analysisCache.keys().next().value;
      analysisCache.delete(oldestKey);
    }

    // 7. Store in Supabase (optional, will not block response)
    const dbRecord = {
      id: analysisId,
      location,
      category,
      summary: analysis.summary,
      metrics: report.metrics, // Use the same calculated metrics as the response
      recommendation: analysis.recommendation,
      coordinates: coordinates,
      alternatives: alternatives,
      created_at: new Date().toISOString(),
      user_id: null // Set to null for now, can be updated when auth is implemented
    };

    console.log(`[${analysisId}] Step 7: Storing analysis in Supabase...`);
    const { error } = await supabase.from('analyses').insert([dbRecord]);
    if (error) {
      console.error(`[${analysisId}] Supabase insert error:`, error.message || error);
    } else {
      console.log(`[${analysisId}] Step 7 SUCCESS: Analysis ${analysisId} stored.`);
    }

    console.log(`[${analysisId}] Sending successful response.`);
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

  console.log('=== GET ANALYSIS DEBUG ===');
  console.log('Analysis ID:', id);
  console.log('ID type:', typeof id);

  if (!id || typeof id !== 'string') {
    console.log('❌ Invalid ID provided');
    return res.status(400).json({ error: 'Analysis ID is required' });
  }

  // Check cache first
  console.log('🔍 Checking cache for ID:', id);
  if (analysisCache.has(id)) {
    console.log('✅ Found in cache, returning cached data');
    return res.json(analysisCache.get(id));
  }
  console.log('❌ Not found in cache, querying Supabase...');

  try {
    console.log('📡 Querying Supabase for analysis:', id);
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .single();

    console.log('📊 Supabase response - Error:', error);
    console.log('📊 Supabase response - Data exists:', !!data);
    
    if (data?.metrics) {
      console.log('📊 Current metrics:', {
        avgRevenue: data.metrics.avgRevenue,
        expectedRevenue: data.metrics.expectedRevenue,
        tam: data.metrics.tam,
        average_revenue: data.metrics.average_revenue,
        expected_revenue: data.metrics.expected_revenue,
        total_addressable_market: data.metrics.total_addressable_market,
        footfall: data.metrics.footfall
      });
    }

    if (error || !data) {
      console.error('❌ Supabase select error:', error);
      // Fallback to cache again (in case it was added after initial check)
      if (analysisCache.has(id)) return res.json(analysisCache.get(id));
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json(data);
  } catch (error) {
    console.error(`Error fetching analysis ${id}:`, error);
    // On transport errors, try cache to avoid 404s during dev
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

