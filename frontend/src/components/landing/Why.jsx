import Section from '../Section.jsx';

const items = [
  ['Learn', 'Practical digital skills, taught step by step for people starting from zero.'],
  ['Build', 'Small projects you can show to others, made alongside other learners.'],
  ['Meet people', 'Sessions and events to ask questions, share your work and find others who like the same things.'],
  ['Learn from mentors', 'People with experience who explain how they started and what to learn next.'],
];

export default function Why() {
  return (
    <Section tone="ice" labelledby="why-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="why-title" className="text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Most young people don't lack talent. They lack a place to start.
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            NgaziHub is being built as somewhere a young person can discover technology, learn practical digital
            skills, make things and meet others who are curious about the same ideas. Over time it grows into a
            network of organisations that want to see young people in Kenya thrive.
          </p>
        </div>
        <ul className="border-b border-charcoal/15 lg:col-span-6 lg:col-start-7">
          {items.map(([t, d]) => (
            <li key={t} className="grid gap-1 border-t border-charcoal/15 py-5 sm:grid-cols-5 sm:gap-6">
              <h3 className="text-xl font-bold text-brand sm:col-span-2">{t}</h3>
              <p className="leading-relaxed sm:col-span-3">{d}</p>
            </li>
          ))}
        </ul>
      </div>

    </Section>
  );
}