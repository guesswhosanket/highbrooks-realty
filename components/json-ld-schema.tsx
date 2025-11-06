export function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.thehighbrooks.com/#organization",
        "name": "Highbrook Realty AI",
        "url": "https://www.thehighbrooks.com",
        "logo": "https://www.thehighbrooks.com/logo.png",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://www.thehighbrooks.com/#website",
        "url": "https://www.thehighbrooks.com",
        "name": "Highbrook Realty AI",
        "publisher": {
          "@id": "https://www.thehighbrooks.com/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Service",
        "@id": "https://www.thehighbrooks.com/#service",
        "name": "AI-Powered Location Intelligence for Real Estate",
        "description": "Highbrook Realty AI leverages cutting-edge data analysis to provide a comprehensive understanding of any location, helping you make smarter, data-driven decisions for your hospitality business. Our service includes SWOT analysis, viability scores, revenue projections, and competitor intelligence.",
        "provider": {
          "@id": "https://www.thehighbrooks.com/#organization"
        },
        "serviceType": "Location Intelligence Analysis",
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "url": "https://www.thehighbrooks.com/#analyze-location"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Highbrook Realty AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Highbrook Realty AI is a location intelligence platform that uses advanced data analysis to provide comprehensive insights for real estate and hospitality ventures. We help businesses make smarter, data-driven decisions by analyzing location viability, competition, and revenue potential."
            }
          },
          {
            "@type": "Question",
            "name": "What kind of businesses can benefit from your service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our service is specifically tailored for the hospitality industry. This includes businesses such as cafés, restaurants, hotels, and hostels looking to find the optimal location for their next venture."
            }
          },
          {
            "@type": 'Question',
            "name": "What specific insights does Highbrook Realty AI provide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer a 360-degree view of any location, which includes a detailed SWOT analysis, custom viability scores, revenue projections for your business type, in-depth competitor intelligence, market saturation levels, and even AI-powered suggestions for alternative nearby locations."
            }
          },
          {
            "@type": "Question",
            "name": "How does your AI analyze competitors?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our AI identifies key competitors in your chosen area and analyzes their performance using real-world data. This allows you to understand the competitive landscape, identify market gaps, and develop a strategy to find your competitive edge."
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
