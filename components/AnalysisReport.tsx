import React from 'react';
import { AnalysisResult } from '../shared/types/analysis';

interface AnalysisReportProps {
  analysis: AnalysisResult;
  onDownloadPdf: () => void;
}

const formatCurrency = (value: number): string => {
  // Format in Indian style with lakhs and crores
  if (value >= 10000000) { // ≥ 1 crore
    return `₹${(value/10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) { // ≥ 1 lakh
    return `₹${(value/100000).toFixed(2)} Lakhs`;
  } else {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  }
};

const AnalysisReport: React.FC<AnalysisReportProps> = ({ analysis, onDownloadPdf }) => {
  const { 
    location, 
    category, 
    summary, 
    metrics, 
    recommendation,
    createdAt,
    timestamp,
    strengths,
    weaknesses,
    competitors
  } = analysis;

  const categoryLabel = {
    cafe: 'Café',
    restaurant: 'Restaurant',
    hotel: 'Hotel',
    hostel: 'Hostel'
  }[category] || category;

  // Use timestamp if available, otherwise fall back to createdAt
  const dateString = timestamp || createdAt || new Date().toISOString();
  const createdDate = new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 mb-10 border border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-700 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">{location}</h2>
          <div className="flex items-center text-gray-300">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#7c7ff3]/20 text-[#7c7ff3] mr-2">
              {categoryLabel}
            </span>
            <span className="text-sm">Generated on {createdDate}</span>
          </div>
        </div>
        <button 
          onClick={onDownloadPdf}
          className="mt-4 md:mt-0 px-4 py-2 bg-[#7c7ff3] text-white rounded-md hover:bg-[#6366f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c7ff3] transition-all duration-200 shadow-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-xl mb-3 text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#7c7ff3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Executive Summary
        </h3>
        <div className="text-gray-300 whitespace-pre-line bg-[#0f172a] p-5 rounded-lg border-l-4 border-[#7c7ff3]">
          {summary}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-semibold text-xl mb-4 text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#7c7ff3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Key Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {metrics.avgRevenue !== undefined && metrics.avgRevenue !== null && (
            <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-5 rounded-lg shadow-sm border border-[#7c7ff3]/50">
              <h4 className="text-[#7c7ff3] font-medium mb-2 text-sm uppercase tracking-wider">Average Revenue</h4>
              <p className="text-2xl font-bold text-white">{formatCurrency(metrics.avgRevenue)}</p>
              <p className="text-sm text-gray-300 mt-1">Annual for similar businesses</p>
            </div>
          )}
          
          {metrics.expectedRevenue !== undefined && metrics.expectedRevenue !== null && (
            <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-5 rounded-lg shadow-sm border border-green-800">
              <h4 className="text-green-400 font-medium mb-2 text-sm uppercase tracking-wider">Expected Revenue</h4>
              <p className="text-2xl font-bold text-white">{formatCurrency(metrics.expectedRevenue)}</p>
              <p className="text-sm text-gray-300 mt-1">Projected annual</p>
            </div>
          )}
          
          {metrics.tam !== undefined && metrics.tam !== null && (
            <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-5 rounded-lg shadow-sm border border-purple-800">
              <h4 className="text-purple-400 font-medium mb-2 text-sm uppercase tracking-wider">Total Market</h4>
              <p className="text-2xl font-bold text-white">{formatCurrency(metrics.tam)}</p>
              <p className="text-sm text-gray-300 mt-1">Total addressable market</p>
            </div>
          )}
          
          {metrics.footfall !== undefined && metrics.footfall !== null && (
            <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-5 rounded-lg shadow-sm border border-green-800">
              <h4 className="text-green-400 font-medium mb-2 text-sm uppercase tracking-wider">Estimated Footfall</h4>
              <p className="text-2xl font-bold text-white">{metrics.footfall.toLocaleString()}</p>
              <p className="text-sm text-gray-300 mt-1">Average daily visitors (heuristic)</p>
            </div>
          )}
          
          {metrics.competitorCount !== undefined && (
            <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-5 rounded-lg shadow-sm border border-amber-800">
              <h4 className="text-amber-400 font-medium mb-2 text-sm uppercase tracking-wider">Competitors Nearby</h4>
              <p className="text-2xl font-bold text-white">{metrics.competitorCount}</p>
              <p className="text-sm text-gray-300 mt-1">Within 1km radius</p>
            </div>
          )}
          
          {metrics.populationDensity !== undefined && metrics.populationDensity !== null && (
            <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-5 rounded-lg shadow-sm border border-cyan-800">
              <h4 className="text-cyan-400 font-medium mb-2 text-sm uppercase tracking-wider">Population Density</h4>
              <p className="text-2xl font-bold text-white">{metrics.populationDensity.toLocaleString()}/km²</p>
              <p className="text-sm text-gray-300 mt-1">People per square kilometer</p>
            </div>
          )}
        </div>
      </div>

      {/* Top Competitors */}
      {competitors && competitors.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-xl mb-4 text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#7c7ff3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Top Competitors (within 1km)
          </h3>
          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#0b1220]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reviews</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Footfall</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Avg Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="bg-[#0f172a] divide-y divide-gray-800">
                {competitors.map((competitor, idx) => (
                  <tr key={idx} className="hover:bg-[#1e293b] transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        {competitor.website || competitor.google_url ? (
                          <a
                            href={competitor.website || competitor.google_url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7c7ff3] hover:text-[#6366f1] hover:underline font-medium"
                          >
                            {competitor.name}
                          </a>
                        ) : (
                          <span className="text-white font-medium">{competitor.name}</span>
                        )}
                        {typeof competitor.price_level === 'number' && competitor.price_level > 0 && (
                          <span className="text-xs text-gray-400 mt-1">
                            {'$'.repeat(competitor.price_level)} price level
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {competitor.rating ? (
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-gray-300">{competitor.rating.toFixed(1)}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      {(competitor.user_ratings_total ?? 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      <div className="flex items-center">
                        <span className="text-[#7c7ff3] font-medium">
                          {(competitor.footfall ?? 0).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">est.</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      {competitor.average_price_for_2 ? (
                        <div className="flex items-center">
                          <span className="text-green-400 font-medium">
                            ₹{competitor.average_price_for_2.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">for 2</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-300 max-w-xs">
                      <div className="truncate" title={competitor.address}>
                        {competitor.address}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      <div className="flex flex-col space-y-1">
                        {competitor.phone && (
                          <a href={`tel:${competitor.phone}`} className="text-[#7c7ff3] hover:underline text-sm">
                            {competitor.phone}
                          </a>
                        )}
                        {competitor.website && (
                          <a
                            href={competitor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7c7ff3] hover:underline text-sm truncate"
                          >
                            Website
                          </a>
                        )}
                        {!competitor.phone && !competitor.website && (
                          <span className="text-gray-500 text-sm">N/A</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      {competitor.revenue ? formatCurrency(competitor.revenue) : (
                        <span className="text-gray-500">Not public</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Strengths and Weaknesses section */}
      {(strengths || weaknesses) && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths && strengths.length > 0 && (
            <div>
              <h3 className="font-semibold text-xl mb-3 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Strengths
              </h3>
              <ul className="bg-[#0f172a] p-5 rounded-lg list-none text-gray-300 border border-green-800 shadow-sm">
                {strengths.map((strength, index) => (
                  <li key={index} className="mb-2 flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {weaknesses && weaknesses.length > 0 && (
            <div>
              <h3 className="font-semibold text-xl mb-3 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Weaknesses
              </h3>
              <ul className="bg-[#0f172a] p-5 rounded-lg list-none text-gray-300 border border-amber-800 shadow-sm">
                {weaknesses.map((weakness, index) => (
                  <li key={index} className="mb-2 flex items-start">
                    <svg className="h-5 w-5 mr-2 text-amber-400 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mb-2">
        <h3 className="font-semibold text-xl mb-3 text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#7c7ff3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Final Recommendation
        </h3>
        <div className={`p-5 rounded-lg border shadow-sm ${recommendation.toLowerCase().includes('recommend') ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-green-800 text-gray-300' : 'bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-amber-800 text-gray-300'}`}>
          <p className="text-lg font-medium">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
