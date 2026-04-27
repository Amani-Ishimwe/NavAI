
import React, { useState, useMemo } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, Users, FileText, Settings,
  MessageSquare, ShieldCheck, TrendingUp, AlertCircle,
  Clock, Plus, Filter, Search, MoreVertical, ChevronRight,
  Shield, Zap, Globe, Target, Sparkles, Activity, Star, Trash2, X, Check,
  ExternalLink, ArrowUpRight
} from 'lucide-react';
import { useStore } from '../store';
import { AIAgent, PricingType } from '../types';
import SectionHeader from '../components/common/SectionHeader';
import { FIELDS } from '../constants';

const AdminPage = () => {
  const { user, agents, addAgent, updateAgent, deleteAgent } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AIAgent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  const stats = [
    { label: 'Platform Users', value: '1,248', growth: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Curated Assistants', value: agents.length.toString(), growth: '+' + (agents.length > 100 ? '5' : '2'), icon: FileText, color: 'text-[#F28C28]', bg: 'bg-[#F28C28]/10' },
    { label: 'User Trust Index', value: '8.4', growth: '+24%', icon: Star, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Alerts', value: '3', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' }
  ];

  const filteredAgents = agents.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingAgent(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (agent: AIAgent) => {
    setEditingAgent(agent);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this assistant from the platform?')) {
      deleteAgent(id);
    }
  };

  const toggleFeatured = (agent: AIAgent) => {
    updateAgent(agent.id, { featured: !agent.featured });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 md:py-16 px-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
        <div>
          <SectionHeader
            badge="Platform Lead"
            title="Operations Hub"
            subtitle="Manage global intelligence and platform performance."
            align="left"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleOpenAdd}
            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl hover:bg-[#F28C28] transition-all duration-500"
          >
            <Plus className="w-4 h-4" /> Add Assistant
          </button>
          <button className="bg-white border border-gray-100 p-4 rounded-xl text-gray-400 hover:text-gray-900 transition-all custom-shadow shadow-sm group">
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-50 custom-shadow shadow-sm relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 ${s.bg} ${s.color} rounded-xl group-hover:scale-110 transition-transform duration-700 custom-shadow shadow-sm`}>
                <s.icon className="w-6 h-6" />
              </div>
              {s.growth && <span className="text-[9px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-100">{s.growth}</span>}
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1 tracking-tighter">{s.value}</div>
            <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Management Table */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3.5rem] custom-shadow shadow-sm border border-gray-50 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight">Verified Library</h3>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Audit {agents.length} professional integrations.</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Search registry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-[11px] font-bold focus:ring-4 focus:ring-[#F28C28]/10 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F5F0E6] text-[9px] uppercase tracking-widest font-black text-gray-400">
                  <tr>
                    <th className="px-8 py-6">Assistant</th>
                    <th className="px-8 py-6">Domain</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6">Level</th>
                    <th className="px-8 py-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAgents.slice(0, 10).map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all ${a.featured ? 'bg-[#F28C28] text-white shadow-lg shadow-orange-100' : 'bg-[#F5F0E6] text-[#F28C28]'}`}>
                            {a.name[0]}
                          </div>
                          <div>
                            <div className="font-black text-gray-900 text-base tracking-tight flex items-center gap-1.5">
                              {a.name}
                              {a.featured && <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />}
                            </div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{a.reviewsCount} Reviews</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{a.field}</td>
                      <td className="px-8 py-6">
                        <button
                          onClick={() => toggleFeatured(a)}
                          className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all ${a.featured ? 'bg-orange-50 text-[#F28C28] border-[#F28C28]/20' : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300'}`}
                        >
                          {a.featured ? 'Strategic' : 'Standard'}
                        </button>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${a.pricing === 'Free' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>{a.pricing}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(a)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-blue-500 hover:border-blue-100 transition-all"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(a.id)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-100 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-8 rounded-[3rem] custom-shadow shadow-sm border border-gray-50 overflow-hidden relative">
            <h3 className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#F28C28]" /> Platform Pulse
            </h3>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Discovery Traffic</div>
                  <div className="text-xl font-black text-right text-gray-900">92%</div>
                </div>
                <div className="h-16 bg-[#F5F0E6] rounded-2xl flex items-end gap-1 p-3 overflow-hidden">
                  {[40, 60, 45, 80, 55, 90, 70, 85, 60, 95, 75, 110].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${(h / 110) * 100}%` }}
                      className="flex-grow bg-[#F28C28] rounded-t-sm"
                    />
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50">
                <h4 className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-6">Operations Checklist</h4>
                <div className="space-y-4">
                  {[
                    { task: 'Verify 12 user shares', priority: 'High', icon: MessageSquare, color: 'text-red-500' },
                    { task: 'Update Career Icons', priority: 'Low', icon: Globe, color: 'text-blue-500' }
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-white transition-all duration-300">
                      <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center custom-shadow group-hover:bg-[#F28C28] transition-all`}>
                        <t.icon className={`w-4 h-4 ${t.color} group-hover:text-white transition-colors`} />
                      </div>
                      <div className="flex-grow">
                        <div className="text-[11px] font-black text-gray-900 tracking-tight">{t.task}</div>
                        <div className="text-[8px] font-black uppercase text-gray-400 tracking-widest">{t.priority} Attention</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-[3rem] p-8 text-white relative shadow-xl overflow-hidden group">
            <Sparkles className="w-8 h-8 text-[#F28C28] mb-6" />
            <h3 className="text-xl font-black mb-2 tracking-tight">System Node</h3>
            <p className="text-gray-400 text-[11px] font-medium leading-relaxed mb-6">Operations node synced. Mapping updated for all 30 career paths.</p>
            <button className="w-full py-4 bg-[#F28C28] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all">
              Changelog
            </button>
          </div>
        </div>
      </div>

      {/* Assistant Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
            <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                    {editingAgent ? 'Edit Intelligence' : 'Register Assistant'}
                  </h3>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Configuration parameters.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8">
                <AgentForm
                  agent={editingAgent}
                  onClose={() => setIsModalOpen(false)}
                  onSave={(data) => {
                    if (editingAgent) {
                      updateAgent(editingAgent.id, data);
                    } else {
                      addAgent(data as any);
                    }
                    setIsModalOpen(false);
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AgentForm = ({ agent, onClose, onSave }: { agent: AIAgent | null, onClose: () => void, onSave: (data: Partial<AIAgent>) => void }) => {
  const [formData, setFormData] = useState<Partial<AIAgent>>(
    agent || {
      name: '',
      field: FIELDS[0].name,
      shortDescription: '',
      pricing: 'Free',
      toolLink: 'https://',
      useCases: ['', '', ''],
      rating: 4.5,
      reviewsCount: 0,
      featured: false,
      longDescription: '',
      tags: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Entity Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Domain</label>
          <select
            value={formData.field}
            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10"
          >
            {FIELDS.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Summary</label>
        <textarea
          required
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10 h-24 resize-none"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Pricing</label>
          <div className="flex bg-gray-50 p-1 rounded-xl">
            {(['Free', 'Freemium', 'Paid'] as PricingType[]).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, pricing: type })}
                className={`flex-grow py-2.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${formData.pricing === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity Link</label>
          <input
            type="url"
            value={formData.toolLink}
            onChange={(e) => setFormData({ ...formData, toolLink: e.target.value })}
            className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10"
          />
        </div>
      </div>

      <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
        <button type="button" onClick={onClose} className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Discard</button>
        <button type="submit" className="bg-gray-900 text-white px-10 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#F28C28] transition-all">
          {agent ? 'Update Node' : 'Deploy Assistant'} <Check className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}

export default AdminPage;
