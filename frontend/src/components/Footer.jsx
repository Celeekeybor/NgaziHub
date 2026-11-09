import { Link } from 'react-router-dom';
import { asset } from '../lib/assets.js';
import { nav } from '../data/site.js';
import { useAdmin } from '../admin/AdminStore.jsx';

export default function Footer() {
  const {data: {contact, footer}} = useAdmin();
  const logo = asset('ngazihub-logo');
  const col = 'space-y-2.5 text-sm font-medium';
  return (
    <footer className="border-t border-charcoal/10 bg-ice">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          {logo ? <img src={logo} alt="NgaziHub" className="h-12 w-auto" /> : <span className="font-display text-2xl font-bold text-navy">NgaziHub</span>}
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {footer.description}
          </p>
        </div>
        <nav aria-label="Learn" className="md:col-span-2 md:col-start-7">
          <h2 className="mb-3 text-sm font-bold text-navy">Learn</h2>
          <ul className={col}>
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-brand">{n.label}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Get involved" className="md:col-span-3">
          <h2 className="mb-3 text-sm font-bold text-navy">Get involved</h2>
          <ul className={col}>
            <li><Link to="/#join" className="hover:text-brand">Register interest</Link></li>
            <li><Link to="/corporate?topic=partner#request" className="hover:text-brand">Partner with us</Link></li>
            <li><Link to="/corporate?topic=sponsor#request" className="hover:text-brand">Sponsor a session</Link></li>
            <li><Link to="/corporate?topic=mentor#request" className="hover:text-brand">Become a mentor</Link></li>
            {contact.email && <li><a href={`mailto:${contact.email}`} className="hover:text-brand">{contact.email}</a></li>}
            {contact.phone && <li><a href={`tel:${contact.phone}`} className="hover:text-brand">{contact.phone}</a></li>}
          </ul>

        </nav>
      </div>
      <div className="border-t border-charcoal/10 px-6 py-4 text-center text-xs text-charcoal/70">
        © {new Date().getFullYear()} NgaziHub.org. {footer.notice}
      </div>
    </footer>
  );
}