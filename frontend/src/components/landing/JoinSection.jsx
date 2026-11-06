import Section from '../Section.jsx';
import InterestForm from '../InterestForm.jsx';

export default function JoinSection() {
  return (
    <Section id="join" tone="white" labelledby="join-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="join-title" className="text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Finished KCSE? Use the holiday to start.
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            The long break is a good time to try something new. Leave your details and we'll tell you when courses
            open in Kisii, Keroka and Iten.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Still in school, or elsewhere in Kenya? Register too, and we'll keep you in mind as NgaziHub grows.
          </p>
        </div>
        <div className="bg-ice p-2 lg:col-span-6 lg:col-start-7">
          <InterestForm />
        </div>
      </div>
    </Section>
  );
}