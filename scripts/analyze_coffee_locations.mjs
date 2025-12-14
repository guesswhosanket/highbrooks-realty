import { GoogleGenerativeAI } from '@google/generative-ai';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_SERVER_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GOOGLE_MAPS_API_KEY || !GEMINI_API_KEY) {
  console.error('Error: Missing API Keys. Please ensure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY/GOOGLE_MAPS_API_KEY and GEMINI_API_KEY are set in .env.local');
  process.exit(1);
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// List of Tier-2 Cities in India
const TIER_2_CITIES = [
  'Jaipur', 'Indore', 'Chandigarh', 'Lucknow', 'Coimbatore', 
  'Kochi', 'Nagpur', 'Surat', 'Visakhapatnam', 'Vadodara'
];

async function searchCoffeeShops(city) {
  console.log(`Searching for coffee shops in ${city}...`);
  const query = `coffee shops in ${city}`;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error(`Error searching in ${city}: ${data.status}`);
      return [];
    }

    return data.results.map(place => ({
      name: place.name,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      address: place.formatted_address,
      place_id: place.place_id,
      types: place.types
    }));
  } catch (error) {
    console.error(`Failed to fetch data for ${city}:`, error);
    return [];
  }
}

async function analyzeWithGemini(city, shops) {
  console.log(`Analyzing data for ${city} with Gemini...`);
  
  // Filter for popular shops (proxy for footfall)
  const popularShops = shops
    .filter(shop => shop.user_ratings_total > 50)
    .sort((a, b) => b.user_ratings_total - a.user_ratings_total)
    .slice(0, 10);

  if (popularShops.length === 0) {
    return `No significant data found for coffee shops in ${city} to make a recommendation.`;
  }

  const prompt = `
    I am looking to open a new coffee store in ${city}, India.
    Here is a list of the currently most popular coffee shops (based on review counts, which is a proxy for footfall):
    
    ${JSON.stringify(popularShops, null, 2)}
    
    Based on this data, please provide a brief analysis:
    1. Which areas/neighborhoods seem to have the highest concentration of successful coffee shops?
    2. Are there any obvious gaps or underserved areas implied by the locations of these popular spots?
    3. Suggest a general strategy for placing a new store (e.g., "near store X", "in the Y district").
    
    Keep the response concise and actionable.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error(`Gemini analysis failed for ${city}:`, error);
    return 'Analysis could not be generated.';
  }
}

async function main() {
  console.log('Starting Coffee Store Location Analysis for Tier-2 Cities...');
  
  const results = [];

  // We'll process a subset to avoid hitting rate limits too hard in this demo
  const citiesToAnalyze = TIER_2_CITIES.slice(0, 3); // Start with first 3
  
  for (const city of citiesToAnalyze) {
    const shops = await searchCoffeeShops(city);
    console.log(`Found ${shops.length} coffee shops in ${city}.`);
    
    if (shops.length > 0) {
      const analysis = await analyzeWithGemini(city, shops);
      results.push({
        city,
        shopCount: shops.length,
        topShops: shops.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0)).slice(0, 5),
        geminiAnalysis: analysis
      });
      console.log(`\n--- Analysis for ${city} ---\n${analysis}\n`);
    }
  }

  // Save full report
  const reportPath = path.join(process.cwd(), 'coffee_location_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nFull report saved to ${reportPath}`);
}

main().catch(console.error);
