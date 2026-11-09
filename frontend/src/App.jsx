import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import KidsPage from './pages/KidsPage.jsx';
import CorporatePage from './pages/CorporatePage.jsx';
import StudentPortal from './portal/StudentPortal.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold text-navy">Page not found</h1>
      <p className="mt-4 text-lg">The page you asked for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-brand underline underline-offset-4">Go to the home page</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/student/*" element={<StudentPortal />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:code" element={<CourseDetailPage />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/corporate" element={<CorporatePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}