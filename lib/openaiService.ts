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
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a location intelligence expert specializing in hospitality business analysis. Provide detailed, data-driven insights for business location decisions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      // Try to parse as JSON, fallback to text analysis
      try {
        return JSON.parse(response);
      } catch {
        return this.parseTextResponse(response, location, category, data);
      }

    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.generateFallbackAnalysis(location, category, data);
    }
  }

  private buildAnalysisPrompt(location: string, category: string, data: AnalysisData): string {
    const { coordinates, nearbyPlaces = [], alternatives = [], competitors = [], footfallEstimate = 0 } = data;

    return `
Analyze this ${category} business location: ${location}

LOCATION DATA:
- Coordinates: ${coordinates?.lat}, ${coordinates?.lng}
- Nearby Places: ${nearbyPlaces.length} establishments
- Competitors: ${competitors.length} direct competitors
- Estimated Daily Footfall: ${footfallEstimate}
- Alternative Locations: ${alternatives.length} options identified

COMPETITOR ANALYSIS:
${competitors.map(c => `- ${c.name}: ${c.rating}/5 (${c.user_ratings_total} reviews)`).join('\n')}

NEARBY AMENITIES:
${nearbyPlaces.slice(0, 10).map(p => `- ${p.name} (${p.types?.join(', ')})`).join('\n')}

Please provide a comprehensive JSON analysis. IMPORTANT: For all financial metrics (expectedRevenue, avgRevenue, tam), you MUST provide a numerical value. If you cannot calculate a specific value, return 0.
{
  "summary": "Executive summary of location viability",
  "strengths": ["key advantages"],
  "weaknesses": ["potential challenges"],
  "opportunities": ["market opportunities"],
  "threats": ["competitive threats"],
  "metrics": {
    "viabilityScore": 75,
    "competitionLevel": "Medium",
    "marketSaturation": "Medium",
    "expectedRevenue": 15000000,
    "avgRevenue": 12000000,
    "tam": 500000000
  },
  "recommendation": "Recommend",
  "keyInsights": ["3-5 critical insights"],
  "actionItems": ["specific next steps"]
}`;
  }

  private parseTextResponse(response: string, location: string, category: string, data: AnalysisData) {
    // Extract key information from text response
    const lines = response.split('\n').filter(line => line.trim());
    
    return {
      summary: `Analysis for ${category} location at ${location}`,
      strengths: this.extractListItems(response, ['strength', 'advantage', 'positive']),
      weaknesses: this.extractListItems(response, ['weakness', 'challenge', 'concern']),
      opportunities: this.extractListItems(response, ['opportunity', 'potential']),
      threats: this.extractListItems(response, ['threat', 'risk', 'competition']),
      metrics: {
        viabilityScore: this.extractScore(response) || 75,
        competitionLevel: this.extractLevel(response, 'competition') || 'Medium',
        marketSaturation: this.extractLevel(response, 'saturation') || 'Medium',
        expectedRevenue: this.extractFinancialMetric(response, 'expectedRevenue') || 0,
        avgRevenue: this.extractFinancialMetric(response, 'avgRevenue') || 0,
        tam: this.extractFinancialMetric(response, 'tam') || 0
      },
      recommendation: this.extractRecommendation(response) || 'Recommend',
      keyInsights: this.extractListItems(response, ['insight', 'key', 'important']).slice(0, 5),
      actionItems: this.extractListItems(response, ['action', 'next', 'step', 'recommend']).slice(0, 5)
    };
  }

  private extractFinancialMetric(text: string, metric: string): number | null {
    const regex = new RegExp(`"${metric}"\s*:\s*(\d+)`);
    const match = text.match(regex);
    return match ? parseInt(match[1]) : null;
  }

  private generateFallbackAnalysis(location: string, category: string, data: AnalysisData) {
    const { nearbyPlaces = [], competitors = [], footfallEstimate = 0 } = data;
    
    const competitionLevel = competitors.length > 5 ? 'High' : competitors.length > 2 ? 'Medium' : 'Low';
    const viabilityScore = Math.max(30, 85 - (competitors.length * 5) + Math.min(nearbyPlaces.length * 2, 20));
    
    return {
      summary: `Location analysis for ${category} business at ${location}. Based on ${competitors.length} competitors and ${nearbyPlaces.length} nearby establishments.`,
      strengths: [
        footfallEstimate > 1000 ? 'High foot traffic area' : 'Moderate foot traffic',
        nearbyPlaces.length > 10 ? 'Well-established commercial area' : 'Developing area',
        competitors.length < 3 ? 'Low competition' : 'Established market'
      ],
      weaknesses: [
        competitors.length > 5 ? 'High competition' : 'Market validation needed',
        footfallEstimate < 500 ? 'Limited foot traffic' : 'Traffic analysis required'
      ],
      opportunities: [
        'Market expansion potential',
        'Customer base development',
        'Service differentiation'
      ],
      threats: [
        competitionLevel === 'High' ? 'Intense competition' : 'New market entrants',
        'Economic fluctuations',
        'Changing consumer preferences'
      ],
      metrics: {
        viabilityScore,
        competitionLevel,
        marketSaturation: competitionLevel,
        expectedRevenue: this.estimateRevenue(category, footfallEstimate),
        avgRevenue: this.getAverageRevenue(category),
        tam: this.estimateTAM(category, data.coordinates)
      },
      recommendation: viabilityScore > 70 ? 'Recommend' : viabilityScore > 50 ? 'Caution' : 'Not Recommended',
      keyInsights: [
        `Competition level: ${competitionLevel}`,
        `Estimated daily footfall: ${footfallEstimate}`,
        `Viability score: ${viabilityScore}/100`,
        `Market saturation: ${competitionLevel}`
      ],
      actionItems: [
        'Conduct detailed market research',
        'Analyze competitor pricing',
        'Validate customer demand',
        'Assess operational costs'
      ]
    };
  }

  private extractListItems(text: string, keywords: string[]): string[] {
    const lines = text.split('\n');
    const items: string[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.match(/^\d+\./)) {
        const content = trimmed.replace(/^[-•\d.]\s*/, '');
        if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
          items.push(content);
        }
      }
    }
    
    return items.slice(0, 5);
  }

  private extractScore(text: string): number | null {
    const scoreMatch = text.match(/(\d+)\/100|(\d+)%|score[:\s]*(\d+)/i);
    if (scoreMatch) {
      return parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]);
    }
    return null;
  }

  private extractLevel(text: string, type: string): string {
    const levelRegex = new RegExp(`${type}[:\s]*(low|medium|high)`, 'i');
    const match = text.match(levelRegex);
    return match ? match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase() : 'Medium';
  }

  private extractRecommendation(text: string): string {
    if (text.toLowerCase().includes('strongly recommend')) return 'Strong Recommend';
    if (text.toLowerCase().includes('recommend')) return 'Recommend';
    if (text.toLowerCase().includes('caution')) return 'Caution';
    if (text.toLowerCase().includes('not recommended')) return 'Not Recommended';
    return 'Recommend';
  }

  private estimateRevenue(category: string, footfall: number): number {
    const baseRevenue = {
      'restaurant': 800000,
      'cafe': 400000,
      'hotel': 1500000,
      'hostel': 600000
    };
    
    const base = baseRevenue[category.toLowerCase() as keyof typeof baseRevenue] || 600000;
    const footfallMultiplier = Math.max(0.5, Math.min(2.0, footfall / 1000));
    
    return Math.round(base * footfallMultiplier);
  }

  private getAverageRevenue(category: string): number {
    const averages = {
      'restaurant': 750000,
      'cafe': 350000,
      'hotel': 1200000,
      'hostel': 500000
    };
    
    return averages[category.toLowerCase() as keyof typeof averages] || 500000;
  }

  private estimateTAM(category: string, coordinates?: { lat: number; lng: number }): number {
    // Simplified TAM calculation based on category and location
    const baseTAM = {
      'restaurant': 50000000,
      'cafe': 25000000,
      'hotel': 100000000,
      'hostel': 30000000
    };
    
    return baseTAM[category.toLowerCase() as keyof typeof baseTAM] || 40000000;
  }
}

export default OpenAIService;
