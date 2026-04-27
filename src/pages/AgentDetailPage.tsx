
import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, MessageSquare, Zap, Shield, ExternalLink,
  ChevronRight, ArrowLeft, Bookmark, CheckCircle2,
  Clock, Share2, AlertCircle, Sparkles, Filter, MoreHorizontal,
  Plus, ShieldCheck, Trash2
} from 'lucide-react';
import { useStore } from '../store';
import SectionHeader from '../components/common/SectionHeader';

const AgentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { agents, reviews, user, savedTools, saveTool, removeTool, addReview } = useStore();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'use-cases'>('details');

  const agent = agents.find(a => a.id === id);
  const agentReviews = reviews.filter(r => r.agentId === id);

  if (!agent) return <Navigate to="/library" />

  const isSaved = savedTools.some(t => t.agentId === agent.id);

  const handleToggleSave = () => {
    if (!user) return;
    isSaved ? removeTool(agent.id) : saveTool(agent.id);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    addReview({
      agentId: agent.id,
      userName: user.email.split('@')[0],
      rating,
      comment
    });
    setComment('');
  };

  return (
    <div className="py-12 md:py-16 px-6 max-w-7xl mx-auto font-sans">
      {/* Back & Breadcrumb */}
      <div className="flex items-center justify-between mb-10">
        <Link to="/library" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Library
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggleSave}
            className={`p-3 rounded-xl transition-all shadow-sm ${isSaved ? 'bg-orange-50 text-[#F28C28] border border-[#F28C28]/20' : 'bg-white border border-gray-100 text-gray-400 hover:text-[#F28C28]'}`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#F28C28]' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3.5rem] border border-gray-50 custom-shadow shadow-sm overflow-hidden mb-8"
          >
            <div className="p-8 md:p-12 border-b border-gray-50">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] flex items-center justify-center font-black text-5xl transition-all shadow-2xl relative group ${agent.featured ? 'bg-[#F28C28] text-white shadow-orange-100' : 'bg-[#F5F0E6] text-[#F28C28]'}`}>
                  {agent.name[0]}
                  {agent.featured && (
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center border-4 border-white">
                      <Sparkles className="w-5 h-5 text-[#F28C28]" />
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left flex-grow">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                    <span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{agent.field}</span>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${agent.pricing === 'Free' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-[#F28C28] border-orange-100'}`}>{agent.pricing}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 leading-none">{agent.name}</h1>
                  <div className="flex items-center justify-center md:justify-start gap-6">
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-gray-900">
                      <Star className="w-4 h-4 text-[#F28C28] fill-[#F28C28]" /> {agent.rating} <span className="text-gray-300 font-bold ml-1">({agent.reviewsCount} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-green-600 uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4" /> Verified Identity
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="flex border-b border-gray-50 px-8">
              {['details', 'use-cases', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === tab ? 'border-[#F28C28] text-gray-900' : 'border-transparent text-gray-300 hover:text-gray-900'}`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12 min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <p className="text-gray-400 font-medium text-lg md:text-xl leading-relaxed">{agent.longDescription}</p>
                    <div className="grid md:grid-cols-2 gap-6 pt-8">
                      {[
                        { label: 'Platform Performance', value: 'High Fidelity', icon: Zap },
                        { label: 'Discovery Logic', value: 'Verified', icon: Shield },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2rem]">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#F28C28] shadow-sm">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{item.label}</div>
                            <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'use-cases' && (
                  <motion.div
                    key="use-cases"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    {agent.useCases.map((useCase, i) => (
                      <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-[2rem] group hover:bg-[#F28C28]/5 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#F28C28] group-hover:bg-[#F28C28] group-hover:text-white transition-all shadow-sm">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <p className="text-gray-900 font-black text-base md:text-lg tracking-tight pt-1.5">{useCase}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-10"
                  >
                    {user ? (
                      <div className="bg-gray-50 p-8 rounded-[2.5rem] mb-12">
                        <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-6">Contribute to the Index</h4>
                        <form onSubmit={handleAddReview} className="space-y-6">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none pt-1">Rating:</span>
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map(s => (
                                <button key={s} type="button" onClick={() => setRating(s)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${rating >= s ? 'bg-[#F28C28] text-white shadow-lg shadow-orange-100' : 'bg-white text-gray-300'}`}>
                                  <Star className={`w-4 h-4 ${rating >= s ? 'fill-white' : ''}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your professional experience with this assistant..."
                            className="w-full bg-white border border-gray-100 rounded-[1.5rem] p-6 text-sm font-medium focus:ring-4 focus:ring-[#F28C28]/10 outline-none h-24 resize-none"
                          />
                          <div className="flex justify-end">
                            <button type="submit" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F28C28] transition-all shadow-xl">Deploy Review</button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="p-10 border-2 border-dashed border-gray-100 rounded-[2.5rem] text-center mb-10">
                        <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
                          Please <Link to="/login" className="text-[#F28C28]">Sign In</Link> to contribute intelligence.
                        </p>
                      </div>
                    )}

                    <div className="space-y-8">
                      {agentReviews.map((rev) => (
                        <div key={rev.id} className="border-b border-gray-50 pb-8 last:border-0">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-black text-[10px] uppercase">{rev.userName[0]}</div>
                              <div>
                                <div className="text-sm font-black text-gray-900 tracking-tight">{rev.userName}</div>
                                <div className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{new Date(rev.date).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[#F28C28]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-[#F28C28]' : 'text-gray-200'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-500 font-medium text-sm leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-gray-900 rounded-[3.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F28C28] rounded-full blur-[100px] opacity-10 group-hover:scale-110 transition-transform" />
            <Zap className="w-10 h-10 text-[#F28C28] mb-8" />
            <h3 className="text-2xl font-black mb-4 tracking-tight leading-none">Deploy to Workspace</h3>
            <p className="text-gray-400 text-sm font-medium mb-12 leading-relaxed">Save this assistant to your professional growth roadmap for instant access and ROI tracking.</p>

            <div className="space-y-4">
              <a
                href={agent.toolLink}
                target="_blank"
                rel="noopener"
                className="w-full bg-white text-gray-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#F28C28] hover:text-white transition-all shadow-xl"
              >
                Access Intelligence <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={handleToggleSave}
                className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${isSaved ? 'bg-white/10 text-[#F28C28] border border-[#F28C28]/30 hover:bg-white/20' : 'bg-gray-800 text-white hover:bg-white/10'}`}
              >
                {isSaved ? (
                  <>Remove from Hub <Trash2 className="w-4 h-4" /></>
                ) : (
                  <>Add to My Workspace <Plus className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 border border-gray-50 custom-shadow shadow-sm">
            <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F28C28]" /> Strategic Insights
            </h4>
            <div className="space-y-6">
              {[
                { label: 'Platform Trust Score', value: 'High Accuracy', icon: ShieldCheck },
                { label: 'Integration Speed', value: 'Instant Access', icon: Clock }
              ].map((insight, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-gray-900 group-hover:text-[#F28C28] transition-all">
                    <insight.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-900 uppercase tracking-tight leading-none mb-1">{insight.value}</div>
                    <div className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{insight.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Report Node Issue</div>
              <div className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Assistant Integrity Hub</div>
            </div>
            <button className="p-3 bg-white rounded-xl text-gray-300 hover:text-red-500 transition-all custom-shadow shadow-sm">
              <AlertCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;
