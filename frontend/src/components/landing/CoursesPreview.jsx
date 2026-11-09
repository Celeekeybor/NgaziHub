import Section from '../Section.jsx';
import { Link } from 'react-router-dom';
import { departments } from '../../data/courses.js';
import { useAdmin } from '../../admin/AdminStore.jsx';
const icons = {cmp:'▣', prg:'⌘',net:'⌁',hwt:'⚒',sec:'◇',web:'⌘'};
const colors = {cmp:'bg-blue-50',prg:'bg-emerald-50',net:'bg-orange-50',hwt:'bg-indigo-50',sec:'bg-sky-50',web:'bg-violet-50'};
export default function CoursesPreview() {
  const {data: {home}, courses} = useAdmin();
  return <Section tone="ice" labelledby="courses-title" className="py-12! lg:py-16!">
    <div className="rounded-2xl bg-navy px-6 py-8 text-white sm:px-9 sm:py-10"><span className="text-xs font-extrabold tracking-widest text-sun">EXPLORE YOUR POTENTIAL</span><h2 className="mt-3 text-3xl font-bold sm:text-4xl">{home.courseHeadline}</h2><p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-200">{home.courseIntro}</p><div className="mt-5 flex flex-wrap items-center gap-4"><Link to="/courses" className="rounded-lg bg-sun px-5 py-3 text-sm font-bold text-navy hover:bg-yellow-300">Explore courses ↗</Link><span className="text-sm text-slate-200">{courses.length} courses · 6 learning paths</span></div></div>
    <div className="mt-9 flex items-end justify-between gap-3"><div><h2 id="courses-title" className="text-2xl font-bold text-navy sm:text-3xl">Explore our learning paths</h2><p className="mt-1 text-sm text-slate-500">Choose the skills you want to master</p></div><Link to="/courses" className="shrink-0 text-sm font-bold text-brand hover:underline">View all →</Link></div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{departments.map(d=><Link key={d.id} to={`/courses?dept=${d.id}#catalog`} className="group flex min-h-42 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"><div className="flex items-center justify-between gap-2"><span className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold text-navy ${colors[d.id]}`}>{icons[d.id]}</span><span className="text-xs font-semibold text-brand">{d.id.toUpperCase()} · {d.courses.length} courses</span></div><h3 className="mt-4 text-base font-bold text-navy">{d.name}</h3><span className="mt-auto pt-5 text-sm font-bold text-brand group-hover:underline">Explore path ↗</span></Link>)}</div>
  </Section>;
}
