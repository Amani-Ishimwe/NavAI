
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Mail, Lock, ArrowRight, ShieldCheck, Sparkles, User, UserPlus } from 'lucide-react';
import { useStore } from '../store';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useStore(state => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@navai.com') {
      login(email, 'admin', 'navigator');
    } else {
      login(email, 'user', 'explorer');
    }
    navigate('/workspace');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-12 rounded-[4rem] border border-gray-100 custom-shadow shadow-sm text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F28C28]/5 rounded-full blur-2xl" />
          <div className="mb-10 inline-flex flex-col items-center">
            <div className="bg-gray-900 p-4 rounded-2xl mb-4 shadow-xl">
              <Compass className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none mb-2">Resync Identity</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">Platform Access Node</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Protocol Identifier</label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="professional@email.com"
                  className="w-full bg-gray-50 border-none rounded-xl py-5 px-12 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10 transition-all placeholder:text-gray-300"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Passnode</label>
              <div className="relative">
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-gray-50 border-none rounded-xl py-5 px-12 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10 transition-all placeholder:text-gray-300"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#F28C28] transition-all shadow-xl shadow-gray-200 group">
              Verify & Enter <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col gap-2">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              No active session? <Link to="/signup" className="text-[#F28C28] hover:underline">Register New Node</Link>
            </div>
            <div className="text-[9px] text-gray-300 font-bold uppercase tracking-widest leading-relaxed">
              Tip: Use admin@navai.com for operations hub access.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
