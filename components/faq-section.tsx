export function FAQSection() {
  const faqs = [
    {
      q: "What is Highbrook Realty AI?",
      a: "Highbrook Realty AI is a location intelligence platform specifically designed for the hospitality industry. We use advanced AI and data analysis to provide entrepreneurs and investors with comprehensive reports on potential business locations, covering competitor intelligence, viability scores, and revenue projections to help you make informed decisions."
    },
    {
      q: "How does your AI help me choose a location?",
      a: "Our AI platform analyzes multiple factors to de-risk your investment. It provides a full SWOT analysis, identifies current and incoming competitors to gauge market saturation, and generates dynamic revenue projections based on hyper-local data. It also proactively suggests and evaluates nearby alternative locations that may offer lower competition or better demographics, ensuring you find the optimal site."
    },
    {
      q: "What types of businesses do you specialize in?",
      a: "Currently, our AI models are optimized to provide detailed analysis for hospitality businesses, including cafés, restaurants, hotels, and hostels. We are actively working to expand our services to other sectors."
    },
    {
      q: "How long does it take to get a location analysis report?",
      a: "Our process is fast and efficient. After you submit your desired location and business type, our AI begins its analysis immediately. You will typically receive a complete, in-depth intelligence report within 24 hours, allowing you to move forward with your plans without delay."
    },
    {
      q: "What makes your revenue projections more accurate than traditional methods?",
      a: "Traditional estimates often rely on broad market averages. Our AI-powered projections are far more nuanced, analyzing hyper-local data points such as foot traffic patterns, competitor performance, demographic spending habits, and specific economic indicators for your business type. This results in a more reliable and actionable financial forecast for your business plan."
    }
  ];

  return (
    <section aria-labelledby="faq-heading" className="py-12 px-4 max-w-3xl mx-auto">
      <h2 id="faq-heading" className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-[#1e293b] rounded-lg border border-gray-700 open:bg-[#253248]">
            <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-white group-hover:text-[#7c7ff3] transition-colors">
              {faq.q}
              <span className="ml-2 transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-4 pb-4 text-gray-300 border-t border-gray-700/50 pt-4">
              <p>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
