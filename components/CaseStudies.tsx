export function CaseStudies() {
  const studies = [
    {
      title: "How Competitor Analysis Saved a New Restaurant Venture",
      challenge: "An entrepreneur was set to open a new Italian restaurant in a neighborhood that seemed perfect, but was unaware of two other high-end Italian restaurants opening within three months.",
      solution: "Highbrook's AI identified the incoming competitors and flagged the market as 'oversaturated.' It then suggested an alternative location two miles away with low competition and a high-income demographic, which became a runaway success.",
      outcome: "Averted a potential failure and found a more profitable location."
    }
  ];

  return (
    <div className="bg-[#1e293b] py-20 sm:py-28 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Real Results, Real Success</h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">See how our data-driven insights have helped businesses thrive.</p>
        </div>
        <div className="mt-16 max-w-lg mx-auto">
          {studies.map((study) => (
            <div key={study.title} className="p-8 bg-[#0f172a] rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-[#7c7ff3]">{study.title}</h3>
              <div className="mt-4 space-y-4 text-gray-300">
                <p><strong>The Challenge:</strong> {study.challenge}</p>
                <p><strong>The Insight:</strong> {study.solution}</p>
                <p><strong>The Outcome:</strong> {study.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
