export function FAQSection() {
  const faqs = [
    {
      q: "What is Highbrook Realty AI?",
      a: "Highbrook Realty AI is a specialized analytics tool that provides location intelligence for the hospitality industry. It helps entrepreneurs and investors make data-driven real estate decisions by offering deep insights into any location's viability, competition, and revenue potential for businesses like cafés, restaurants, hotels, and hostels.",
    },
    {
      q: "What kind of analysis will I receive for a location?",
      a: "For any location you choose, our platform generates a comprehensive report that includes a SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis, a custom viability score, and detailed revenue projections tailored to your selected business type. This gives you a clear, multi-faceted understanding of its potential.",
    },
    {
      q: "How does the \"Competitor Intelligence\" feature work?",
      a: "Our Competitor Intelligence feature identifies all competing businesses in your chosen area. It then analyzes their performance using real-world data to determine the market saturation level. This allows you to understand the competitive landscape and identify gaps in the market, giving you a distinct advantage.",
    },
    {
      q: "Can Highbrook Realty AI help if my chosen location isn't ideal?",
      a: "Yes. A core feature of our service is providing alternative options. If your initial location has a low viability score or high market saturation, our AI will automatically search for and analyze nearby locations that offer better potential for success, ensuring you don't miss out on a superior opportunity.",
    },
    {
      q: "What business types is this service designed for?",
      a: "Highbrook Realty AI is currently optimized for businesses in the hospitality sector. This includes cafés, restaurants, hotels, and hostels. Our analysis is specifically tailored to the unique success factors of these types of ventures.",
    },
  ];

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently Asked Questions</h2>
      <div>
        {faqs.map((faq) => (
          <details key={faq.q}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
