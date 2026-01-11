import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Contexto y Seguridad
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';

// 2. Componentes Globales
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner';
// 3. Páginas Públicas

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFound from './pages/NotFound';

// 4. Páginas de Admin (SOLO EL DASHBOARD)
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <AuthProvider>
        
        <Navbar />
        <AiAssistant />
        
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
          
          <Route path="/about" element={<AboutPage />} />
          
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/terminos" element={<TermsPage />} />

          {/* --- RUTAS DE ADMIN --- */}
          {/* Solo necesitamos UNA ruta, el Dashboard maneja lo demás */}
          <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <CookieBanner />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;