import Seo from '../components/Seo.jsx';
import Hero from '../components/landing/Hero.jsx';
import Doors from '../components/landing/Doors.jsx';
import Why from '../components/landing/Why.jsx';
import CoursesPreview from '../components/landing/CoursesPreview.jsx';
import KidsBand from '../components/landing/KidsBand.jsx';
import Community from '../components/landing/Community.jsx';
import JoinSection from '../components/landing/JoinSection.jsx';
import CorporateBand from '../components/landing/CorporateBand.jsx';
import Participate from '../components/landing/Participate.jsx';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'NgaziHub',
  url: 'https://ngazihub.org',
  logo: 'https://ngazihub.org/favicon.png',
  description: 'A computer and IT academy and technology community for young people in Kenya, with a kids holiday academy and corporate training.',
  areaServed: ['Kisii', 'Keroka', 'Iten', 'Kenya'],
};

export default function LandingPage() {
  return (
    <>
      <Seo
        path="/"
        title="NgaziHub | Computer and IT courses, kids coding camps and corporate training in Kenya"
        description="NgaziHub is a computer and IT academy and technology community for young people in Kenya. Courses for school leavers, holiday camps for kids aged 6–17 and AI, cybersecurity and IT training for organisations. Starting in Kisii, Keroka and Iten."
        jsonLd={jsonLd}
      />
      <Hero />
      <Doors />

      <Why />
      <CoursesPreview />
      <KidsBand />
      <Community />
      <JoinSection />
      <CorporateBand />
      <Participate />
    </>
  );
}