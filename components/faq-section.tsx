export function FAQSection() {
  const faqs = [
    {
      q: "What data sources does Highbrook Realty AI use for its analysis?",
      a: "Our platform aggregates and analyzes data from a wide range of trusted sources, including public records, demographic databases, foot traffic data, real-time business listings, and proprietary market trend information. This multi-source approach allows our AI to build a comprehensive and accurate picture of any location's potential."
    },
    {
      q: "Is this a one-time report or an ongoing subscription?",
      a: "We offer flexible options to suit your needs. You can purchase a detailed analysis for a single location as a one-time report, which is perfect for validating a specific choice. We also offer subscription packages for investors and franchises who are continuously scouting and comparing multiple locations."
    },
    {
      q: "How quickly will I receive my location intelligence report?",
      a: "After you select a location and business type, our AI begins processing the data immediately. A complete, in-depth report is typically generated and delivered to you within 24 hours, providing you with actionable insights without a long wait."
    },
    {
      q: "Can you analyze locations for businesses outside of cafés, restaurants, hotels, and hostels?",
      a: "Currently, our AI models are specifically optimized for the hospitality sector, including cafés, restaurants, hotels, and hostels. We are actively working on expanding our capabilities to include other business types. Please contact our team to discuss your specific needs."
    },
    {
      q: "How do your AI-powered revenue projections differ from traditional estimates?",
      a: "Traditional estimates often rely on broad averages. Our AI creates dynamic revenue projections by analyzing hyper-local factors, including competitor performance, demographic spending habits, foot traffic patterns, and economic indicators specific to your chosen business type. This results in a more nuanced and reliable forecast to support your business plan."
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
