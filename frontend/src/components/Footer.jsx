import logo from '../assets/ngazihub-logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-ice">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={logo} alt="NgaziHub" className="h-12 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            A digital skills and technology community for young people in Kenya. Starting in Kisii,
            Keroka and Iten.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-8">
          <ul className="space-y-3 text-sm font-medium">
            <li><a href="#learn" className="hover:text-brand">What you can do</a></li>
            <li><a href="#community" className="hover:text-brand">Community</a></li>
            <li><a href="#join" className="hover:text-brand">Register interest</a></li>
            <li><a href="#participate" className="hover:text-brand">Get involved</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-charcoal/10 px-6 py-5 text-center text-xs text-charcoal/70">
        © {new Date().getFullYear()} NgaziHub.org
      </div>
    </footer>
  );
}