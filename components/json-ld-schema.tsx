export function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://thehighbrooks.com/#organization",
        "name": "Highbrook Realty AI",
        "url": "https://thehighbrooks.com/",
        "logo": "https://thehighbrooks.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-010-4321",
          "contactType": "customer support",
          "email": "support@thehighbrooks.com"
        },
        "sameAs": [
          "https://twitter.com/YourTwitterHandle",
          "https://www.linkedin.com/company/YourLinkedInPage"
        ],
        "description": "Highbrook Realty AI leverages cutting-edge data analysis and AI-powered insights to provide comprehensive location intelligence for the hospitality industry, helping businesses make data-driven decisions."
      },
      {
        "@type": "WebSite",
        "@id": "https://thehighbrooks.com/#website",
        "url": "https://thehighbrooks.com/",
        "name": "Highbrook Realty AI",
        "publisher": { "@id": "https://thehighbrooks.com/#organization" }
      },
      {
        "@type": "Service",
        "@id": "https://thehighbrooks.com/#service",
        "name": "Location Intelligence Analysis",
        "provider": { "@id": "https://thehighbrooks.com/#organization" },
        "description": "AI-powered location analysis, competitor intelligence, and revenue projections for the hospitality industry."
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
