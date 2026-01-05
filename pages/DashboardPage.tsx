
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Bookmark, Zap, TrendingUp, 
  Trash2, ExternalLink, Filter, Package, AlertCircle, Sparkles
} from 'lucide-react';
import { useStore } from '../store';
import { ToolStatus } from '../types';
import { Link, Navigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, savedTools, removeTool, updateToolStatus, agents } = useStore();

  if (!user) return <Navigate to="/login" />;

  const myAgents = savedTools.map(st => {
    const agent = agents.find(a => a.id === st.agentId);
    return { ...agent, ...st };
  });

  const freeCount = myAgents.filter(a => a.pricing === 'Free').length;
  const paidCount = myAgents.filter(a => a.pricing === 'Paid' || a.pricing === 'Freemium').length;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.email.split('@')[0]}</h1>
          <p className="text-gray-500">Managing {savedTools.length} curated AI agents for your career.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/directory" className="bg-[#F28C28] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 custom-shadow hover:bg-[#D97706] transition-all">
            <Sparkles className="w-5 h-5" /> Explore New
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Saved Agents', value: savedTools.length, icon: Bookmark, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Free Tools', value: freeCount, icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Paid/Freemium', value: paidCount, icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Recommendations', value: 4, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 custom-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-[#F28C28]" /> Active Tool Stack
          </h3>
          
          <div className="space-y-4">
            {myAgents.length > 0 ? myAgents.map((agent) => (
              <motion.div 
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 custom-shadow flex items-center gap-6 group"
              >
                <div className="w-14 h-14 bg-[#F5F0E6] rounded-2xl flex items-center justify-center text-[#F28C28] font-bold text-lg group-hover:bg-[#F28C28] group-hover:text-white transition-all">
                  {agent.name ? agent.name[0] : '?'}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{agent.name}</h4>
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase ${
                      agent.pricing === 'Free' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-[#F28C28]'
                    }`}>{agent.pricing}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center text-xs text-gray-400 font-medium">
                    <select 
                      value={agent.status} 
                      onChange={(e) => updateToolStatus(agent.id!, e.target.value as ToolStatus)}
                      className="bg-[#F5F0E6] text-gray-600 border-none rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-[#F28C28]"
                    >
                      <option value="Trying">Trying</option>
                      <option value="Using">Using</option>
                      <option value="Considering Upgrade">Upgrade?</option>
                    </select>
                    <span>Added {new Date(agent.addedAt!).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={agent.toolLink} target="_blank" rel="noopener" className="p-3 text-gray-400 hover:text-[#F28C28] transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button onClick={() => removeTool(agent.id!)} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2rem] p-12 text-center">
                <Bookmark className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No tools saved yet. Start building your career stack!</p>
                <Link to="/directory" className="mt-4 inline-block text-[#F28C28] font-bold hover:underline">Go to directory</Link>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Sidebar */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#F28C28] rounded-full blur-[80px] opacity-30" />
            <h3 className="text-xl font-bold mb-4">Master AI Strategy</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Upgrade to Pro to unlock ROI calculators, bulk agent analysis, and priority access to new field data.</p>
            <Link to="/pricing" className="block w-full py-4 bg-[#F28C28] text-white rounded-2xl text-center font-bold hover:bg-orange-600 transition-all">
              Go Pro Today
            </Link>
          </div>

          <div className="bg-white p-8 rounded-[2rem] custom-shadow border border-gray-100">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#F28C28]" /> Quick Recs
            </h3>
            <div className="space-y-4">
              {agents.filter(a => a.featured).slice(0, 3).map(rec => (
                <Link key={rec.id} to={`/agent/${rec.id}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[#F5F0E6] rounded-xl flex items-center justify-center text-gray-500 text-xs font-bold group-hover:bg-[#F28C28] group-hover:text-white transition-all">
                    {rec.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 leading-none mb-1 group-hover:text-[#F28C28]">{rec.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">{rec.pricing}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
