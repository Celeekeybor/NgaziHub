import communityTeam from '../assets/community-team.png';
import Button from './Button.jsx';

export default function Community() {
  return (
    <section id="community" aria-labelledby="community-title" className="bg-ice">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28">
        <img
          src={communityTeam}
          alt="Three young people looking at a laptop together and smiling"
          className="w-full rounded-sm lg:col-span-7"
        />
        <div className="lg:col-span-5">
          <h2 id="community-title" className="text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Technology is easier with people around you.
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Learning alone is slow. At NgaziHub you'll find other young people working through the
            same questions, mentors who have been there, and organisations that care about what you
            build next.
          </p>
          <Button href="#join" className="mt-8 bg-navy !text-ice hover:bg-brand">
            Register interest
          </Button>
        </div>
      </div>
    </section>
  );
}