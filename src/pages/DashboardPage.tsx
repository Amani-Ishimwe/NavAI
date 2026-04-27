
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bookmark, Zap, TrendingUp,
  Trash2, ExternalLink, Filter, Package, AlertCircle, Sparkles,
  Award, Clock, MoreVertical, Plus, ChevronRight, Settings, ArrowRight,
  Target, BarChart3, Globe, ShieldCheck, DollarSign, Calculator, Lock
} from 'lucide-react';
import { useStore } from '../store';
import { ToolStatus } from '../types';
import { Link, Navigate } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';

const DashboardPage = () => {
  const { user, savedTools, removeTool, updateToolStatus, agents } = useStore();
  const [showROI, setShowROI] = useState(false);

  if (!user) return <Navigate to="/login" />;

  const myAssistants = savedTools.map(st => {
    const agent = agents.find(a => a.id === st.agentId);
    return { ...agent, ...st };
  });

  const freeAssistants = myAssistants.filter(a => a.pricing === 'Free').length;
  const premiumAssistants = myAssistants.filter(a => a.pricing === 'Paid' || a.pricing === 'Freemium').length;

  const careerReadiness = useMemo(() => {
    const base = 40;
    const toolsWeight = myAssistants.length * 5;
    const statusWeight = myAssistants.filter(a => a.status === 'Strategic Priority').length * 10;
    return Math.min(98, base + toolsWeight + statusWeight);
  }, [myAssistants]);

  const estimatedSavings = useMemo(() => {
    return myAssistants.length * 120;
  }, [myAssistants]);

  const isPioneer = user.membership === 'pioneer' || user.membership === 'navigator';

  return (
    <div className="max-w-7xl mx-auto py-12 md:py-16 px-6 font-sans">
      {/* Dynamic Welcome Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-green-100">
            <ShieldCheck className="w-3 h-3" /> Workspace Verified
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-2 leading-none">
            Hello, <span className="text-[#F28C28]">{user.email.split('@')[0]}</span>
          </h1>
          <p className="text-gray-400 font-medium text-base max-w-lg leading-relaxed">
            Welcome to your <span className="text-gray-900 font-black uppercase text-xs tracking-widest">{user.membership}</span> Workspace.
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <Link to="/library" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center gap-2 shadow-xl hover:bg-[#F28C28] transition-all duration-500">
            <Plus className="w-4 h-4" /> Discover New Help
          </Link>
          <Link to="/settings" className="bg-white border border-gray-100 p-4 rounded-2xl text-gray-400 hover:text-gray-900 transition-all custom-shadow shadow-sm group">
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* Visual Insight Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Progress Graph Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-white p-8 rounded-[3rem] border border-gray-100 custom-shadow shadow-sm relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight mb-1 leading-none">Growth Journey</h3>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Assistant usage vs Career progress</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#F28C28] rounded-full" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Applied Intelligence</span>
            </div>
          </div>

          <div className="h-32 flex items-end gap-2 px-2 relative">
            {Array.from({ length: 12 }).map((_, i) => {
              const height = 40 + (i * 5) + (myAssistants.length * 2);
              return (
                <div key={i} className="flex-grow group relative cursor-pointer">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, height)}%` }}
                    transition={{ delay: i * 0.05, duration: 1 }}
                    className={`rounded-t-lg group-hover:bg-[#F28C28] transition-all duration-300 ${i === 11 ? 'bg-[#F28C28]' : 'bg-[#F28C28]/20'}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between border-t border-gray-50 pt-6">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-2xl font-black text-gray-900 leading-none">{myAssistants.length}</div>
                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active Assistants</div>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div>
                <div className="text-2xl font-black text-gray-900 leading-none">{careerReadiness}%</div>
                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Readiness Factor</div>
              </div>
            </div>
            <button className="text-[9px] font-black text-[#F28C28] uppercase tracking-widest flex items-center gap-2 hover:underline">
              Evolution Logs <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Quick Snapshot Cards */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl shadow-gray-200 group overflow-hidden relative"
          >
            <Zap className="w-10 h-10 text-[#F28C28] mb-4" />
            <div>
              <div className="text-3xl font-black text-white mb-0.5 leading-none">{premiumAssistants}</div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Elite Solutions</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#F28C28] p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl shadow-orange-100 overflow-hidden relative"
          >
            <Award className="w-10 h-10 mb-4" />
            <div>
              <div className="text-3xl font-black text-white mb-0.5 leading-none">{careerReadiness > 80 ? 'Elite' : 'Explorer'}</div>
              <div className="text-[9px] font-black text-orange-100/60 uppercase tracking-widest">Global Discovery Tier</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ROI Calculator Section (Pioneer Feature) */}
      <div className="mb-12">
        <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-gray-100 custom-shadow shadow-sm relative overflow-hidden">
          {!isPioneer && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8">
              <Lock className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">Unlock ROI Analytics</h3>
              <Link to="/membership" className="bg-[#F28C28] text-white px-8 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg hover:bg-gray-900 transition-all">Go Pioneer Elite</Link>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 leading-none">Efficiency Yield</h3>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Estimating your performance gains.</p>
              </div>
            </div>
            <div className="bg-gray-900 text-white p-6 rounded-[2rem] text-right min-w-[200px]">
              <div className="text-[9px] font-black text-[#F28C28] uppercase tracking-widest mb-1">Monthly Value</div>
              <div className="text-3xl font-black leading-none">${estimatedSavings}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-[2rem]">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> Time Optimization
              </div>
              <div className="text-2xl font-black text-gray-900 leading-none">{myAssistants.length * 4}h <span className="text-[10px] text-green-500">/ week</span></div>
            </div>
            <div className="p-6 bg-gray-50 rounded-[2rem]">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> Global Benchmarking
              </div>
              <div className="text-2xl font-black text-gray-900 leading-none">Top 12%</div>
            </div>
            <div className="p-6 bg-gray-50 rounded-[2rem]">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Output Quality
              </div>
              <div className="text-2xl font-black text-gray-900 leading-none">+24%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tools Section */}
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 leading-none">
              <div className="w-1.5 h-8 bg-[#F28C28] rounded-full" />
              Your Essential Help
            </h3>
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{myAssistants.length} Active</span>
          </div>

          <div className="space-y-4">
            {myAssistants.length > 0 ? myAssistants.map((assistant, idx) => (
              <motion.div
                key={assistant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-[2.5rem] border border-gray-50 custom-shadow shadow-sm hover:border-[#F28C28]/20 transition-all duration-500 flex flex-col md:flex-row items-center gap-6 group"
              >
                <div className="w-16 h-16 bg-[#F5F0E6] rounded-2xl flex items-center justify-center text-[#F28C28] font-black text-2xl group-hover:bg-[#F28C28] group-hover:text-white transition-all duration-500 custom-shadow shadow-sm">
                  {assistant.name ? assistant.name[0] : '?'}
                </div>

                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                    <h4 className="text-lg font-black text-gray-900 leading-none">{assistant.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${assistant.pricing === 'Free' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-[#F28C28]'
                      }`}>{assistant.pricing}</span>
                  </div>
                  <div className="relative inline-block mt-2">
                    <select
                      value={assistant.status}
                      onChange={(e) => updateToolStatus(assistant.id!, e.target.value as ToolStatus)}
                      className="appearance-none bg-[#F5F0E6] text-gray-900 font-bold text-[8px] uppercase tracking-widest rounded-full pl-4 pr-10 py-2.5 outline-none focus:ring-4 focus:ring-[#F28C28]/10 transition-all border-none cursor-pointer"
                    >
                      <option value="Testing">Just Exploring</option>
                      <option value="In Daily Use">Daily Essential</option>
                      <option value="Strategic Priority">Career Priority</option>
                    </select>
                    <Plus className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 pointer-events-none rotate-45" />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50 w-full md:w-auto justify-center">
                  <a href={assistant.toolLink} target="_blank" rel="noopener" className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-300 rounded-xl hover:bg-[#F28C28] hover:text-white transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button onClick={() => removeTool(assistant.id!)} className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-300 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link to={`/assistant/${assistant.id}`} className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-xl hover:bg-[#F28C28] transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )) : (
              <div className="bg-white border-4 border-dashed border-gray-50 rounded-[3.5rem] p-16 text-center">
                <Target className="w-10 h-10 text-gray-200 mx-auto mb-6" />
                <h4 className="text-xl font-black text-gray-900 mb-2 leading-tight">Your space is clear.</h4>
                <p className="text-gray-400 font-medium mb-8 max-w-xs mx-auto text-sm leading-relaxed">It's time to build your personal AI stack.</p>
                <Link to="/library" className="bg-gray-900 text-white px-10 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#F28C28] transition-all shadow-xl">Browse Library</Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-8 rounded-[3rem] custom-shadow shadow-sm border border-gray-50">
            <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F28C28]" /> Recent Steps
            </h3>
            <div className="space-y-6 relative ml-1">
              <div className="absolute left-[15px] top-1.5 bottom-1.5 w-0.5 bg-gray-50" />
              {[
                { title: 'New Assistant Added', detail: 'Midjourney for Marketing', time: '2h ago', icon: Plus, color: 'text-green-50' },
                { title: 'Readiness Boost', detail: 'Crossed the 80% mark', time: 'Just now', icon: TrendingUp, color: 'text-purple-50' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className="w-8 h-8 bg-gray-900 text-[#F28C28] rounded-lg flex items-center justify-center shadow-lg">
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">{step.title}</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-[3rem] text-white relative shadow-xl overflow-hidden">
            <Sparkles className="w-10 h-10 text-[#F28C28] mb-6" />
            <h4 className="text-xl font-black mb-2 tracking-tight leading-none">Pro Strategy Tip</h4>
            <p className="text-gray-400 font-medium text-xs leading-relaxed mb-8">Try grouping your assistants by "Task" rather than "Name" to identify workflow gaps.</p>
            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#F28C28] hover:text-white transition-colors">
              Get More Tips <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
