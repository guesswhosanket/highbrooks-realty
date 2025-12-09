import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function RestaurantAnalysis() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>Restaurant Location Intelligence | Highbrook Realty AI</title>
        <meta name="description" content="In-depth AI analysis for your next restaurant venture. Understand demographics, competition, and revenue potential before you invest." />
      </Head>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1e293b] rounded-xl shadow-2xl p-10 border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-8">Restaurant Location Intelligence</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6">
              Opening a restaurant is one of the most capital-intensive ventures in hospitality. Location can make or break your investment. Highbrook Realty AI provides comprehensive, data-driven analysis specifically tailored for restaurant ventures, helping you avoid costly mistakes and identify high-potential opportunities.
            </p>

            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Critical Metrics for Restaurant Success</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li><strong>Demographic & Income Analysis:</strong> We analyze the local population's income levels, dining preferences, and spending patterns to ensure your concept matches the market's ability and willingness to pay.</li>
              <li><strong>Foot Traffic Patterns:</strong> Our AI identifies peak dining hours, weekday vs. weekend patterns, and seasonal variations to help you optimize staffing and menu offerings.</li>
              <li><strong>Competitive Landscape Mapping:</strong> We identify all competing restaurants within a 2-mile radius, analyze their review sentiment, pricing strategies, and peak hours to find market gaps and differentiation opportunities.</li>
              <li><strong>Parking & Accessibility:</strong> We evaluate parking availability, public transportation access, and walkability scores—critical factors that directly impact customer convenience and frequency of visits.</li>
              <li><strong>Revenue Projections:</strong> Based on comparable restaurants in similar locations, we provide realistic revenue forecasts for your first 3 years of operation.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Why Location Intelligence Matters</h2>
            <p className="text-gray-300 mb-4">
              According to industry research, 60% of restaurants fail within their first year, and poor location choice is one of the top three reasons. Our AI-powered analysis helps you:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li>Avoid oversaturated markets where competition is too fierce</li>
              <li>Identify underserved neighborhoods with high demand</li>
              <li>Understand the true cost of operating in a specific location (rent, labor, utilities)</li>
              <li>Make data-backed decisions that impress investors and lenders</li>
            </ul>

            <div className="mt-10 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white">Ready to Analyze Your Restaurant Location?</h3>
              <p className="text-gray-400 mt-2">Get started with a comprehensive location analysis report. Simply enter your desired location on our <a href="/" className="text-[#7c7ff3] hover:underline">homepage</a> and select "Restaurant" as your business type.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
