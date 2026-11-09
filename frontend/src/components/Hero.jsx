import heroLearner from '../assets/hero-learner.png';
import Button from './Button.jsx';

export default function Hero() {
  return (
    <section id="top" className="on-dark bg-navy text-ice">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        <div className="px-6 py-16 sm:py-20 lg:col-span-6 lg:py-32">
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Your first step into technology starts here.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ice/85">
            NgaziHub is a digital skills and technology community for young people in Kenya. Learn
            something practical, build with others and meet people who can point you forward.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="#join">Register interest</Button>
            <a href="#learn" className="text-sm font-semibold underline decoration-sun decoration-2 underline-offset-8">
              See what you can do here
            </a>
          </div>
          <p className="mt-12 border-l-4 border-sun pl-4 text-sm text-ice/80">
            We are starting with young people in Kisii, Keroka and Iten.
          </p>
        </div>

        {/* Photo with a single yellow diagonal, taken from the N in the logo */}
        <div className="relative min-h-[320px] lg:col-span-6 lg:min-h-[560px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-sun lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
          />

          <img
            src={heroLearner}
            alt="A young learner smiling while working on a laptop"
            className="absolute inset-0 h-full w-full object-cover lg:[clip-path:polygon(17%_0,100%_0,100%_100%,3%_100%)]"
          />
        </div>
      </div>
    </section>
  );
}