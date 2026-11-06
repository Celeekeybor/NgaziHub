import Section from '../Section.jsx';
import Button from '../Button.jsx';
import CodeBlocks from '../CodeBlocks.jsx';
import { groups } from '../../data/kids.js';

export default function KidsBand() {
  return (
    <Section tone="sun" labelledby="kids-title" className="font-kids">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="inline-block rounded-full bg-navy px-4 py-1 text-sm font-semibold text-ice">Kids Holiday Academy · Ages 6–17</p>
          <h2 id="kids-title" className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Big ideas start with little coders.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed">
            Make the school holidays count with supervised, hands-on camps in coding, robotics, computer skills and
            digital creativity. Every learner finishes with something they made.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.name} className="rounded-full border-2 border-navy px-4 py-1.5 text-sm font-semibold">
                {g.name} · {g.ages}
              </li>
            ))}
          </ul>
          <Button to="/kids" variant="navy" className="mt-8">See the camps</Button>
        </div>
        <div className="lg:col-span-5"><CodeBlocks /></div>
      </div>
    </Section>
  );
}