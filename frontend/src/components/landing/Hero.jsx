import Button from '../Button.jsx';
import Photo from '../Photo.jsx';

export default function Hero() {
  return (
    <section className="on-dark bg-navy text-ice">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        <div className="px-6 py-14 sm:py-16 lg:col-span-6 lg:py-24">
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Your first step into technology starts here.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ice/85">
            NgaziHub is a computer and IT academy and technology community for young people in Kenya. Learn
            something practical, build with others and meet people who can point you forward.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button to="/#join">Register interest</Button>
            <Button to="/courses" variant="outline">Browse courses</Button>
          </div>
          <p className="mt-10 border-l-4 border-sun pl-4 text-sm text-ice/80">
            We are starting with young people in Kisii, Keroka and Iten.
          </p>
        </div>

        {/* One yellow diagonal, taken from the N in the logo */}
        <div className="relative min-h-[300px] lg:col-span-6 lg:min-h-[520px]">
          <div aria-hidden="true" className="absolute inset-0 bg-sun lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]" />
          <Photo
            name="hero-learner"
            eager
            alt="A young learner smiling while working on a laptop"
            className="absolute inset-0 h-full w-full lg:[clip-path:polygon(17%_0,100%_0,100%_100%,3%_100%)]"

          />
        </div>
      </div>
    </section>
  );
}