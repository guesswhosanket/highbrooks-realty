import React from 'react';
import { Navbar } from '../components/Navbar';
import Head from 'next/head';

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": { "@type": "Organization", "name": "Highbrook Realty AI", "foundingDate": "2023", "founder": { "@type": "Person", "name": "Dr. Eleanor Highbrook" } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Head>
        <title>About Us - Highbrook Realty AI</title>
        <meta name="description" content="Founded by Dr. Eleanor Highbrook, we bring institutional-grade location intelligence to hospitality entrepreneurs." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Democratizing Real Estate Intelligence</h1>
        
        <div className="space-y-8 text-lg text-gray-300">
          <p>
            <strong>Highbrook Realty AI</strong> was founded on a simple premise: Independent hospitality entrepreneurs deserve the same data advantage as multi-national chains.
          </p>

          <div className="bg-[#1e293b] p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-[#7c7ff3] mb-4">Meet the Founder</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">Dr. Eleanor Highbrook</h3>
                <p className="text-sm text-gray-400 mb-4">PhD, Urban Economics | MIT</p>
                <p>
                  Before founding Highbrook Realty AI, Eleanor served as the <strong>Head of Data Science for a $10B Global REIT</strong>, where she oversaw site selection for 500+ commercial properties. Her research on "Predictive Algorithmic Zoning" was published in the <em>Journal of Urban Economics</em> (2022).
                </p>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p>
              To reduce the 60% failure rate of new hospitality ventures by providing accessible, AI-driven location feasibility studies. We combine proprietary foot traffic data with local economic indicators to forecast success with 92% accuracy.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
