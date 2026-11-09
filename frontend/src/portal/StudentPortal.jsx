import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../admin/AdminStore.jsx';
import {policyFor,isConfiguredPaid,money} from '../lib/paymentPolicy.js';
import { asset } from '../lib/assets.js';
import './portal.css';

const STORAGE_KEY = 'ngazihub-portal-demo-v1';
const lessons = [
  { title: 'Welcome & course overview', type: 'Introduction', description: 'Understand the course objectives and how learning on NgaziHub works.' },
  { title: 'Essential concepts', type: 'Lesson', description: 'A sample lesson outline. The administrator will upload the actual lesson content.' },
  { title: 'Practical exercise', type: 'Practice', description: 'Practice activity placeholder. Exercises and downloadable materials will be added later.' },
  { title: 'Knowledge check', type: 'Assessment', description: 'Assessment placeholder. Quizzes and grading require the learning backend.' },
];
const starterCourses = [];
function loadDemo() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (parsed && Array.isArray(parsed.enrolled) && typeof parsed.progress === 'object') return parsed;
  } catch { /* invalid browser state: use sample */ }
  return { enrolled: starterCourses, progress: {}, name: 'Student', selections:{} };
}
const findCourse = (catalog,code) => catalog.find((course) => course.code === code);
const selectedPlan=(state,code)=>state.selections?.[code];
const hasAccess=(state,course)=>{const p=policyFor(course);return p.type==='free'||selectedPlan(state,course.code)?.status==='active';};
const pct = (done) => Math.round((done?.length || 0) / lessons.length * 100);
function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const shapes = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    book: <><path d="M12 7c-2-2-5-2-9-2v14c4 0 7 0 9 2 2-2 5-2 9-2V5c-4 0-7 0-9 2Z"/><path d="M12 7v14"/></>,
    award: <><circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-3 4.5 3-1-9"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4 4-2Z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 3-7 8-7s8 2 8 7"/></>,
    logout: <><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/><path d="m15 8 4 4-4 4M9 12h10"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    play: <path d="m9 6 9 6-9 6V6Z"/>,
    check: <path d="m5 12 5 5L20 7"/>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  };
  return <svg {...common}>{shapes[name] || shapes.book}</svg>;
}
function Bar({ value }) { return <div className="portal-bar" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${value}%` }}/></div>; }
function CourseCard({ course, done, action, onClick, locked=false }) {
  const progress = pct(done);
  return <article className="portal-course-card">
    <div className={`portal-course-art art-${course.dept}`}><span>{course.deptName}</span><Icon name="book" size={34}/></div>
    <div className="portal-course-inner"><div className="portal-kicker">{course.code} · {course.mode}</div><h3>{course.title}</h3>
      {locked&&<div className="portal-lock-banner">🔒 Pending payment — course content locked</div>}{done !== null && !locked && <><div className="portal-progress-label"><span>{progress === 100 ? 'Completed' : 'In progress'}</span><strong>{progress}%</strong></div><Bar value={progress}/></>}
      {onClick ? <button className="portal-primary" onClick={onClick}>{action} <Icon name="chevron" size={16}/></button> : <Link className="portal-primary" to={`/student/${locked?'checkout':'learn'}/${encodeURIComponent(course.code)}`}>{action || 'Continue learning'} <Icon name="chevron" size={16}/></Link>}
    </div>
  </article>;
}
function Dashboard({ state, catalog }) {
  const courses = state.enrolled.map(code=>findCourse(catalog,code)).filter(Boolean);
  const completed = courses.filter((c) => pct(state.progress[c.code]) === 100).length;
  const avg = courses.length ? Math.round(courses.reduce((a,c) => a + pct(state.progress[c.code]),0) / courses.length) : 0;
  return <><div className="portal-heading"><div><div className="portal-eyebrow">MY LEARNING SPACE</div><h1>Welcome back, {state.name || 'Student'} <span aria-hidden="true">👋</span></h1><p>Pick up where you left off and keep building your skills.</p></div><Link className="portal-outline" to="/student/explore">Explore courses <Icon name="chevron" size={17}/></Link></div>
    <div className="portal-stats"><div><span>Enrolled courses</span><strong>{courses.length}</strong><small>Your learning library</small></div><div><span>Completed courses</span><strong>{completed}</strong><small>Keep up the momentum</small></div><div><span>Average progress</span><strong>{avg}%</strong><small>Across enrolled courses</small></div></div>
    <div className="portal-section-heading"><div><h2>Continue learning</h2><p>Jump back into your courses.</p></div><Link to="/student/courses">View all courses →</Link></div>
    {courses.length ? <div className="portal-card-grid">{courses.slice(0,3).map((c) => <CourseCard key={c.code} course={c} done={state.progress[c.code] || []} action={hasAccess(state,c)?'Continue learning':'View payment options'} locked={!hasAccess(state,c)}/>)}</div> : <div className="portal-empty">You haven’t enrolled in a course yet. <Link to="/student/explore">Find a course</Link></div>}
    <div className="portal-notice"><strong>Student portal preview</strong><p>This is a working UI prototype using local browser demo data. Real accounts, payments, graded assessments, content delivery and certificates will be connected to the backend in the next phase.</p></div>
  </>;
}
function MyCourses({ state, catalog }) {
  const courses = state.enrolled.map(code=>findCourse(catalog,code)).filter(Boolean);
  return <><div className="portal-heading"><div><div className="portal-eyebrow">LEARNING LIBRARY</div><h1>My courses</h1><p>Your enrolled courses and learning progress.</p></div></div>{courses.length ? <div className="portal-card-grid">{courses.map(c => <CourseCard key={c.code} course={c} done={state.progress[c.code] || []} action={hasAccess(state,c)?'Open course':'View payment options'} locked={!hasAccess(state,c)} />)}</div> : <div className="portal-empty">No enrolled courses yet. <Link to="/student/explore">Browse the catalog</Link></div>}</>;
}
function Explore({ state, enroll, catalog }) {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('all');
  const filtered = useMemo(() => catalog.filter(c => (dept === 'all' || c.dept === dept) && `${c.title} ${c.code}`.toLowerCase().includes(query.toLowerCase())), [query,dept,catalog]);
  const depts = [...new Map(catalog.map(c => [c.dept,c.deptName])).entries()];
  return <><div className="portal-heading"><div><div className="portal-eyebrow">COURSE CATALOG</div><h1>Explore courses</h1><p>Find something new to learn from NgaziHub's planned catalog.</p></div></div>
    <div className="portal-filters"><input aria-label="Search courses" placeholder="Search by course name or code..." value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Filter department" value={dept} onChange={e=>setDept(e.target.value)}><option value="all">All departments</option>{depts.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></div>
    <p className="portal-result-count">{filtered.length} course{filtered.length===1?'':'s'} found</p>
    <div className="portal-card-grid">{filtered.map(c => <CourseCard key={c.code} course={c} done={null} action={state.enrolled.includes(c.code) ? (hasAccess(state,c)?'Open course':'Payment options') : 'Select course'} onClick={() => enroll(c.code)}/>)}</div>
    {!filtered.length && <div className="portal-empty">No matching courses. Try a different search.</div>}
  </>;
}
function Learn({ state, finish, catalog }) {
  const { code } = useParams(); const course = findCourse(catalog,decodeURIComponent(code || ''));
  const [current, setCurrent] = useState(0);
  if (!course || !state.enrolled.includes(course.code)) return <Navigate to="/student/courses" replace/>;
  if (!hasAccess(state,course)) return <Navigate to={`/student/checkout/${encodeURIComponent(course.code)}`} replace/>;
  const completed = state.progress[course.code] || [];
  const lesson = lessons[current];
  return <><div className="portal-breadcrumb"><Link to="/student/courses">My courses</Link> <Icon name="chevron" size={15}/> {course.code}</div>
    <div className="portal-heading"><div><div className="portal-eyebrow">{course.deptName}</div><h1>{course.title}</h1><p>{course.code} · {course.mode}</p></div></div>
    <div className="portal-learning-grid"><section className="portal-learning-main"><div className="portal-video"><Icon name="play" size={50}/><strong>Lesson content coming soon</strong><span>Course videos and files will be added through the admin dashboard.</span></div><div className="portal-lesson-detail"><span className="portal-kicker">LESSON {current+1} OF {lessons.length} · {lesson.type}</span><h2>{lesson.title}</h2><p>{lesson.description}</p><div className="portal-lesson-actions"><button disabled={current===0} onClick={()=>setCurrent(n=>Math.max(0,n-1))} className="portal-outline">Previous</button><button onClick={()=>{finish(course.code,current); if(current<lessons.length-1) setCurrent(n=>n+1);}} className="portal-primary">{completed.includes(current) ? 'Completed — continue' : 'Mark complete & continue'} <Icon name="check" size={16}/></button></div></div></section>
      <aside className="portal-outline-panel"><h2>Course content</h2><div className="portal-progress-label"><span>Your progress</span><strong>{pct(completed)}%</strong></div><Bar value={pct(completed)}/><div className="portal-lesson-list">{lessons.map((l,i)=><button key={i} className={`portal-lesson-item ${current===i?'active':''}`} onClick={()=>setCurrent(i)}><span className={`portal-lesson-number ${completed.includes(i)?'done':''}`}>{completed.includes(i)?<Icon name="check" size={13}/>:i+1}</span><span><strong>{l.title}</strong><small>{l.type}</small></span></button>)}</div></aside></div>
    <div className="portal-notice"><strong>Prototype course outline</strong><p>These four lesson titles are demo placeholders, not official NgaziHub course curriculum. Completion here is simulated and saved only in this browser.</p></div>
  </>;
}
function Checkout({state,select,catalog}) {
 const {code}=useParams();const course=findCourse(catalog,decodeURIComponent(code||''));const [method,setMethod]=useState('full');
 if(!course)return <Navigate to="/student/explore" replace/>;
 const p=policyFor(course); const record=selectedPlan(state,course.code);const configured=isConfiguredPaid(p);
 const deposit=Math.round(Number(p.fee)*Number(p.depositPercent)/100);
 return <><div className="portal-breadcrumb"><Link to="/student/courses">My courses</Link> › Payment options</div><div className="portal-heading"><div><div className="portal-eyebrow">COURSE ENROLLMENT</div><h1>{course.title}</h1><p>{course.code} · {course.deptName}</p></div></div>
 <div className="portal-payment-panel"><h2>{p.type==='free'?'Free course':configured?money(p.fee,p.currency):'Fee not yet published'}</h2>
 {record&&<p className="portal-lock-banner">Current selection: {record.method==='installments'?'Installment plan':'Full payment'} · {record.status==='active'?'Active':'Awaiting verified payment'}</p>}
 {p.type==='free'?<><p>No payment is required for this course.</p><button className="portal-primary" onClick={()=>select(course.code,'free')}>Start free course</button></>:
 !configured?<p>The academy has not published a fee for this course. Contact NgaziHub for enrollment information; lessons remain locked.</p>:
 <><p>Choose a plan below. This is a **payment-flow preview only**; no money is collected or verified here.</p>
 {p.methods.includes('full')&&<label className="portal-plan-option"><input type="radio" checked={method==='full'||!p.methods.includes('installments')} onChange={()=>setMethod('full')}/><span><strong>Pay in full</strong><small>{money(p.fee,p.currency)} due before access</small></span></label>}
 {p.methods.includes('installments')&&<label className="portal-plan-option"><input type="radio" checked={method==='installments'||!p.methods.includes('full')} onChange={()=>setMethod('installments')}/><span><strong>Pay in installments</strong><small>{money(deposit,p.currency)} initial deposit ({p.depositPercent}%), remaining {money(Number(p.fee)-deposit,p.currency)} across your approved schedule. {p.accessAfterDeposit?'Access can start after the deposit is verified.':'Access starts after full settlement.'}</small></span></label>}
 <button className="portal-primary" onClick={()=>select(course.code,p.methods.includes(method)?method:p.methods[0])}>Save plan — awaiting payment verification</button>
 <p className="portal-demo-note">Live M-Pesa/card checkout, due dates, payment verification and receipts require the secure backend. Clicking here does not count as payment and does not unlock lessons.</p></>}
 </div></>;
}
function Certificates() { return <><div className="portal-heading"><div><div className="portal-eyebrow">MY ACHIEVEMENTS</div><h1>Certificates</h1><p>Your verified course certificates will appear here.</p></div></div><div className="portal-empty"><Icon name="award" size={38}/><h2>Certificate issuing is coming soon</h2><p>Official certificates require instructor-approved completion criteria and backend verification.</p></div></>; }
function Profile({state, rename}) { const [name,setName] = useState(state.name || ''); return <><div className="portal-heading"><div><div className="portal-eyebrow">ACCOUNT</div><h1>My profile</h1><p>Manage your display name for this browser demo.</p></div></div><form className="portal-profile" onSubmit={e=>{e.preventDefault();rename(name.trim() || 'Student');}}><label htmlFor="portal-name">Display name</label><input id="portal-name" value={name} maxLength={60} onChange={e=>setName(e.target.value)}/><button type="submit" className="portal-primary">Save display name</button><small>This is not an authenticated account. Real profile settings will be available after backend integration.</small></form></>; }
export default function StudentPortal() {
  const {courses}=useAdmin();
  const [state,setState] = useState(loadDemo);
  const [mobileOpen,setMobileOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));},[state]);
  function enroll(code) { const course=findCourse(courses,code);if(!course)return;setState(prev=>({...prev,enrolled:[...new Set([...prev.enrolled,code])],progress:{...prev.progress,[code]:prev.progress?.[code]||[]}}));navigate(`/student/${hasAccess(state,course)?'learn':'checkout'}/${encodeURIComponent(code)}`); }
  function select(code,method){const course=findCourse(courses,code);if(!course)return;const isFree=policyFor(course).type==='free';setState(prev=>({...prev,enrolled:[...new Set([...prev.enrolled,code])],selections:{...prev.selections,[code]:{method,status:isFree?'active':'pending_payment',createdAt:new Date().toISOString()}}}));if(isFree)navigate(`/student/learn/${encodeURIComponent(code)}`);}
  function finish(code,index) { setState(prev=>({...prev,progress:{...prev.progress,[code]:[...new Set([...(prev.progress[code]||[]),index])]}})); }
  const links = [{to:'/student',label:'Dashboard',icon:'grid',end:true},{to:'/student/courses',label:'My courses',icon:'book'},{to:'/student/explore',label:'Explore courses',icon:'compass'},{to:'/student/certificates',label:'Certificates',icon:'award'},{to:'/student/profile',label:'My profile',icon:'user'}];
  return <div className="portal-shell"><aside className={`portal-sidebar ${mobileOpen?'is-open':''}`}><Link className="portal-logo" to="/" aria-label="NgaziHub home"><img src={asset('ngazihub-logo')} alt="NgaziHub"/></Link><div className="portal-sidebar-caption">STUDENT WORKSPACE</div><nav aria-label="Student portal navigation">{links.map(l=><NavLink key={l.to} end={l.end} to={l.to} onClick={()=>setMobileOpen(false)} className={({isActive})=>`portal-nav-link ${isActive?'active':''}`}><Icon name={l.icon}/>{l.label}</NavLink>)}</nav><div className="portal-sidebar-bottom"><Link to="/courses" className="portal-nav-link"><Icon name="logout"/> Public website</Link><span>NgaziHub learning portal · Preview</span></div></aside>
    {mobileOpen && <button className="portal-backdrop" aria-label="Close navigation" onClick={()=>setMobileOpen(false)}/>}
    <div className="portal-body"><header className="portal-topbar"><div className="portal-topbar-left"><button className="portal-menu" aria-label="Open navigation" onClick={()=>setMobileOpen(true)}><Icon name="menu"/></button><span>Student portal</span><span className="portal-demo-tag">DEMO</span></div><Link to="/student/profile" className="portal-avatar" aria-label="My profile">{(state.name||'S').slice(0,1).toUpperCase()}</Link></header><main className="portal-content"><Routes><Route index element={<Dashboard state={state} catalog={courses}/>}/><Route path="courses" element={<MyCourses state={state} catalog={courses}/>}/><Route path="explore" element={<Explore state={state} enroll={enroll} catalog={courses}/>}/><Route path="learn/:code" element={<Learn state={state} finish={finish} catalog={courses}/>}/><Route path="checkout/:code" element={<Checkout state={state} select={select} catalog={courses}/>}/><Route path="certificates" element={<Certificates/>}/><Route path="profile" element={<Profile state={state} rename={name=>setState(prev=>({...prev,name}))}/>}/><Route path="*" element={<Navigate to="/student" replace/>}/></Routes></main></div>
  </div>;
}
