export function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.thehighbrooks.com/#organization",
        "name": "Highbrook Realty AI",
        "url": "https://www.thehighbrooks.com/",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+1-555-010-4321",
            "contactType": "customer support",
            "email": "support@thehighbrooks.com"
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/highbrook-realty-ai",
          "https://twitter.com/highbrookrealtyai"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.thehighbrooks.com/#website",
        "url": "https://www.thehighbrooks.com/",
        "name": "Highbrook Realty AI",
        "description": "AI-Powered Insights for Real Estate Success. Leverage cutting-edge data analysis to make smarter, data-driven decisions for your hospitality business.",
        "publisher": {
          "@id": "https://www.thehighbrooks.com/#organization"
        }
      },
      {
        "@type": "BusinessService",
        "@id": "https://www.thehighbrooks.com/#service",
        "name": "AI-Powered Location Intelligence for Hospitality",
        "provider": {
          "@id": "https://www.thehighbrooks.com/#organization"
        },
        "serviceType": [
          "Location Intelligence",
          "Competitor Analysis",
          "Business Viability Analysis",
          "Revenue Projection"
        ],
        "description": "Highbrook Realty AI provides comprehensive location intelligence for the hospitality industry. Our service includes SWOT analysis, custom viability scores, detailed revenue projections, competitor intelligence, and suggestions for alternative locations to help entrepreneurs and investors make data-driven real estate decisions.",
        "audience": {
          "@type": "Audience",
          "audienceType": "Hospitality entrepreneurs and investors"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Sarah L.",
              "jobTitle": "Founder of The Daily Grind",
              "description": "Boutique Café Owner"
            },
            "reviewBody": "Highbrook's analysis was the deciding factor in launching our new café. The competitor intelligence was invaluable and saved us from entering an oversaturated market."
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Mark Chen",
              "jobTitle": "Co-Founder of Urban Eats",
              "description": "Restaurant Entrepreneur"
            },
            "reviewBody": "The revenue projections were surprisingly accurate. We used the report to secure our initial funding and have exceeded our Year 1 forecast."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Highbrook Realty AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Highbrook Realty AI is a specialized analytics tool that provides location intelligence for the hospitality industry. It helps entrepreneurs and investors make data-driven real estate decisions by offering deep insights into any location's viability, competition, and revenue potential for businesses like cafés, restaurants, hotels, and hostels."
            }
          },
          {
            "@type": "Question",
            "name": "What kind of analysis will I receive for a location?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For any location you choose, our platform generates a comprehensive report that includes a SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis, a custom viability score, and detailed revenue projections tailored to your selected business type. This gives you a clear, multi-faceted understanding of its potential."
            }
          },
          {
            "@type": "Question",
            "name": "How does the \"Competitor Intelligence\" feature work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our Competitor Intelligence feature identifies all competing businesses in your chosen area. It then analyzes their performance using real-world data to determine the market saturation level. This allows you to understand the competitive landscape and identify gaps in the market, giving you a distinct advantage."
            }
          },
          {
            "@type": "Question",
            "name": "Can Highbrook Realty AI help if my chosen location isn't ideal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. A core feature of our service is providing alternative options. If your initial location has a low viability score or high market saturation, our AI will automatically search for and analyze nearby locations that offer better potential for success, ensuring you don't miss out on a superior opportunity."
            }
          },
          {
            "@type": "Question",
            "name": "What business types is this service designed for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Highbrook Realty AI is currently optimized for businesses in the hospitality sector. This includes cafés, restaurants, hotels, and hostels. Our analysis is specifically tailored to the unique success factors of these types of ventures."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}
