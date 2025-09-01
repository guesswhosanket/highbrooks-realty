import OpenAI from 'openai';

interface AnalysisData {
  location: string;
  category: string;
  coordinates: { lat: number; lng: number };
  nearbyPlaces: any[];
  alternatives: any[];
  competitors: any[];
  footfallEstimate: number;
}

class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateLocationAnalysis(location: string, category: string, data: AnalysisData = {} as AnalysisData) {
    try {
      const prompt = this.buildAnalysisPrompt(location, category, data);
      
      const completion = await this.client.chat.completions.create({
        model: "gpt-4-turbo",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You are a location intelligence expert for the Indian market. Your goal is to provide a detailed, data-driven analysis for business location decisions. Analyze the provided data and return a single, valid JSON object. All financial figures must be in Indian Rupees (INR)."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 2000
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return JSON.parse(response);

    } catch (error) {
      if (error instanceof OpenAI.APIConnectionError) {
        console.error('OpenAI API connection error:', error);
        throw new Error('Failed to connect to OpenAI. Please check your API key and network connection.');
      }
      console.error('Error in generateLocationAnalysis:', error);
      throw error; // Re-throw other errors
    }
  }

  private buildAnalysisPrompt(location: string, category: string, data: AnalysisData): string {
    const { coordinates, nearbyPlaces = [], alternatives = [], competitors = [], footfallEstimate = 0 } = data;

    const competitorDetails = competitors.map(c => 
      `- ${c.name} (Rating: ${c.rating}/5 from ${c.user_ratings_total} reviews, Avg Price for 2: ₹${c.average_price_for_2 || 'N/A'})`
    ).join('\n');

    return `
    Analyze the viability of opening a new ${category} at ${location}.

    CONTEXT:
    - Location: ${location}
    - Coordinates: ${JSON.stringify(data.coordinates)}
    - Estimated Daily Footfall (based on nearby review volume): ${data.footfallEstimate}
    - Competitors Identified: ${data.competitors.length}

    COMPETITOR DATA:
    ${competitorDetails}

    Provide a comprehensive analysis in a single JSON object. All financial figures must be in Indian Rupees (INR) and should be realistic for the Indian market.

    Return a JSON object with this exact structure:
    {
      "summary": "A 2-3 sentence executive summary of the location's viability.",
      "strengths": ["List 3-4 key strengths."],
      "weaknesses": ["List 3-4 key weaknesses."],
      "opportunities": ["List 2-3 market opportunities."],
      "threats": ["List 2-3 competitive or market threats."],
      "metrics": {
        "viabilityScore": "A score from 0-100 indicating business viability.",
        "competitionLevel": "'Low', 'Medium', or 'High'.",
        "marketSaturation": "'Low', 'Medium', or 'High'.",
        "expectedRevenue": "Projected annual revenue in INR for a new business here.",
        "avgRevenue": "Average annual revenue in INR for similar businesses in the area.",
        "tam": "Total Addressable Market size in INR for this category in the city."
      },
      "recommendation": "'Strongly Recommend', 'Recommend with Caution', or 'Not Recommended'.",
      "keyInsights": ["List 3-4 critical, data-driven insights."],
      "actionItems": ["List 3-4 actionable next steps for the user."]
    }`;
  }




}

export default OpenAIService;
