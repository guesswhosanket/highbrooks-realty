import { NextApiRequest, NextApiResponse } from 'next';
import GoogleMapsService from '../../services/googleMapsService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { lat, lng, cat, limit = '4' } = req.query;
    
    // Validate required parameters
    if (!lat || !lng || !cat) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters',
        message: 'lat, lng, and cat are required query parameters'
      });
    }
    
    // Validate category
    const validCategories = ['cafe', 'restaurant', 'hotel', 'hostel'];
    if (!validCategories.includes(cat as string)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category',
        message: `Category must be one of: ${validCategories.join(', ')}`
      });
    }
    
    // Parse coordinates and limit
    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);
    const candidateLimit = parseInt(limit as string);
    
    // Validate parsed values
    if (isNaN(latitude) || isNaN(longitude) || isNaN(candidateLimit)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid parameters',
        message: 'lat, lng, and limit must be valid numbers'
      });
    }
    
    // Initialize Google Maps service
    const googleMapsService = new GoogleMapsService(process.env.GOOGLE_MAPS_SERVER_KEY!);
    
    // Find alternative locations
    const alternatives = await googleMapsService.findAlternativeLocations(
      latitude,
      longitude,
      cat as string,
      candidateLimit
    );
    
    res.json({
      success: true,
      data: alternatives
    });
  } catch (error: unknown) {
    console.error('Error finding candidate locations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to find candidate locations',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
