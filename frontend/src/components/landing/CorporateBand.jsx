import { Link } from 'react-router-dom';
import Section from '../Section.jsx';
import Button from '../Button.jsx';
import { workshops } from '../../data/corporate.js';

export default function CorporateBand() {
  return (
    <Section tone="navy" labelledby="corp-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="corp-title" className="text-3xl font-bold leading-tight sm:text-4xl">
            Practical AI, cybersecurity and IT training for your team.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ice/85">
            Workshops for companies, NGOs, schools and institutions, delivered at your premises, at our academy or online.
          </p>
          <Button to="/corporate#request" className="mt-7">Request corporate training</Button>
        </div>
        <ul className="border-b border-ice/25 lg:col-span-6 lg:col-start-7">
          {workshops.map((w) => (
            <li key={w.name} className="border-t border-ice/25 py-4">
              <Link to="/corporate#workshops" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="text-lg font-semibold">{w.name}</span>
                <span className="text-sm text-ice/80">{w.length} · {w.who}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}