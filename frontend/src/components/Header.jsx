import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { asset } from '../lib/assets.js';
import { nav } from '../data/site.js';
import { useAdmin } from '../admin/AdminStore.jsx';

function MenuIcon({ open }) { return <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" aria-hidden="true">{open ? <><path d="M5 5l14 14"/><path d="M19 5L5 19"/></> : <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>}</svg>; }
function SearchIcon() { return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>; }
function PortalAccess({ close }) { return <div className="space-y-1"><Link to="/login" onClick={close} className="block rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-slate-100">Student log in</Link><Link to="/register" onClick={close} className="block rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-slate-100">Create student account</Link><Link to="/student" onClick={close} className="block rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-slate-100">Go to dashboard (demo)</Link></div>; }
export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const {data: {contact}} = useAdmin();
  const logo = asset('ngazihub-logo');
  const link = ({ isActive }) => `text-sm font-semibold whitespace-nowrap transition-colors hover:text-brand ${isActive ? 'text-brand' : 'text-navy'}`;
  function search(e) { e.preventDefault(); navigate(`/courses?q=${encodeURIComponent(query.trim())}#catalog`); setSearchOpen(false); setOpen(false); }
  const close = () => { setOpen(false); setPortalOpen(false); };
  return <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
      <Link to="/" aria-label="NgaziHub home" className="shrink-0" onClick={close}>{logo ? <img src={logo} alt="NgaziHub" className="h-10 w-auto max-w-36 object-contain" /> : <span className="font-display text-xl font-bold text-navy">NgaziHub</span>}</Link>
      <nav aria-label="Main" className="hidden items-center gap-4 lg:gap-6 lg:flex">{nav.map(n => <NavLink key={n.to} to={n.to} end={n.to==='/'} className={link}>{n.label}</NavLink>)}</nav>
      <div className="hidden items-center gap-2 lg:flex">
        <button type="button" aria-label="Search courses" title="Search courses" onClick={()=>{setSearchOpen(v=>!v);setPortalOpen(false)}} className="rounded-lg p-2 text-navy hover:bg-slate-100"><SearchIcon/></button>
        <div className="relative"><button type="button" aria-expanded={portalOpen} aria-controls="desktop-student-menu" onClick={()=>{setPortalOpen(v=>!v);setSearchOpen(false)}} className="rounded-lg px-3 py-2 text-sm font-semibold text-navy hover:bg-slate-100">Student Portal <span aria-hidden="true">⌄</span></button>{portalOpen && <div id="desktop-student-menu" className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><PortalAccess close={close}/></div>}</div>
        <Link to="/#join" className="rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white hover:bg-brand" onClick={close}>Register Interest</Link>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
        <button type="button" aria-label={searchOpen ? 'Close course search' : 'Search courses'} aria-expanded={searchOpen} aria-controls="nav-search-form" title="Search courses" onClick={()=>{setSearchOpen(v=>!v);setOpen(false)}} className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy hover:bg-slate-100"><SearchIcon/></button>
        <button type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} title={open ? 'Close menu' : 'Open menu'} className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy hover:bg-slate-100" aria-expanded={open} aria-controls="mobile-nav" onClick={()=>{setOpen(v=>!v);setSearchOpen(false)}}><MenuIcon open={open}/></button>
      </div>
    </div>
    {searchOpen && <form id="nav-search-form" role="search" onSubmit={search} className="mx-auto flex max-w-7xl gap-2 border-t border-slate-100 px-4 py-3 lg:px-6"><label className="sr-only" htmlFor="nav-course-search">Search courses</label><input id="nav-course-search" autoFocus className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-navy" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses, e.g. Python, networking..."/><button className="rounded-lg bg-brand px-5 py-2 font-semibold text-white" type="submit">Search</button></form>}
    {open && <nav id="mobile-nav" aria-label="Mobile main" className="space-y-3 border-t border-slate-200 bg-white px-5 py-4 lg:hidden">{nav.map(n=><NavLink key={n.to} to={n.to} onClick={close} className="block py-1 text-sm font-semibold text-navy">{n.label}</NavLink>)}<div className="border-t border-slate-200 pt-3"><button type="button" aria-expanded={portalOpen} aria-controls="mobile-student-menu" onClick={()=>setPortalOpen(v=>!v)} className="flex w-full items-center justify-between py-1 text-sm font-semibold text-navy">Student Portal <span aria-hidden="true">{portalOpen?'−':'+'}</span></button>{portalOpen && <div id="mobile-student-menu" className="mt-2 rounded-lg bg-slate-50 p-2"><PortalAccess close={close}/></div>}</div><Link to="/#join" onClick={close} className="block rounded-lg bg-navy px-4 py-3 text-center text-sm font-bold text-white">Register Interest</Link></nav>}
    {(contact.email || contact.phone) && <div aria-label="NgaziHub contact information (demo)" className="border-t border-slate-100 bg-slate-50"><div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 text-[10px] font-medium text-slate-600 min-[375px]:px-4 min-[375px]:text-xs lg:justify-end lg:gap-6 lg:px-6 lg:py-1.5">{contact.email && <a href={`mailto:${contact.email}`} className="flex min-w-0 items-center gap-1 whitespace-nowrap hover:text-brand"><span aria-hidden="true">✉</span><span>{contact.email}</span></a>}{contact.phone && <a href={`tel:${contact.phone}`} className="flex shrink-0 items-center gap-1 whitespace-nowrap hover:text-brand"><span aria-hidden="true">☎</span><span>{contact.phone}</span></a>}</div></div>}
  </header>;
}
