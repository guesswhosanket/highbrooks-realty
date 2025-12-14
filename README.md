# Highbrook Realty AI

Highbrook Realty AI is a Next.js application that leverages Artificial Intelligence to provide location intelligence for the hospitality industry (cafes, restaurants, hotels, etc.).

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **AI Services**:
  - [OpenAI](https://openai.com/) (GPT-4)
  - [Google Generative AI](https://ai.google.dev/) (Gemini)
- **Maps**: [Google Maps API](https://developers.google.com/maps)
- **PDF Generation**: [pdf-lib](https://github.com/Hopding/pdf-lib) / [pdfkit](https://github.com/foliojs/pdfkit)

## Getting Started

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    Copy `.env.local.example` (if available) or create `.env.local` with the necessary keys (Supabase, OpenAI, Google Maps).
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Open [http://localhost:3000](http://localhost:3000)** to view the application.

## Project Structure

For a detailed breakdown of the project structure and how files interact, please refer to [docs/project_structure.md](docs/project_structure.md).
