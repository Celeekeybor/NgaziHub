import { Link } from 'react-router-dom';
import Section from '../Section.jsx';

const ways = [
  { title: 'Partner with us', text: 'Organisations and technology companies working with NgaziHub on learning, community and access.', to: '/corporate?topic=partner#request' },
  { title: 'Sponsor a session', text: 'Fund a learning session for young people in a town and follow it through with us.', to: '/corporate?topic=sponsor#request' },
  { title: 'Become a mentor', text: 'Share what you know with someone who is just starting out.', to: '/corporate?topic=mentor#request' },
];

export default function Participate() {
  return (
    <Section id="participate" tone="ice" labelledby="participate-title">
      <h2 id="participate-title" className="max-w-2xl text-3xl font-bold leading-tight text-navy sm:text-4xl">
        NgaziHub grows with the people who back it.
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0">
        {ways.map((w, i) => (
          <div key={w.title} className={`border-t-4 border-navy pt-5 md:pr-8 ${i > 0 ? 'md:border-l md:pl-8' : ''}`}>
            <h3 className="text-2xl font-bold text-navy">{w.title}</h3>
            <p className="mt-2 leading-relaxed">{w.text}</p>
            <Link to={w.to} className="mt-4 inline-block font-semibold text-navy underline decoration-sun decoration-2 underline-offset-8">
              {w.title}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}