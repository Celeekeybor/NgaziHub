const items = [
  {
    title: 'Learn',
    text: 'Practical digital skills, taught step by step for people starting from zero.',
  },
  {
    title: 'Build',
    text: 'Turn what you learn into small projects you can show to others, made alongside other learners.',
  },
  {
    title: 'Meet people',
    text: 'Sessions and events where you can ask questions, share your work and find others who like the same things.',
  },
  {
    title: 'Learn from mentors',
    text: 'People with experience who can explain how they started and what to learn next.',
  },
  {
    title: 'Keep learning',
    text: 'Guides and resources you can come back to in your own time.',
  },
];

export default function WhatYouCanDo() {
  return (
    <section id="learn" aria-labelledby="learn-title" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <h2 id="learn-title" className="max-w-2xl text-3xl font-bold text-navy sm:text-4xl">
          What you can do at NgaziHub
        </h2>

        <ul className="mt-12 border-b border-charcoal/15">

          {items.map((item) => (
            <li key={item.title} className="grid gap-2 border-t border-charcoal/15 py-7 md:grid-cols-12 md:gap-8">
              <h3 className="text-2xl font-bold text-brand md:col-span-4">{item.title}</h3>
              <p className="max-w-xl text-lg leading-relaxed md:col-span-7 md:col-start-6">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}