import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import HeroAdmin from './pages/admin/HeroAdmin';
import AboutAdmin from './pages/admin/AboutAdmin';
import SkillsAdmin from './pages/admin/SkillsAdmin';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import CertificationsAdmin from './pages/admin/CertificationsAdmin';
import ContactAdmin from './pages/admin/ContactAdmin';
import EducationAdmin from './pages/admin/EducationAdmin';
import ResearchAdmin from './pages/admin/ResearchAdmin';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<Home />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="hero" element={<HeroAdmin />} />
                <Route path="about" element={<AboutAdmin />} />
                <Route path="skills" element={<SkillsAdmin />} />
                <Route path="projects" element={<ProjectsAdmin />} />
                <Route path="certifications" element={<CertificationsAdmin />} />
                <Route path="education" element={<EducationAdmin />} />
                <Route path="research" element={<ResearchAdmin />} />
                <Route path="contact" element={<ContactAdmin />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
