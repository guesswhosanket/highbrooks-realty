# Project Structure

This document provides a map of the codebase to assist developers and AI agents in understanding the organization and flow of the application.

## Directory Overview

### `/pages`
Contains the application's routes (Next.js Pages Router).

- **`_app.tsx`**: The main entry point for all pages. Handles global styles and layout wrappers.
- **`index.tsx`**: The homepage of the application.
- **`about.tsx`**: "About Us" page.
- **`blog.tsx`**: Blog listing page.
- **`results.tsx`**: Displays analysis results (likely from the AI location analysis).
- **`/services`**: Dedicated pages for specific services.
  - `cafe-analysis.tsx`
  - `hostel-analysis.tsx`
  - `hotel-analysis.tsx`
  - `restaurant-analysis.tsx`
- **`/blog`**:
  - `[slug].tsx`: Dynamic route for individual blog posts.
- **`/api`**: Server-side API routes (backend logic).
  - `analyze.ts`: Main endpoint for processing location analysis requests.
  - `candidates.ts`: Likely handles candidate/competitor data.
  - `demographics.ts`: Fetches demographic data.
  - `/pdf/[id].ts`: Generates or retrieves PDF reports.

### `/components`
Reusable UI components.

- **`Navbar.tsx` / `Footer.tsx`**: Global navigation and footer.
- **`GoogleMap.tsx`**: Component for rendering Google Maps integration.
- **`AnalysisReport.tsx`**: Component to display the results of the location analysis.
- **`AuthButton.tsx` / `SignOutButton.tsx`**: Authentication UI components.
- **`CaseStudies.tsx` / `Testimonials.tsx`**: Social proof sections.
- **`faq-section.tsx`**: FAQ accordion or list.
- **`json-ld-schema.tsx`**: Component for injecting Structured Data (SEO/AEO).

### `/lib`
Core business logic, utilities, and external service configurations.

- **`supabaseClient.ts`**: Supabase client initialization.
- **`openaiService.ts`**: Functions for interacting with OpenAI API.
- **`googleMapsService.ts`**: Utilities for Google Maps interactions (Geocoding, Places).
- **`pdfService.ts`**: Utilities for generating PDF reports.

### `/hooks`
Custom React hooks.

- (Check file list for specific hooks, usually for auth or data fetching)

### `/shared`
Shared types, constants, or utility functions used across frontend and backend.

### `/scripts`
Standalone scripts for maintenance or data processing.

- `analyze_coffee_locations.mjs`: Script to batch analyze locations (e.g., using Gemini).

## Key Data Flows

1.  **Location Analysis**:
    - User inputs location data on a Service page (e.g., `cafe-analysis.tsx`).
    - Request is sent to `/api/analyze`.
    - API calls `googleMapsService` to get location context.
    - API calls `openaiService` (or Gemini) to generate insights.
    - Result is returned and displayed via `AnalysisReport.tsx`.

2.  **Authentication**:
    - Handled via Supabase.
    - `AuthButton.tsx` triggers login flow.
    - `_app.tsx` or specific protected routes may check auth state.

3.  **Content**:
    - Blog posts are likely fetched from a CMS or local files in `pages/blog`.

## Environment Variables

Key variables required for the project to run (see `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `GOOGLE_MAPS_API_KEY`
- `GEMINI_API_KEY`
