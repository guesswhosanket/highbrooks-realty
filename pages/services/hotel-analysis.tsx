import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function HotelAnalysis() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>Hotel Viability Reports | Highbrook Realty AI</title>
        <meta name="description" content="Comprehensive viability reports for hotel investments. Analyze market demand, tourism trends, and competitive landscape with AI." />
      </Head>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1e293b] rounded-xl shadow-2xl p-10 border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-8">Hotel Viability Reports</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6">
              Hotel investments require significant capital and long-term commitment. Whether you're considering a boutique hotel, a business hotel, or a luxury resort, location is the foundation of your success. Highbrook Realty AI delivers comprehensive viability reports that analyze every factor affecting your hotel's potential profitability.
            </p>

            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Key Analysis Components for Hotels</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li><strong>Tourism & Business Travel Trends:</strong> We analyze historical and projected tourism data, major attractions nearby, convention centers, and corporate headquarters to forecast demand patterns throughout the year.</li>
              <li><strong>Competitive Set Analysis:</strong> Identify your direct competitors, analyze their occupancy rates (via third-party data), pricing strategies, and guest review sentiment to understand market positioning opportunities.</li>
              <li><strong>Seasonal Demand Fluctuations:</strong> Our AI models predict high and low seasons, helping you plan pricing strategies, staffing levels, and marketing campaigns to maximize revenue year-round.</li>
              <li><strong>Accessibility & Infrastructure:</strong> We evaluate proximity to airports, train stations, major highways, and public transportation—critical factors for both leisure and business travelers.</li>
              <li><strong>Average Daily Rate (ADR) & RevPAR Projections:</strong> Based on comparable properties and market conditions, we provide realistic projections for your hotel's average daily rate and revenue per available room.</li>
              <li><strong>Local Amenities & Attractions:</strong> Analysis of nearby restaurants, entertainment venues, shopping districts, and tourist attractions that enhance your hotel's appeal.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Why Our Hotel Analysis Stands Out</h2>
            <p className="text-gray-300 mb-4">
              Traditional feasibility studies can cost $10,000-$50,000 and take weeks to complete. Our AI-powered platform delivers comparable insights in minutes at a fraction of the cost, including:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li>Market saturation analysis to avoid overbuilt markets</li>
              <li>Demand forecasting based on economic indicators and tourism trends</li>
              <li>Competitive benchmarking against similar properties</li>
              <li>Risk assessment highlighting potential challenges</li>
              <li>Alternative location suggestions if the initial site shows red flags</li>
            </ul>

            <div className="mt-10 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white">Get Your Hotel Viability Report</h3>
              <p className="text-gray-400 mt-2">Start your analysis today. Visit our <a href="/" className="text-[#7c7ff3] hover:underline">homepage</a>, enter your desired location, and select "Hotel" to receive a comprehensive viability report.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
