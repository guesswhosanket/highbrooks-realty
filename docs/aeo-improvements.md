# AEO & Content Strategy Improvements Checklist

This document outlines the recommended improvements based on the comprehensive AEO and content strategy report. Each item includes the relevant file path for implementation.

## High Priority

These actions will have the most significant and immediate impact on E-E-A-T, technical SEO, and user trust.

- [ ] **Update JSON-LD Schema:** Replace the current schema with the complete, more detailed version provided below.  
    *   **File:** `components/json-ld-schema.tsx`
- [ ] **Add Testimonials Section:** Create a new component and add it to the homepage to display client testimonials. This is a critical trust signal.  
    *   **File:** `pages/index.tsx`
- [ ] **Enhance About Page:** Expand the "About Us" page to include detailed profiles of all key team members, not just the founder, to further establish expertise.  
    *   **File:** `pages/about.tsx`
- [ ] **Verify Homepage Meta Tags:** Ensure the primary meta title and description in the main layout reflect the recommended, keyword-rich versions.  
    *   **File:** `pages/_app.tsx`

## Medium Priority

These actions focus on building a content moat to attract users at different stages of the buyer's journey.

- [ ] **Create Dedicated Service Pages:** Develop individual pages for each business type to provide detailed, specific information.  
    *   **Files:** Create new pages like `pages/services/cafe-analysis.tsx`, `pages/services/restaurant-analysis.tsx`, etc.
- [ ] **Launch a Content Hub (Blog):** Set up a blog structure to host articles and pillar posts. This is essential for long-term content freshness and authority.  
    *   **Files:** Create a blog index at `pages/blog.tsx` and a dynamic page for posts at `pages/blog/[slug].tsx`.
- [ ] **Write First Pillar Post:** Create the first long-form pillar post, such as "The Ultimate Guide to Choosing a Restaurant Location."  
    *   **File:** New entry in your blog/content structure.
- [ ] **Add Case Studies:** Create a section or a dedicated page to showcase success stories (can be anonymized) that detail a client's challenge, the solution provided by the AI, and the positive outcome.  
    *   **File:** Add to `pages/index.tsx` or create a new page at `pages/case-studies.tsx`.

## Low Priority

These are smaller enhancements that refine the user experience and add minor trust signals.

- [ ] **Add Social Media Links:** Add the `sameAs` social media links (LinkedIn, Twitter) from the JSON-LD schema to the footer.  
    *   **File:** `components/Footer.tsx`
- [ ] **Add Contact Info:** Include the email and phone number from the `contactPoint` schema in the footer or on the About page.  
    *   **File:** `components/Footer.tsx` or `pages/about.tsx`

---

## JSON-LD Schema Implementation

Replace the entire contents of `components/json-ld-schema.tsx` with the following code, which uses the complete, untruncated schema.

```typescript
export function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.thehighbrooks.com/#organization",
        "name": "Highbrook Realty AI",
        "url": "https://www.thehighbrooks.com/",
        "logo": "https://www.thehighbrooks.com/logo.png",
        "sameAs": [
          "https://www.linkedin.com/company/highbrook-realty-ai",
          "https://twitter.com/highbrookrealtyai"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@thehighbrooks.com",
          "telephone": "+1-555-010-4321"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.thehighbrooks.com/#website",
        "url": "https://www.thehighbrooks.com/",
        "name": "Highbrook Realty AI",
        "description": "AI-Powered Insights for Real Estate Success in the Hospitality Industry.",
        "publisher": {
          "@id": "https://www.thehighbrooks.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.thehighbrooks.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Service",
        "@id": "https://www.thehighbrooks.com/#service",
        "name": "AI-Powered Location Intelligence for Hospitality",
        "serviceType": "Location Analytics Software",
        "description": "Highbrook Realty AI provides comprehensive location intelligence for hospitality businesses, including SWOT analysis, custom viability scores, detailed revenue projections, and competitor intelligence. Our service is tailored for cafés, restaurants, hotels, and hostels.",
        "provider": {
          "@id": "https://www.thehighbrooks.com/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "USA"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Location Analysis Reports",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Café Location Analysis Report"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Restaurant Location Analysis Report"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hotel Location Analysis Report"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hostel Location Analysis Report"
              }
            }
          ]
        },
        "serviceOutput": {
          "@type": "Report",
          "name": "Location Viability and Intelligence Report"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.thehighbrooks.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Highbrook Realty AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Highbrook Realty AI is a specialized analytics tool that provides location intelligence for the hospitality industry. It helps entrepreneurs and investors make data-driven real estate decisions by offering deep insights into any location's viability, competition, and revenue potential for businesses like cafés, restaurants, hotels, and hostels."
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
```

---

## Implementation Notes

- **E-E-A-T is Key:** The highest priority items are all related to building trust and authority. A B2B service selling data insights must appear credible.
- **Content is a Long-Term Play:** The medium-priority items (blog, service pages) are crucial for attracting organic traffic over time. Plan for a consistent content production schedule.
- **Check Off Items:** As you complete each task, mark the checkbox to track your progress.
