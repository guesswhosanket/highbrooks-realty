import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Navbar } from '../components/Navbar';
import GoogleMapComponent from '../components/GoogleMap';
import AnalysisReport from '../components/AnalysisReport';
import { AnalysisResult } from '../shared/types/analysis';
import { useUser } from '../hooks/useUser';
import { supabase } from '../shared/utils/supabaseClient';
import Head from 'next/head';

export default function Results() {
  const router = useRouter();
  const { id } = router.query;
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();

  useEffect(() => {
    async function fetchAnalysis() {
      if (!id) return;
      
      try {
        setLoading(true);
        // Use Next.js API route for unified deployment
        const response = await fetch(`/api/analyze?id=${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch analysis');
        }
        
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        console.error('Error fetching analysis:', err);
        setError('Failed to load analysis. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnalysis();
  }, [id]);
  
  const handleDownloadPdf = async () => {
    if (!analysis) return;
    
    try {
      const response = await fetch(`/api/pdf/${analysis.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${analysis.location.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-analysis.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError('Failed to download PDF. Please try again.');
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>{analysis ? `${analysis.location} Analysis - Highbrook Realty AI` : 'Analysis Results - Highbrook Realty AI'}</title>
        <meta name="description" content="Detailed location analysis for your real estate investment" />
      </Head>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7c7ff3]"></div>
            <p className="text-gray-300 animate-pulse">Loading analysis...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-800 text-red-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg className="h-6 w-6 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-red-200">Error Loading Analysis</h3>
            </div>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-[#7c7ff3] text-white rounded-md hover:bg-[#6366f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c7ff3] transition-all duration-200 shadow-sm"
            >
              Back to Search
            </button>
          </div>
        ) : analysis ? (
          <>
            <AnalysisReport analysis={analysis} onDownloadPdf={handleDownloadPdf} />
            
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Location Map</h3>
              <div className="bg-[#1e293b] rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                <GoogleMapComponent 
                  center={analysis.coordinates} 
                  alternatives={analysis.alternatives} 
                />
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Alternative Locations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analysis.alternatives.map((alt, index) => (
                  <div key={index} className="bg-[#1e293b] rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 border border-gray-700 transform hover:-translate-y-1">
                    <h4 className="font-semibold text-lg text-white">{alt.name}</h4>
                    <p className="text-gray-300 text-sm mb-3">{alt.address}</p>
                    {alt.score && (
                      <div className="flex items-center mt-2">
                        <span className="text-sm mr-2 text-gray-300">Suitability:</span>
                        <div className="h-3 bg-gray-700 rounded-full flex-grow">
                          <div 
                            className={`h-3 rounded-full ${alt.score >= 8 ? 'bg-green-500' : alt.score >= 6 ? 'bg-[#7c7ff3]' : 'bg-yellow-500'}`}
                            style={{ width: `${alt.score * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm ml-2 font-medium text-gray-300">{alt.score}/10</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-yellow-900/30 border border-yellow-800 text-yellow-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg className="h-6 w-6 text-yellow-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-medium text-yellow-200">No Analysis Found</h3>
            </div>
            <p className="mb-4">We couldn't find the requested analysis. Please start a new analysis.</p>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-[#7c7ff3] text-white rounded-md hover:bg-[#6366f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c7ff3] transition-all duration-200 shadow-sm"
            >
              Back to Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// export async function getServerSideProps({ req, res }) {
//   // Create a Supabase client configured to use cookies
//   const supabaseServerClient = createServerSupabaseClient({ req, res });
  
//   // Get user data from cookie
//   const {
//     data: { session },
//   } = await supabaseServerClient.auth.getSession();
  
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     };
//   }
  
//   return { props: {} };
// }
