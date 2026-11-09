export default function Purpose() {
  return (
    <section aria-labelledby="purpose-title" className="bg-ice">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-12 lg:py-28">
        <h2 id="purpose-title" className="text-3xl font-bold leading-tight text-navy sm:text-4xl lg:col-span-6">
          Most young people don't lack talent. They lack a place to start.
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-charcoal/90 lg:col-span-5 lg:col-start-8">
          <p>
            NgaziHub is being built as somewhere a young person can discover technology, learn
            practical digital skills, make things and meet others who are curious about the same
            ideas.
          </p>
          <p>
            It is a place to learn, a community to belong to and, over time, a network of
            organisations that want to see young people in Kenya grow.
          </p>
        </div>
      </div>
    </section>
  );
}