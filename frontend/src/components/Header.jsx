import { useState } from 'react';
import logo from '../assets/ngazihub-logo.png';
import Button from './Button.jsx';

const links = [
  { label: 'What you can do', href: '#learn' },
  { label: 'Community', href: '#community' },
  { label: 'Get involved', href: '#participate' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-charcoal/10 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" aria-label="NgaziHub home">
          <img src={logo} alt="NgaziHub" className="h-10 w-auto" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-charcoal hover:text-brand">
              {l.label}
            </a>
          ))}
          <Button href="#join">Register interest</Button>
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
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block text-base font-medium">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Button href="#join" onClick={() => setOpen(false)} className="w-full">
                Register interest
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}