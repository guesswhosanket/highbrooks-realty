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
        </div>
      </main>
    </div>
  );
}
