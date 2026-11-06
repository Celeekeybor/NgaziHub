import Section from '../Section.jsx';
import Button from '../Button.jsx';
import { departments } from '../../data/courses.js';

export default function CoursesPreview() {
  return (
    <Section tone="white" labelledby="courses-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="courses-title" className="max-w-2xl text-3xl font-bold leading-tight text-navy sm:text-4xl">
          From your first computer to your first website.
        </h2>
        <Button to="/courses" variant="navy">See all courses</Button>
      </div>

      <div className="mt-10 grid border-b border-charcoal/15 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <div key={d.id} className="border-t border-charcoal/15 py-5 md:pr-8">
            <p className="text-sm font-semibold text-brand">{d.range} · {d.courses.length} courses</p>
            <h3 className="mt-1 text-xl font-bold text-navy">{d.name}</h3>
            <p className="mt-2 leading-relaxed">{d.blurb}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 max-w-2xl text-sm text-charcoal/80">
        We plan to open with eight courses, starting with Computer Packages — Complete, Introduction to Programming
        and Python for Beginners. Fees and intake dates are published once confirmed.
      </p>
    </Section>
  );
}