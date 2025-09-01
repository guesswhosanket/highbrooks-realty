import PDFDocument from 'pdfkit';

export interface AnalysisReport {
  id: string;
  location: string;
  category: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  metrics: {
    viabilityScore: number;
    competitionLevel: string;
    marketSaturation: string;
    expectedRevenue: number;
    avgRevenue: number;
    tam: number;
  };
  recommendation: string;
  keyInsights: string[];
  actionItems: string[];
  alternatives?: Array<{
    name: string;
    address: string;
    score: number;
    reasons: string[];
  }>;
  competitors?: Array<{
    name: string;
    rating: number;
    user_ratings_total: number;
    vicinity: string;
  }>;
  timestamp: string;
}

class PDFService {
  async generateReport(analysis: AnalysisReport): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const chunks: Buffer[] = [];

        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header
        this.addHeader(doc, analysis);
        
        // Executive Summary
        this.addSection(doc, 'Executive Summary', analysis.summary);
        
        // Key Metrics
        this.addMetricsSection(doc, analysis.metrics);
        
        // SWOT Analysis
        this.addSWOTAnalysis(doc, analysis);
        
        // Recommendation
        this.addRecommendationSection(doc, analysis.recommendation, analysis.keyInsights);
        
        // Competitors
        if (analysis.competitors && analysis.competitors.length > 0) {
          this.addCompetitorsSection(doc, analysis.competitors);
        }
        
        // Alternative Locations
        if (analysis.alternatives && analysis.alternatives.length > 0) {
          this.addAlternativesSection(doc, analysis.alternatives);
        }
        
        // Action Items
        this.addActionItemsSection(doc, analysis.actionItems);
        
        // Footer
        this.addFooter(doc, analysis);

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  private addHeader(doc: PDFKit.PDFDocument, analysis: AnalysisReport) {
    doc.fontSize(24)
       .fillColor('#2563eb')
       .text('AI-Powered Real Estate Analysis', 50, 50);
    
    doc.fontSize(16)
       .fillColor('#374151')
       .text(`${analysis.category.toUpperCase()} Analysis for ${analysis.location}`, 50, 85);
    
    doc.fontSize(12)
       .fillColor('#6b7280')
       .text(`Generated on ${new Date(analysis.timestamp).toLocaleDateString()}`, 50, 110);
    
    // Add a line separator
    doc.moveTo(50, 130)
       .lineTo(550, 130)
       .strokeColor('#e5e7eb')
       .stroke();
    
    doc.y = 150;
  }

  private addSection(doc: PDFKit.PDFDocument, title: string, content: string) {
    doc.fontSize(16)
       .fillColor('#1f2937')
       .text(title, 50, doc.y + 20);
    
    doc.fontSize(11)
       .fillColor('#374151')
       .text(content, 50, doc.y + 10, { width: 500, align: 'justify' });
    
    doc.y += 20;
  }

  private addMetricsSection(doc: PDFKit.PDFDocument, metrics: AnalysisReport['metrics']) {
    doc.fontSize(16)
       .fillColor('#1f2937')
       .text('Key Metrics', 50, doc.y + 20);
    
    const startY = doc.y + 15;
    
    // Viability Score with visual indicator
    doc.fontSize(12)
       .fillColor('#374151')
       .text('Viability Score:', 50, startY);
    
    const scoreColor = metrics.viabilityScore >= 75 ? '#10b981' : 
                      metrics.viabilityScore >= 50 ? '#f59e0b' : '#ef4444';
    
    doc.fontSize(14)
       .fillColor(scoreColor)
       .text(`${metrics.viabilityScore}/100`, 150, startY);
    
    // Competition Level
    doc.fontSize(12)
       .fillColor('#374151')
       .text('Competition Level:', 50, startY + 25)
       .text(metrics.competitionLevel, 150, startY + 25);
    
    // Market Saturation
    doc.text('Market Saturation:', 50, startY + 45)
       .text(metrics.marketSaturation, 150, startY + 45);
    
    // Revenue Projections
    doc.text('Expected Annual Revenue:', 50, startY + 65)
       .fillColor('#059669')
       .text(`₹${this.formatCurrency(metrics.expectedRevenue)}`, 180, startY + 65);
    
    doc.fillColor('#374151')
       .text('Industry Average:', 50, startY + 85)
       .text(`₹${this.formatCurrency(metrics.avgRevenue)}`, 150, startY + 85);
    
    doc.text('Total Addressable Market:', 50, startY + 105)
       .text(`₹${this.formatCurrency(metrics.tam)}`, 180, startY + 105);
    
    doc.y = startY + 130;
  }

