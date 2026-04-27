
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Star, Zap, DollarSign,
  ArrowRight, ChevronDown, Package, LayoutGrid,
  List as ListIcon, ShieldCheck, Sparkles, ChevronRight, Compass
} from 'lucide-react';
import { useStore } from '../store';
import { PricingType } from '../types';
import SectionHeader from '../components/common/SectionHeader';

const DirectoryPage = () => {
  const { agents } = useStore();
  const [searchParams] = useSearchParams();
  const initialField = searchParams.get('field') || 'All Fields';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState(initialField);
  const [selectedPricing, setSelectedPricing] = useState<PricingType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'newest'>('rating');

  const fields = ['All Fields', ...Array.from(new Set(agents.map(a => a.field)))];

  const filteredAgents = useMemo(() => {
    return agents
      .filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesField = selectedField === 'All Fields' || a.field === selectedField;
        const matchesPricing = selectedPricing === 'All' || a.pricing === selectedPricing;
        return matchesSearch && matchesField && matchesPricing;
      })
      .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : 0);
  }, [agents, searchTerm, selectedField, selectedPricing, sortBy]);

  return (
    <div className="py-12 md:py-16 px-6 max-w-7xl mx-auto font-sans">
      <SectionHeader
        badge="Full Registry"
        title="Assistant Library"
        subtitle="The definitive collection of professional intelligence. Verified and vetted."
      />

      {/* Advanced Filter Hub */}
      <div className="bg-white p-6 rounded-[3rem] border border-gray-100 custom-shadow shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Search Box */}
          <div className="lg:col-span-5 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#F28C28] transition-colors" />
            <input
              type="text"
              placeholder="Search intelligence index..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-[11px] font-bold focus:ring-4 focus:ring-[#F28C28]/10 outline-none"
            />
          </div>

          {/* Domain Select */}
          <div className="lg:col-span-3 relative">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-[#F28C28]/10 appearance-none"
            >
              {fields.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
          </div>

          {/* Pricing Model */}
          <div className="lg:col-span-2 relative">
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value as any)}
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-[#F28C28]/10 appearance-none"
            >
              <option value="All">All Levels</option>
              <option value="Free">Free Only</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Premium</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
          </div>

          {/* Stats Hub */}
          <div className="lg:col-span-2 text-right">
            <div className="text-2xl font-black text-gray-900 leading-none">{filteredAgents.length}</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Available Nodes</div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.02, duration: 0.4 }}
              className="group bg-white rounded-[3rem] p-8 border border-gray-50 hover:border-[#F28C28]/20 transition-all duration-700 custom-shadow shadow-sm flex flex-col relative overflow-hidden"
            >
              {/* Featured Badge */}
              {agent.featured && (
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  <Sparkles className="w-3 h-3 text-[#F28C28]" />
                  <span className="text-[8px] font-black text-[#F28C28] uppercase">Priority</span>
                </div>
              )}

              <div className="flex items-center gap-6 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 custom-shadow shadow-sm ${agent.featured ? 'bg-[#F28C28] text-white shadow-lg shadow-orange-100' : 'bg-[#F5F0E6] text-[#F28C28] group-hover:bg-gray-900 group-hover:text-white'}`}>
                  {agent.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 leading-none mb-1.5">{agent.name}</h3>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{agent.field}</div>
                </div>
              </div>

              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 flex-grow line-clamp-2">{agent.shortDescription}</p>

              <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-[11px] font-black text-gray-900">
                  <Star className="w-3.5 h-3.5 text-[#F28C28] fill-[#F28C28]" /> {agent.rating}
                </div>
                <Link to={`/assistant/${agent.id}`} className="bg-gray-50 text-gray-400 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#F28C28] hover:text-white transition-all flex items-center gap-2">
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
            <Compass className="w-10 h-10 animate-pulse" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">No matching intelligence.</h3>
          <p className="text-gray-400 font-medium text-sm mb-10">Try adjusting your filters or search terms.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedField('All Fields'); setSelectedPricing('All'); }}
            className="bg-gray-900 text-white px-10 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#F28C28] transition-all shadow-xl"
          >
            Reset All Registry Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DirectoryPage;
