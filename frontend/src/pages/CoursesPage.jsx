import { useMemo, useState } from 'react';
import Seo from '../components/Seo.jsx';
import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';
import { departments, allCourses, firstCourses, formats } from '../data/courses.js';

export default function CoursesPage() {
  const [dept, setDept] = useState('all');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allCourses.filter(
      (c) => (dept === 'all' || c.dept === dept) && (!term || `${c.code} ${c.title}`.toLowerCase().includes(term))
    );
  }, [dept, q]);

  const chip = (active) =>
    `rounded-sm border px-3 py-1.5 text-sm font-semibold ${active ? 'border-navy bg-navy text-ice' : 'border-charcoal/30 bg-white hover:border-navy'}`;

  return (
    <>
      <Seo
        path="/courses"
        title="Computer and IT courses in Kenya | NgaziHub"
        description="Browse NgaziHub's planned computer and IT courses: computer packages, programming, networking, hardware and IT support, cybersecurity and web development. Online, physical and hybrid."
      />

      <Section tone="navy" labelledby="courses-h1" className="py-12! lg:py-16!">
        <h1 id="courses-h1" className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Computer and IT courses</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ice/85">
          Practical training from first computer skills to programming, networking and cybersecurity.

          Fees, intake dates and entry requirements are published for each course once confirmed.
        </p>
      </Section>

      <Section tone="white" className="py-10! lg:py-12!">
        <div className="grid gap-0 md:grid-cols-3">
          {formats.map((f, i) => (
            <div key={f.name} className={`border-t-4 border-navy py-4 md:pr-8 ${i > 0 ? 'md:border-l md:pl-8' : ''}`}>
              <h2 className="text-xl font-bold text-navy">{f.name}</h2>
              <p className="mt-1 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ice" labelledby="first-title" className="py-10! lg:py-14!">
        <h2 id="first-title" className="text-2xl font-bold text-navy sm:text-3xl">Planned first courses</h2>
        <p className="mt-2 text-sm text-charcoal/80">Durations are planning estimates and may change.</p>
        <ul className="mt-6 grid border-b border-charcoal/15 md:grid-cols-2 md:gap-x-10">
          {firstCourses.map((c) => (
            <li key={c.code} className="flex items-baseline justify-between gap-4 border-t border-charcoal/15 py-3">
              <span><span className="mr-3 text-sm font-semibold text-brand">{c.code}</span>{c.title}</span>
              <span className="shrink-0 text-sm text-charcoal/80">{c.weeks} weeks · {c.mode}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="catalog" tone="white" labelledby="catalog-title">
        <h2 id="catalog-title" className="text-2xl font-bold text-navy sm:text-3xl">Full course catalog</h2>

        <div className="mt-6 flex flex-wrap items-center gap-2">

          <button type="button" className={chip(dept === 'all')} onClick={() => setDept('all')}>All ({allCourses.length})</button>
          {departments.map((d) => (
            <button key={d.id} type="button" className={chip(dept === d.id)} onClick={() => setDept(d.id)}>
              {d.name}
            </button>
          ))}
        </div>

        <div className="mt-5 max-w-md">
          <label htmlFor="course-search" className="sr-only">Search courses</label>
          <input
            id="course-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or code, e.g. Python"
            className="w-full rounded-sm border border-charcoal/30 bg-white px-3.5 py-2.5 focus:border-brand"
          />
        </div>

        <p className="mt-4 text-sm text-charcoal/80" aria-live="polite">{list.length} courses</p>
        {list.length === 0 ? (
          <p className="mt-4 text-lg">No courses match that search. Try a shorter word or choose another department.</p>
        ) : (
          <ul className="mt-2 grid border-b border-charcoal/15 md:grid-cols-2 md:gap-x-10">
            {list.map((c) => (
              <li key={c.code} className="flex items-baseline justify-between gap-4 border-t border-charcoal/15 py-3">
                <span><span className="mr-3 text-sm font-semibold text-brand">{c.code}</span>{c.title}</span>
                <span className="shrink-0 text-sm text-charcoal/80">{c.mode}</span>
              </li>
            ))}
          </ul>

        )}
        <p className="mt-5 max-w-3xl text-sm text-charcoal/80">
          Course codes are internal identifiers. Security exercises take place only in authorised labs.
          Learners receive a NgaziHub certificate of completion, not an accredited qualification.
        </p>
      </Section>

      <Section tone="sun" className="py-10! lg:py-12!">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <h2 className="max-w-xl text-2xl font-bold text-navy sm:text-3xl">Want to hear when courses open?</h2>
          <Button to="/#join" variant="navy">Register interest</Button>
        </div>
      </Section>
    </>
  );
}