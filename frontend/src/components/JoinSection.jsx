import InterestForm from './InterestForm.jsx';

export default function JoinSection() {
  return (
    <section id="join" aria-labelledby="join-title" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="join-title" className="text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Finished KCSE? Use the holiday to start.
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            The long break is a good time to try something new. Leave your details and we'll tell
            you when sessions open in Kisii, Keroka and Iten.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Still in school, or somewhere else in Kenya? Register too, and we'll keep you in mind as
            NgaziHub grows.
          </p>
        </div>
        <div className="bg-ice p-2 lg:col-span-6 lg:col-start-7">
          <InterestForm />
        </div>
      </div>
    </section>
  );
}