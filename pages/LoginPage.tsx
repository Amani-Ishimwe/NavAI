
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldAlert, User as UserIcon } from 'lucide-react';
import { useStore } from '../store';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useStore(state => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@navai.com' && password === 'admin123') {
      login(email, 'admin');
      navigate('/admin');
    } else if (email === 'user@navai.com' && password === 'navai123') {
      login(email, 'user');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use mock credentials provided in help.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-12 rounded-[3rem] custom-shadow border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#F28C28] rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-orange-200">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Join the professional AI community.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#F5F0E6] rounded-2xl border-none outline-none text-sm font-medium focus:ring-2 focus:ring-[#F28C28]/20 transition-all"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#F5F0E6] rounded-2xl border-none outline-none text-sm font-medium focus:ring-2 focus:ring-[#F28C28]/20 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-500 rounded-xl text-xs font-bold flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button className="w-full py-4 bg-[#F28C28] text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-100">
            Sign In
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-50">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">Mock Credentials</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Standard User</div>
              <div className="text-[11px] font-mono text-gray-600">user@navai.com<br/>navai123</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">System Admin</div>
              <div className="text-[11px] font-mono text-gray-600">admin@navai.com<br/>admin123</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
