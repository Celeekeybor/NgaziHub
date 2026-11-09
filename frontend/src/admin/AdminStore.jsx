import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { contact as initialContact } from '../data/site.js';
import { allCourses } from '../data/courses.js';

const KEY = 'ngazihub_admin_demo_v1';
export const defaults = {
  contact: {...initialContact, location: 'Kisii, Kenya', hours: 'Monday – Saturday, 8 AM – 5 PM'},
  home: {
    headline: 'Your first step into technology starts here.',
    intro: 'NgaziHub is a computer and IT academy and technology community for young people in Kenya. Learn something practical, build with others and meet people who can point you forward.',
    localNote: 'We are starting with young people in Kisii, Keroka and Iten.',
    courseHeadline: 'Your future in technology starts here.',
    courseIntro: 'From computer basics to coding, cybersecurity, and web development. Discover practical skills for every stage of your journey.',
  },
  footer: {description: 'A computer and IT academy and technology community for Kenya. Starting in Kisii, Keroka and Iten.', notice: 'Certificates are NgaziHub certificates of completion, not accredited qualifications.'},
  programs: { kids: 'Practical technology learning for curious young minds.', corporate: 'Build your team’s technology skills with tailored training.' },
  courses: [], // An empty list means original catalog, otherwise records with per-course overrides
  inquiries: [],
  students: [],
  enrollments: [],
  activities: [],
};
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {...defaults, ...raw, contact: {...defaults.contact, ...(raw.contact || {})}, home: {...defaults.home, ...(raw.home || {})}, footer: {...defaults.footer, ...(raw.footer || {})}, programs: {...defaults.programs, ...(raw.programs || {})}};
  } catch { return defaults; }
}
const AdminContext = createContext(null);
export function AdminProvider({children}) {
  const [data, setData] = useState(load);
  useEffect(()=>{try {localStorage.setItem(KEY, JSON.stringify(data));} catch { /* storage unavailable */ }},[data]);
  const update = (section, value) => setData(prev=>({...prev,[section]:typeof value==='function'?value(prev[section]):value}));
  const patch = (section, changes) => setData(prev=>({...prev,[section]: {...prev[section],...changes}}));
  const addInquiry = (record) => setData(prev=>({...prev,inquiries:[{id: crypto.randomUUID?.() || String(Date.now()),status:'New',createdAt:new Date().toISOString(),...record},...prev.inquiries]}));
  const courses = useMemo(()=>{
    const overrides = new Map(data.courses.map(c=>[c.code,c]));
    const merged = allCourses.map(c=>({...c,...overrides.get(c.code)}));
    for (const c of data.courses) if(!allCourses.some(x=>x.code===c.code)) merged.push(c);
    return merged.filter(c=>!['Archived','Draft'].includes(c.status));
  },[data.courses]);
  return <AdminContext.Provider value={{data,update,patch,addInquiry,courses}}>{children}</AdminContext.Provider>;
}
export const useAdmin = () => useContext(AdminContext);
