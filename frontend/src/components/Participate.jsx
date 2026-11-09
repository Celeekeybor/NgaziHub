// TODO: point these at real pages or forms when they exist.
const ways = [
  {
    title: 'Partner with us',
    text: 'Organisations and technology companies working with NgaziHub on learning, community and access.',
    href: '#',
  },
  {
    title: 'Sponsor a session',
    text: 'Fund a learning session for young people in a town and follow it through with us.',
    href: '#',
  },
  {
    title: 'Become a mentor',
    text: 'Share what you know with someone who is just starting out.',
    href: '#',
  },
];

export default function Participate() {
  return (
    <section id="participate" aria-labelledby="participate-title" className="on-dark bg-navy text-ice">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <h2 id="participate-title" className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          NgaziHub grows with the people who back it.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ice/85">
          If you work in technology, run an organisation or simply want to help, there is room to
          take part from the start.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">

          {ways.map((w, i) => (
            <div key={w.title} className={`border-t border-ice/25 pt-6 md:pr-10 ${i > 0 ? 'md:border-l md:pl-10' : ''}`}>
              <h3 className="text-2xl font-bold">{w.title}</h3>
              <p className="mt-3 leading-relaxed text-ice/85">{w.text}</p>
              <a
                href={w.href}
                className="mt-6 inline-block font-semibold underline decoration-sun decoration-2 underline-offset-8"
              >
                {w.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}