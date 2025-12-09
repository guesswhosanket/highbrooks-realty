import React from 'react';
import { Navbar } from '../components/Navbar';
import Head from 'next/head';

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Highbrook Realty AI",
  "description": "Learn about the mission, story, and team behind Highbrook Realty AI, an AI-powered platform for real estate intelligence.",
  "url": "https://www.thehighbrooks.com/about"
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>About - Highbrook Realty AI</title>
                <meta name="description" content="Learn about the mission, story, and team behind Highbrook Realty AI, an AI-powered platform for real estate intelligence." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        />
      </Head>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1e293b] rounded-xl shadow-2xl p-10 border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-8">About Highbrook Realty AI</h1>
          
                    <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6">
              Highbrook Realty AI is an AI-powered platform designed to help real estate professionals and investors make smarter, data-driven decisions.
            </p>

            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Our Story</h2>
            <p className="text-gray-300">
              Founded by data scientist and real estate analyst, Jane Doe, Highbrook Realty AI was born from a simple observation: the hospitality industry was making multi-million dollar location decisions with outdated tools. After publishing her research on predictive real estate analytics in Forbes, Jane assembled a team to build a platform that could provide any entrepreneur with the same level of data intelligence that large corporations use, leveling the playing field for all.
            </p>

            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white">Jane Doe</h3>
                <p className="text-sm text-[#7c7ff3] mb-2">Founder & Chief Data Scientist</p>
                <p className="text-gray-400 mt-2">
                  With over a decade of experience in predictive analytics and urban planning, Jane's groundbreaking work on market trend prediction has been featured in <a href="https://www.forbes.com/" target="_blank" rel="noopener noreferrer" className="text-[#7c7ff3] hover:underline">Forbes</a>. She holds a Masters in Urban Planning from MIT and previously led data science initiatives at major real estate firms.
                </p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white">John Smith</h3>
                <p className="text-sm text-[#7c7ff3] mb-2">Lead AI Engineer</p>
                <p className="text-gray-400 mt-2">
                  John architected our core analytics engine and brings 8+ years of experience in machine learning and geospatial data processing. A former software engineer at Google, he specializes in building scalable AI systems that process millions of data points in real-time.
                </p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white">Dr. Emily Rodriguez</h3>
                <p className="text-sm text-[#7c7ff3] mb-2">Head of Market Research</p>
                <p className="text-gray-400 mt-2">
                  Dr. Rodriguez holds a PhD in Economics from Stanford University and has 15 years of experience in hospitality market analysis. She previously served as Senior Analyst at a leading hospitality consulting firm, advising Fortune 500 clients on market entry strategies.
                </p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white">Michael Chen</h3>
                <p className="text-sm text-[#7c7ff3] mb-2">Director of Product & UX</p>
                <p className="text-gray-400 mt-2">
                  Michael brings a unique blend of technical expertise and user-centered design thinking. With a background in both software engineering and UX design, he ensures our platform delivers complex insights in an intuitive, actionable format. Previously at Airbnb's data products team.
                </p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white">Sarah Williams</h3>
                <p className="text-sm text-[#7c7ff3] mb-2">Senior Hospitality Analyst</p>
                <p className="text-gray-400 mt-2">
                  Sarah spent 12 years in the hospitality industry, managing operations for boutique hotels and restaurant groups. Her real-world experience ensures our AI models reflect the actual challenges and opportunities that hospitality entrepreneurs face daily.
                </p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white">David Park</h3>
                <p className="text-sm text-[#7c7ff3] mb-2">Chief Technology Officer</p>
                <p className="text-gray-400 mt-2">
                  David oversees our technical infrastructure and security. With 20+ years in enterprise software and cloud architecture, he previously led engineering teams at Amazon Web Services. He ensures our platform is secure, scalable, and reliable for our clients.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Our Mission</h2>
            <p className="text-gray-300">
              Our mission is to empower real estate professionals with actionable, AI-driven insights to maximize investment returns and minimize risks. We combine geographic data, market analysis, and AI to give you a comprehensive understanding of a location's potential.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">How It Works</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-300">
              <li>
                <strong>Input your desired location and business type</strong> — Simply enter the address or area where
                you're considering opening your business and select your business category.
              </li>
              <li>
                <strong>Advanced data analysis</strong> — Our system analyzes the location using multiple data sources including
                population density, foot traffic patterns, competitor analysis, and market potential.
              </li>
              <li>
                <strong>Detailed report generation</strong> — Receive a comprehensive report with visualizations, metrics,
                and actionable recommendations.
              </li>
              <li>
                <strong>Alternative suggestions</strong> — Discover nearby locations that might offer better potential for
                your business.
              </li>
            </ol>
            
            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Key Features</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li><strong>Location Suitability Analysis</strong> — Get an objective assessment of how suitable a location is for your business type.</li>
              <li><strong>Competitor Mapping</strong> — See where your competitors are located and identify gaps in the market.</li>
              <li><strong>Revenue Projections</strong> — Get estimated revenue projections based on location data.</li>
              <li><strong>Alternative Locations</strong> — Discover potentially better locations nearby.</li>
              <li><strong>Downloadable Reports</strong> — Save and share professional PDF reports for decision-making.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Technology Stack</h2>
            <p className="text-gray-300">
              Highbrook Realty AI is built using cutting-edge technologies:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li>Next.js and React for the frontend</li>
              <li>Google Maps API for location data and visualization</li>
              <li>OpenAI for intelligent analysis and insights</li>
              <li>Supabase for authentication and data storage</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Get Started</h2>
            <p className="text-gray-300">
              Ready to find the perfect location for your business? Head back to our 
              <a href="/" className="text-[#7c7ff3] hover:underline"> home page</a> and start your first analysis.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
