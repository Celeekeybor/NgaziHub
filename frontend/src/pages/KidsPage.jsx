import { useState } from 'react';
import Seo, { faqJsonLd } from '../components/Seo.jsx';
import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';
import CodeBlocks from '../components/CodeBlocks.jsx';
import Photo from '../components/Photo.jsx';
import Faq from '../components/Faq.jsx';
import KidsForm from '../components/KidsForm.jsx';
import { asset } from '../lib/assets.js';
import { groups, bootcamps, kidsCourses, ageFilters, parentPoints, kidsFaqs } from '../data/kids.js';

const jsonLd = faqJsonLd(kidsFaqs);

export default function KidsPage() {
  const [filter, setFilter] = useState(0);
  const range = ageFilters[filter].range;
  const shown = range ? kidsCourses.filter((c) => c.range[0] <= range[1] && c.range[1] >= range[0]) : kidsCourses;
  const hasPhoto = Boolean(asset('kids-hero'));

  return (
    <div className="font-kids">
      <Seo
        path="/kids"
        title="Kids coding, robotics and computer camps for ages 6–17 | NgaziHub Kids Holiday Academy"
        description="Supervised school-holiday camps in coding, robotics, computer skills and digital creativity for children and teens aged 6–17. Starting in Kisii, Keroka and Iten. Join the holiday waitlist."
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <Section tone="sun" labelledby="kids-h1" className="py-12! lg:py-16!">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">

            <p className="inline-block -rotate-2 rounded-full bg-navy px-4 py-1 text-sm font-semibold text-ice">
              Ages 6–17 · School-holiday camps
            </p>
            <h1 id="kids-h1" className="mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Big ideas start with little coders.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">
              Make the school holidays count. Supervised, hands-on camps in coding, robotics, computer skills and
              digital creativity, where every child finishes with a project to show their family.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="#waitlist" variant="navy">Join the holiday waitlist</Button>
              <Button href="#camps" variant="outline">See the camps</Button>
            </div>
            <p className="mt-6 text-sm font-semibold">
              Starting in Kisii, Keroka and Iten. Dates, venues and fees are announced before registration opens.
            </p>
          </div>
          <div className="lg:col-span-5">
            {hasPhoto ? (
              <Photo name="kids-hero" alt="Children coding together at a computer" eager className="aspect-[4/3] w-full rounded-3xl" />
            ) : (
              <CodeBlocks />
            )}
          </div>
        </div>
      </Section>

      {/* Age groups */}
      <Section tone="white" labelledby="groups-title" className="font-kids">
        <h2 id="groups-title" className="text-3xl font-semibold text-navy sm:text-4xl">Find the right group</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {groups.map((g) => (
            <div key={g.name} className={`rounded-2xl p-6 ${g.tone}`}>
              <p className="text-5xl font-semibold">{g.ages}</p>
              <h3 className="mt-1 text-xl font-semibold">{g.name}</h3>
              <p className="mt-3 leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-charcoal/80">Age ranges are a guide. Ability, experience and parent input can shape placement.</p>
      </Section>

      {/* Camps */}
      <Section id="camps" tone="ice" labelledby="camps-title">
        <h2 id="camps-title" className="text-3xl font-semibold text-navy sm:text-4xl">Holiday camps</h2>
        <p className="mt-2 max-w-2xl text-lg">Short programmes of one to three weeks. Each one ends with something the child made.</p>
        <ul className="mt-8 border-b border-charcoal/15">
          {bootcamps.map((b) => (
            <li key={b.name} className="grid gap-1 border-t border-charcoal/15 py-4 md:grid-cols-12 md:gap-6">
              <h3 className="text-xl font-semibold text-navy md:col-span-4">{b.name}</h3>
              <p className="text-sm font-semibold text-brand md:col-span-2 md:pt-1.5">Ages {b.ages} · {b.length}</p>
              <p className="md:col-span-6"><span className="font-semibold">They make: </span>{b.outcome}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-charcoal/80">Camps are planned for the April, August and December school holidays. Dates are confirmed before registration opens.</p>
      </Section>

      {/* Topics */}
      <Section tone="white" labelledby="topics-title">
        <h2 id="topics-title" className="text-3xl font-semibold text-navy sm:text-4xl">What children can learn</h2>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by age">
          {ageFilters.map((f, i) => (

            <button
              key={f.label}
              type="button"
              aria-pressed={filter === i}
              onClick={() => setFilter(i)}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold ${filter === i ? 'border-navy bg-navy text-ice' : 'border-navy/30 hover:border-navy'}`}
            >
              {f.label === 'All ages' ? f.label : `Ages ${f.label}`}
            </button>
          ))}
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <li key={c.code} className="rounded-xl border-2 border-navy/15 p-4">
              <p className="font-semibold text-navy">{c.title}</p>
              <p className="mt-1 text-sm text-charcoal/80">{c.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Parents */}
      <Section tone="navy" labelledby="parents-title">
        <h2 id="parents-title" className="text-3xl font-semibold sm:text-4xl">For parents and guardians</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {parentPoints.map(([t, d]) => (
            <div key={t} className="border-t-4 border-sun pt-4">
              <h3 className="text-xl font-semibold">{t}</h3>
              <p className="mt-2 leading-relaxed text-ice/85">{d}</p>
            </div>
          ))}
        </div>

      </Section>

      {/* Waitlist */}
      <Section id="waitlist" tone="butter" labelledby="waitlist-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="waitlist-title" className="text-3xl font-semibold text-navy sm:text-4xl">Join the holiday waitlist</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Leave your details and we'll contact you as soon as camp dates, venues and fees are confirmed in your town.
              This is not a booking and no payment is needed.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><KidsForm /></div>
        </div>
      </Section>

      <Section tone="white" labelledby="faq-title" className="font-sans">
        <h2 id="faq-title" className="text-3xl font-semibold text-navy sm:text-4xl">Questions parents ask</h2>
        <div className="mt-6"><Faq items={kidsFaqs} kids /></div>
      </Section>
    </div>
  );
}