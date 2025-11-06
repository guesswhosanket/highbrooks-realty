import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function CafeAnalysis() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>Café Location Analysis | Highbrook Realty AI</title>
        <meta name="description" content="Get specialized AI-powered analysis for your next café location, including foot traffic data, demographic insights, and competitor saturation." />
      </Head>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1e293b] rounded-xl shadow-2xl p-10 border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-8">AI-Powered Analysis for Your Next Café</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6">
              Choosing the right spot for a café is about more than just a good vibe. It requires a deep understanding of foot traffic, local demographics, and the existing competitive landscape. Highbrook Realty AI provides a tailored analysis specifically for cafés, giving you the data you need to invest with confidence.
            </p>

            <h2 className="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">Key Metrics for Café Success</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li><strong>Peak Foot Traffic Analysis:</strong> We identify when and where potential customers are most active throughout the day.</li>
              <li><strong>Demographic Profiling:</strong> Understand the age, income, and lifestyle of the local population to ensure it matches your target audience.</li>
              <li><strong>Competitor Saturation & Menu Gaps:</strong> Our AI analyzes nearby cafés to identify market saturation and potential gaps in menu offerings (e.g., lack of specialty coffee or vegan options).</li>
              <li><strong>Visibility & Accessibility Score:</strong> We score the location based on its visibility from main roads and its accessibility via public transport and parking.</li>
            </ul>

            <div className="mt-10 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white">Sample Report Snippet:</h3>
              <p className="text-gray-400 mt-2">A sample visualization would be shown here, such as a heatmap of foot traffic or a chart showing competitor density.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