  private addSWOTAnalysis(doc: PDFKit.PDFDocument, analysis: AnalysisReport) {
    doc.fontSize(16)
       .fillColor('#1f2937')
       .text('SWOT Analysis', 50, doc.y + 20);
    
    const sections = [
      { title: 'Strengths', items: analysis.strengths, color: '#10b981' },
      { title: 'Weaknesses', items: analysis.weaknesses, color: '#ef4444' },
      { title: 'Opportunities', items: analysis.opportunities, color: '#3b82f6' },
      { title: 'Threats', items: analysis.threats, color: '#f59e0b' }
    ];
    
    let currentY = doc.y + 15;
    
    sections.forEach((section) => {
      doc.fontSize(14)
         .fillColor(section.color)
         .text(section.title, 50, currentY);
      
      currentY += 20;
      
      section.items.forEach((item) => {
        doc.fontSize(11)
           .fillColor('#374151')
           .text(`• ${item}`, 60, currentY, { width: 480 });
        currentY += 15;
      });
      
      currentY += 10;
    });
    
    doc.y = currentY;
  }

  private addRecommendationSection(doc: PDFKit.PDFDocument, recommendation: string, insights: string[]) {
    doc.fontSize(16)
       .fillColor('#1f2937')
       .text('Recommendation', 50, doc.y + 20);
    
    const recColor = recommendation.includes('Strong') ? '#10b981' :
                    recommendation.includes('Recommend') ? '#3b82f6' :
                    recommendation.includes('Caution') ? '#f59e0b' : '#ef4444';
    
    doc.fontSize(14)
       .fillColor(recColor)
       .text(recommendation, 50, doc.y + 15);
    
    if (insights && insights.length > 0) {
      doc.fontSize(14)
         .fillColor('#1f2937')
         .text('Key Insights:', 50, doc.y + 25);
      
      let currentY = doc.y + 15;
      insights.forEach((insight) => {
        doc.fontSize(11)
           .fillColor('#374151')
           .text(`• ${insight}`, 60, currentY, { width: 480 });
        currentY += 15;
      });
      doc.y = currentY + 10;
    }
  }

  private addCompetitorsSection(doc: PDFKit.PDFDocument, competitors: AnalysisReport['competitors']) {
    if (!competitors || competitors.length === 0) return;
    
    doc.fontSize(16)
       .fillColor('#1f2937')
       .text('Competitor Analysis', 50, doc.y + 20);
    
    let currentY = doc.y + 15;
    
    competitors.slice(0, 5).forEach((competitor) => {
      doc.fontSize(12)
         .fillColor('#1f2937')
         .text(competitor.name, 50, currentY);
      
      doc.fontSize(10)
         .fillColor('#6b7280')
         .text(`${competitor.rating}/5 stars (${competitor.user_ratings_total} reviews)`, 50, currentY + 15)
         .text(competitor.vicinity, 50, currentY + 28);
      
      currentY += 50;
    });
    
    doc.y = currentY;
  }

  private addAlternativesSection(doc: PDFKit.PDFDocument, alternatives: AnalysisReport['alternatives']) {
    if (!alternatives || alternatives.length === 0) return;
    
    doc.fontSize(16)
       .fillColor('#1f2937')
       .text('Alternative Locations', 50, doc.y + 20);
    
    let currentY = doc.y + 15;
    
    alternatives.forEach((alt, index) => {
      doc.fontSize(12)
         .fillColor('#1f2937')
         .text(`${index + 1}. ${alt.name}`, 50, currentY);
      
      doc.fontSize(10)
         .fillColor('#6b7280')
         .text(alt.address, 50, currentY + 15);
      
      doc.fontSize(11)
         .fillColor('#059669')
         .text(`Score: ${alt.score}/100`, 50, currentY + 28);
      
      if (alt.reasons && alt.reasons.length > 0) {
        doc.fontSize(10)
           .fillColor('#374151')
           .text(`Reasons: ${alt.reasons.join(', ')}`, 50, currentY + 42, { width: 480 });
      }
      
      currentY += 65;
    });
    
    doc.y = currentY;
  }

  private addActionItemsSection(doc: PDFKit.PDFDocument, actionItems: string[]) {
    if (!actionItems || actionItems.length === 0) return;
    
    doc.fontSize(16)
       .fillColor('#1f2937')
       .text('Recommended Actions', 50, doc.y + 20);
    
    let currentY = doc.y + 15;
    
    actionItems.forEach((item, index) => {
      doc.fontSize(11)
         .fillColor('#374151')
         .text(`${index + 1}. ${item}`, 50, currentY, { width: 480 });
      currentY += 18;
    });
    
    doc.y = currentY + 10;
  }

  private addFooter(doc: PDFKit.PDFDocument, analysis: AnalysisReport) {
    const pageHeight = doc.page.height;
    
    doc.fontSize(10)
       .fillColor('#9ca3af')
       .text('Generated by Highbrook Realty AI', 50, pageHeight - 50)
       .text(`Report ID: ${analysis.id}`, 50, pageHeight - 35);
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '');
  }
}

export default PDFService;
