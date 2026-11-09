import Section from '../Section.jsx';
import Button from '../Button.jsx';
import Photo from '../Photo.jsx';

export default function Community() {
  return (
    <Section tone="ice" labelledby="community-title">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <Photo
          name="community-team"
          alt="Three young people looking at a laptop together and smiling"
          className="w-full rounded-sm lg:col-span-7"
        />
        <div className="lg:col-span-5">
          <h2 id="community-title" className="text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Technology is easier with people around you.
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            Learning alone is slow. At NgaziHub you'll find other young people working through the same questions,
            mentors who have been there, and organisations that care about what you build next.
          </p>
          <Button to="/#join" variant="navy" className="mt-7">Register interest</Button>
        </div>
      </div>
    </Section>
  );
}