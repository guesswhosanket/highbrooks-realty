/**
 * Represents a geographic location with basic metadata.
 */
export interface Location {
  /** Name of the location or place */
  name: string;
  /** Full address of the location */
  address: string;
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** Optional score or rating associated with the location */
  score?: number;
  /** List of reasons why this location was selected or scored */
  reasons?: string[];
}

/**
 * Key performance indicators and metrics for a location analysis.
 */
export interface AnalysisMetrics {
  /** Average annual revenue for similar businesses in the area (INR) */
  avgRevenue: number;
  /** Total Addressable Market (TAM) size for the category in this area (INR) */
  tam: number;
  /** Expected annual revenue for a new business at this location (INR) */
  expectedRevenue: number;
  /** Estimated daily or monthly footfall based on proxy data */
  footfall?: number;
  /** Number of direct competitors in the vicinity */
  competitorCount?: number;
  /** Population density of the area (people per sq km) */
  populationDensity?: number;
  /** Average household income in the area */
  averageIncome?: number;
  /** 0-100 score indicating overall business viability */
  viabilityScore?: number;
  /** Assessment of competition: 'Low', 'Medium', 'High' */
  competitionLevel?: string;
  /** Assessment of market saturation: 'Low', 'Medium', 'High' */
  marketSaturation?: string;
}

/**
 * Detailed information about a competitor business.
 */
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

/**
 * The complete result of a location analysis.
 */
export interface AnalysisResult {
  id: string;
  location: string;
  category: 'cafe' | 'restaurant' | 'hotel' | 'hostel';
  coordinates: {
    lat: number;
    lng: number;
  };
  /** Executive summary of the analysis */
  summary: string;
  /** Quantifiable metrics derived from data and AI analysis */
  metrics: AnalysisMetrics;
  /** Final recommendation regarding the location */
  recommendation: string;
  /** List of alternative locations suggested by the analysis */
  alternatives: Location[];
  /** List of key competitors analyzed */
  competitors?: Competitor[];
  /** ISO timestamp of when the analysis was performed */
  timestamp?: string; 
  createdAt?: string;
  userId?: string;
  
  // SWOT Analysis components
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
  
  /** Additional strategic insights */
  keyInsights?: string[];
  /** Recommended next steps */
  actionItems?: string[];
}
