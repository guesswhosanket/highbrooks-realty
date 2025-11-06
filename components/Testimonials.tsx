export function Testimonials() {
  const testimonials = [
    {
      quote: "Highbrook's analysis was the deciding factor in launching our new café. The competitor intelligence was invaluable and saved us from entering an oversaturated market.",
      author: "Sarah L., Founder of The Daily Grind",
      role: "Boutique Café Owner"
    },
    {
      quote: "The revenue projections were surprisingly accurate. We used the report to secure our initial funding and have exceeded our Year 1 forecast.",
      author: "Mark Chen, Co-Founder of Urban Eats",
      role: "Restaurant Entrepreneur"
    }
  ];

  return (
    <div className="bg-[#0f172a] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Trusted by Hospitality Innovators</h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">Don't just take our word for it. Here's what our early clients have to say.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="p-8 bg-[#1e293b] rounded-xl border border-gray-700">
              <blockquote className="text-lg text-gray-300">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-gray-400">{testimonial.role}</div>
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
