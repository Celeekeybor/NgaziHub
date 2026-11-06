import { Link } from 'react-router-dom';
import Section from '../Section.jsx';

const doors = [
  { title: 'I want to learn', who: 'School leavers, job seekers and anyone starting out', fact: '66 planned courses across 6 departments, online and in person.', to: '/courses', cta: 'Browse courses' },
  { title: 'My child wants to learn', who: 'Children and teens aged 6–17', fact: 'School-holiday camps in coding, robotics and computer skills.', to: '/kids', cta: 'See the Holiday Academy' },
  { title: 'My organisation needs training', who: 'Companies, NGOs, schools and institutions', fact: 'AI, cybersecurity, data protection and IT workshops for teams.', to: '/corporate', cta: 'Explore corporate training' },
];

export default function Doors() {
  return (
    <Section tone="white" labelledby="doors-title" className="py-10! lg:py-12!">
      <h2 id="doors-title" className="sr-only">Choose where to start</h2>
      <div className="grid gap-0 md:grid-cols-3">
        {doors.map((d, i) => (
          <Link
            key={d.title}
            to={d.to}
            className={`group block border-t-4 border-navy py-5 md:pr-8 ${i > 0 ? 'md:border-l md:pl-8' : ''} hover:border-t-sun`}
          >
            <h3 className="text-2xl font-bold text-navy">{d.title}</h3>
            <p className="mt-1 text-sm font-semibold text-brand">{d.who}</p>
            <p className="mt-3 leading-relaxed">{d.fact}</p>
            <span className="mt-4 inline-block font-semibold text-navy underline decoration-sun decoration-2 underline-offset-8">{d.cta}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}