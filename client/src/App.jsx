import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectForm from './pages/ProjectForm';
import RegisterPage from './pages/RegisterPage';
import AdminMessages from './pages/AdminMessages';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogForm from './pages/BlogForm';
import AdminUsers from './pages/AdminUsers'; // <--- Importar
import AdminUserEdit from './pages/AdminUserEdit';
import BlogDetailsPage from './pages/BlogDetailsPage';
import NotFound from './pages/NotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/new" element={<ProjectForm />} />
        <Route path="/admin/edit/:id" element={<ProjectForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="/blog" element={<BlogPage />} />
<Route path="/blog/:id" element={<BlogDetailsPage />} />
<Route path="/admin/blog/new" element={<BlogForm />} />
<Route path="/admin/blog/edit/:id" element={<BlogForm />} />
<Route path="/admin/users" element={<AdminUsers />} />
    <Route path="/admin/user/:id/edit" element={<AdminUserEdit />} />
    <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;