import Button from '../Button.jsx';
import Photo from '../Photo.jsx';
import { useAdmin } from '../../admin/AdminStore.jsx';

export default function Hero() {
  const {data: {home}} = useAdmin();
  return (
    <section className="on-dark bg-navy text-ice">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        <div className="order-2 px-5 py-9 sm:px-6 sm:py-16 lg:order-1 lg:col-span-6 lg:py-24">
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            {home.headline}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ice/85">
            {home.intro}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-4">
            <Button to="/#join" className="w-full whitespace-nowrap px-2 py-3 text-center text-xs sm:w-auto sm:px-5 sm:text-sm">Register interest</Button>
            <Button to="/courses" variant="outline" className="w-full whitespace-nowrap px-2 py-3 text-center text-xs sm:w-auto sm:px-5 sm:text-sm">Browse courses</Button>
          </div>
          <p className="mt-10 border-l-4 border-sun pl-4 text-sm text-ice/80">
            {home.localNote}
          </p>
        </div>

        {/* One yellow diagonal, taken from the N in the logo */}
        <div className="relative order-1 h-[220px] min-h-0 overflow-hidden sm:h-[320px] lg:order-2 lg:col-span-6 lg:h-auto lg:min-h-[520px] lg:overflow-visible">
          <div aria-hidden="true" className="absolute inset-0 bg-sun lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]" />
          <Photo
            name="hero-learner"
            eager
            alt="A young learner smiling while working on a laptop"
            className="absolute inset-0 h-full w-full object-cover object-center lg:[clip-path:polygon(17%_0,100%_0,100%_100%,3%_100%)]"

          />
        </div>
      </div>
    </section>
  );
}