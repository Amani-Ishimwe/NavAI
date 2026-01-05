
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
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

const Navbar = () => {
  const { user, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Discover', path: '/fields', icon: Compass },
    { name: 'Directory', path: '/directory', icon: Search },
    { name: 'Pricing', path: '/pricing', icon: DollarSign },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F0E6]/80 backdrop-blur-md border-b border-[#F28C28]/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#F28C28] p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Compass className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-gray-900">nav<span className="text-[#F28C28]">AI</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-medium transition-colors hover:text-[#F28C28] ${location.pathname === link.path ? 'text-[#F28C28]' : 'text-gray-600'}`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
              <Link to="/dashboard" className="p-2 hover:bg-[#F28C28]/10 rounded-full text-gray-700 transition-colors">
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="p-2 hover:bg-[#F28C28]/10 rounded-full text-gray-700 transition-colors">
                  <Settings className="w-5 h-5" />
                </Link>
              )}
              <button onClick={logout} className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-[#F28C28] text-white px-6 py-2 rounded-full font-medium hover:bg-[#D97706] transition-all custom-shadow">
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F5F0E6] border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-6 px-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium text-gray-700"
                >
                  <link.icon className="w-5 h-5 text-[#F28C28]" />
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium text-gray-700"
                  >
                    <LayoutDashboard className="w-5 h-5 text-[#F28C28]" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="flex items-center gap-3 text-lg font-medium text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="bg-[#F28C28] text-white text-center py-3 rounded-xl font-bold"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

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
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/agent/:id" element={<AgentDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-100 py-12 px-4 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="bg-[#F28C28] p-2 rounded-xl">
                  <Compass className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900">nav<span className="text-[#F28C28]">AI</span></span>
              </Link>
              <p className="text-gray-500 max-w-sm">
                Navigating the professional AI landscape shouldn't be confusing. We provide clarity, trust, and discovery tools for modern careers.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Discovery</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><Link to="/fields" className="hover:text-[#F28C28]">Field Navigation</Link></li>
                <li><Link to="/directory" className="hover:text-[#F28C28]">AI Agents Grid</Link></li>
                <li><Link to="/pricing" className="hover:text-[#F28C28]">Tool Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Account</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><Link to="/dashboard" className="hover:text-[#F28C28]">My Dashboard</Link></li>
                <li><Link to="/login" className="hover:text-[#F28C28]">Login / Register</Link></li>
                <li><Link to="/admin" className="hover:text-[#F28C28]">Admin Access</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} navAI MVP System. For educational purposes only.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
