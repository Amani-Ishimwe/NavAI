
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Search, User as UserIcon, LayoutDashboard,
  LogOut, Compass, Info, DollarSign, Settings
} from 'lucide-react';
import { useStore } from './store';

// Pages
import LandingPage from './pages/LandingPage';
import FieldsPage from './pages/FieldsPage';
import DirectoryPage from './pages/DirectoryPage';
import AgentDetailPage from './pages/AgentDetailPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import CheckoutPage from './pages/CheckoutPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';


const Navbar = () => {
  const { user, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Explore Skills', path: '/fields', icon: Compass },
    { name: 'Assistant Library', path: '/library', icon: Search },
    { name: 'Membership', path: '/membership', icon: DollarSign },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100/30 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gray-900 p-2 rounded-xl group-hover:bg-[#F28C28] transition-all duration-500">
            <Compass className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tighter">stream</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 bg-gray-50/30 px-4 py-2 rounded-xl border border-gray-100/50">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.1em] transition-all hover:text-[#F28C28] ${location.pathname === link.path ? 'text-[#F28C28]' : 'text-gray-400'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/workspace" className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${location.pathname === '/workspace' ? 'bg-[#F28C28] text-white shadow-lg shadow-orange-100' : 'bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200'}`}>
                <LayoutDashboard className="w-4 h-4" />
              </Link>
              <Link to="/settings" className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${location.pathname === '/settings' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100 text-gray-400 hover:text-gray-900'}`}>
                <Settings className="w-4 h-4" />
              </Link>
              {user.role === 'admin' && (
                <Link to="/controls" title="Operations Hub" className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              )}
              <button title="Log Out" onClick={logout} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors">Sign In</Link>
              <Link to="/signup" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-[#F28C28] transition-all shadow-xl shadow-gray-200">
                Join Today
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-1.5 bg-gray-50 rounded-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden z-[100]"
          >
            <div className="flex flex-col gap-3 py-6 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#F28C28]"
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-50">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/workspace"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-widest"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Workspace
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-widest"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex items-center gap-3 text-xs font-black text-red-500 uppercase tracking-widest"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-900 text-white text-center py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg"
                  >
                    Get Registered
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Internal missing icons
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-[#F28C28]/30 selection:text-[#D97706]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/fields" element={<FieldsPage />} />
            <Route path="/library" element={<DirectoryPage />} />
            <Route path="/assistant/:id" element={<AgentDetailPage />} />
            <Route path="/workspace" element={<DashboardPage />} />
            <Route path="/membership" element={<PricingPage />} />
            <Route path="/checkout/:planId" element={<CheckoutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/controls" element={<AdminPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 py-12 px-6 mt-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="bg-gray-900 p-2 rounded-xl">
                  <Compass className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tighter">stream</span>
              </Link>
              <p className="text-gray-400 max-w-sm font-medium leading-relaxed text-sm">
                Empowering professionals to navigate the AI revolution. We simplify complex technology into friendly assistants that accelerate your career.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <li><Link to="/fields" className="hover:text-[#F28C28] transition-colors">Explore Skills</Link></li>
                <li><Link to="/library" className="hover:text-[#F28C28] transition-colors">Assistant Library</Link></li>
                <li><Link to="/membership" className="hover:text-[#F28C28] transition-colors">Membership</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4">Your Profile</h4>
              <ul className="space-y-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <li><Link to="/workspace" className="hover:text-[#F28C28] transition-colors">My Workspace</Link></li>
                <li><Link to="/login" className="hover:text-[#F28C28] transition-colors">Sign In</Link></li>
                <li><Link to="/settings" className="hover:text-[#F28C28] transition-colors">Account Settings</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-50 text-center text-gray-300 text-[9px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} stream. Redefining the professional future.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
