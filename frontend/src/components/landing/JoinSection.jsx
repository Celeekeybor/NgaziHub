import Section from '../Section.jsx';
import InterestForm from '../InterestForm.jsx';

export default function JoinSection() {
  return (
    <Section id="join" tone="white" labelledby="join-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Get in touch</p>
          <h2 id="join-title" className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">Tell us what you're looking for.</h2>
          <p className="mt-5 text-lg leading-relaxed">Interested in a course, corporate training, or the Kids Holiday Academy? Tell us what you need and how we can reach you.</p>
          <p className="mt-4 text-lg leading-relaxed">Parents, students, professionals, teams and partners are all welcome. Our team can review your inquiry once form submissions are connected.</p>
        </div>
        <div className="bg-ice p-2 lg:col-span-6 lg:col-start-7"><InterestForm /></div>
      </div>
    </Section>
  );
}
