import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Purpose from '../components/Purpose.jsx';
import WhatYouCanDo from '../components/WhatYouCanDo.jsx';
import Community from '../components/Community.jsx';
import JoinSection from '../components/JoinSection.jsx';
import Participate from '../components/Participate.jsx';
import Footer from '../components/Footer.jsx';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Purpose />
        <WhatYouCanDo />
        <Community />
        <JoinSection />
        <Participate />
      </main>
      <Footer />
    </>
  );
}