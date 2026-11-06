import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { asset } from '../lib/assets.js';
import { nav } from '../data/site.js';
import Button from './Button.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const logo = asset('ngazihub-logo');
  const link = ({ isActive }) =>
    `text-sm font-medium hover:text-brand ${isActive ? 'text-brand underline decoration-sun decoration-2 underline-offset-8' : 'text-charcoal'}`;

  return (
    <header className="sticky top-0 z-30 border-b border-charcoal/10 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" aria-label="NgaziHub home">
          {logo ? <img src={logo} alt="NgaziHub" className="h-10 w-auto" /> : <span className="font-display text-xl font-bold text-navy">NgaziHub</span>}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={link}>{n.label}</NavLink>
          ))}
          <Button to="/#join">Register interest</Button>
        </nav>

        <button
          type="button"
          className="rounded-sm border border-charcoal/20 px-3 py-2 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}

        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-charcoal/10 bg-white px-6 py-4 md:hidden">
          <ul className="space-y-4">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} onClick={() => setOpen(false)} className="block text-base font-medium">{n.label}</NavLink>
              </li>
            ))}
            <li><Button to="/#join" onClick={() => setOpen(false)} className="w-full">Register interest</Button></li>
          </ul>
        </nav>
      )}
    </header>
  );
}