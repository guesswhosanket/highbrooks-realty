import { NextApiRequest, NextApiResponse } from 'next';
import PDFService from '../../../services/pdfService';
import { supabase } from '../../../shared/utils/supabaseClient';

// Import the same cache from analyze route
const analysisCache = new Map();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing analysis ID',
        message: 'Analysis ID is required'
      });
    }

    // Try in-memory cache first (dev fallback)
    if (analysisCache.has(id)) {
      const cached = analysisCache.get(id);
      const pdfService = new PDFService();
      const pdfBuffer = await pdfService.generateReport(cached);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=location-analysis-${id}.pdf`);
      return res.send(pdfBuffer);
    }
    
    // Get analysis data from database
    const { data: analysis, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !analysis) {
      // Fallback to cache again if available
      if (analysisCache.has(id)) {
        const cached = analysisCache.get(id);
        const pdfService = new PDFService();
        const pdfBuffer = await pdfService.generateReport(cached);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=location-analysis-${id}.pdf`);
        return res.send(pdfBuffer);
      }
      return res.status(404).json({
        success: false,
        error: 'Analysis not found',
        message: `No analysis found with ID: ${id}`
      });
    }
    
    // Helper to normalize JSON columns that may already be objects
    const asJson = (v: any) => {
      if (v == null) return v;
      if (typeof v === 'string') {
        try { return JSON.parse(v); } catch { return v; }
      }
      return v; // already object
    };
    
    // Format the analysis data for PDF generation
    const formattedAnalysis = {
      id: analysis.id,
      location: analysis.location,
      category: analysis.category,
      coordinates: asJson(analysis.coordinates),
      summary: analysis.summary,
      metrics: asJson(analysis.metrics),
      recommendation: analysis.recommendation,
      alternatives: asJson(analysis.alternatives),
      createdAt: analysis.created_at || analysis.createdAt,
      userId: analysis.user_id || analysis.userId
    };
    
    // Generate PDF
    const pdfService = new PDFService();
    const pdfBuffer = await pdfService.generateReport(formattedAnalysis);
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=location-analysis-${id}.pdf`);
    
    // Send PDF buffer
    res.send(pdfBuffer);
  } catch (error: unknown) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate PDF',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
