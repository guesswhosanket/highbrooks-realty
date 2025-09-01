import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import { useForm } from 'react-hook-form';
import Head from 'next/head';

type FormData = {
  location: string;
  category: 'cafe' | 'restaurant' | 'hotel' | 'hostel';
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Always use Next.js API routes for unified deployment
      const apiUrl = '/api/analyze';
      
      console.log('=== FRONTEND DEBUG ===');
      console.log('Using Next.js API route:', apiUrl);
      console.log('Request data:', data);
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const result = await response.json();
        // Store analysis ID in URL
        router.push(`/results?id=${result.id}`);
      } else {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || 'Analysis failed');
        } catch (jsonError) {
          // The error response wasn't JSON. Throw the raw text.
          throw new Error(errorText);
        }
      }
    } catch (error) {
      console.error('Error analyzing location:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to analyze location. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>Highbrook Realty AI - Location Intelligence</title>
        <meta name="description" content="Get detailed insights on whether a location is suitable for your hospitality business" />
      </Head>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl tracking-tight">
              <span className="text-white">Highbrook </span>
              <span className="text-[#7c7ff3] bg-clip-text">Realty AI</span>
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-300">
              AI-Powered Insights for Real Estate Success
            </p>
          </div>

          <div className="mt-16 bg-[#1e293b] rounded-xl shadow-2xl max-w-2xl mx-auto p-10 border border-gray-700">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="mt-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#7c7ff3] focus:ring-[#7c7ff3] sm:text-sm transition-all duration-200 ease-in-out"
                  placeholder="E.g., MG Road, Bangalore"
                  {...register('location', { required: 'Location is required' })}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                  Business Type
                </label>
                <select
                  id="category"
                  className="mt-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#7c7ff3] focus:ring-[#7c7ff3] sm:text-sm transition-all duration-200 ease-in-out"
                  {...register('category', { required: 'Business type is required' })}
                >
                  <option value="">Select a business type</option>
                  <option value="cafe">Café</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="hotel">Hotel</option>
                  <option value="hostel">Hostel</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
                )}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border-l-4 border-red-500 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-300">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-[#7c7ff3] hover:bg-[#6366f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c7ff3] transition-all duration-200 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Location...
                    </>
                  ) : 'Analyze Location'}
                </button>
              </div>
            </form>
          </div>

          <div className="py-20 sm:py-28 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Unlock Actionable Insights for Your Next Venture
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
              Highbrook Realty AI leverages cutting-edge data analysis to provide you with a comprehensive understanding of any location, helping you make smarter, data-driven decisions for your hospitality business.
            </p>
            <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 text-left">
              <div className="p-8 bg-[#1e293b] rounded-xl border border-gray-700">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#7c7ff3] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">Comprehensive Analysis</h3>
                <p className="mt-2 text-base text-gray-400">
                  Get a 360-degree view of any location with our SWOT analysis, viability scores, and revenue projections tailored to your business type.
                </p>
              </div>
              <div className="p-8 bg-[#1e293b] rounded-xl border border-gray-700">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#7c7ff3] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">Competitor Intelligence</h3>
                <p className="mt-2 text-base text-gray-400">
                  Identify key competitors, analyze their performance with real-world data, and discover market saturation levels to find your competitive edge.
                </p>
              </div>
              <div className="p-8 bg-[#1e293b] rounded-xl border border-gray-700">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#7c7ff3] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">Alternative Locations</h3>
                <p className="mt-2 text-base text-gray-400">
                  Our AI doesn't just analyze your chosen spot—it also suggests and evaluates nearby alternative locations to ensure you find the best possible fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
