
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ChevronRight, Sparkles, ArrowRight, Compass, Target, Star, MoreHorizontal, Filter } from 'lucide-react';
import { FIELDS, getIcon } from '../constants';
import SectionHeader from '../components/common/SectionHeader';

const FieldsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Creative', 'Technical', 'Strategic', 'Care', 'Trade'];

  const categoryMap: Record<string, string[]> = {
    'Creative': ['uiux', 'graphic', 'write', 'photo', 'music', 'food', 'lux'],
    'Technical': ['dev', 'aiml', 'data', 'cloud', 'web3', 'cyber', 'eng', 'energy', 'science'],
    'Strategic': ['biz', 'fin', 'mkt', 'hr', 'sales', 'consult', 'logistics'],
    'Care': ['health', 'edu', 'cs', 'ngo', 'climate'],
    'Trade': ['logistics', 'energy', 'eng']
  };

  const filteredFields = useMemo(() => {
    return FIELDS.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = activeCategory === 'All' ||
        categoryMap[activeCategory]?.includes(f.id);

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="py-12 md:py-16 px-6 max-w-7xl mx-auto font-sans">
      <SectionHeader
        badge="Intelligence Grid"
        title="Professional Merit"
        subtitle="Explore verified discovery paths for 30+ career disciplines. Curated for the professional elite."
      />

      {/* Advanced Filter Hub */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#F28C28]/5 blur-[40px] -z-10 rounded-full group-hover:bg-[#F28C28]/10 transition-all duration-700" />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#F28C28] transition-colors" />
          <input
            type="text"
            placeholder="Index professional domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-10 py-5 rounded-[2rem] border border-gray-100 bg-white/60 backdrop-blur-2xl custom-shadow focus:ring-4 focus:ring-[#F28C28]/5 transition-all text-base md:text-lg outline-none placeholder:text-gray-300 font-black tracking-tight"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-500 border ${activeCategory === cat
                ? 'bg-gray-900 text-white border-transparent shadow-lg'
                : 'bg-white text-gray-400 border-gray-100 hover:border-[#F28C28] hover:text-gray-900'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Professional Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredFields.map((field, idx) => (
            <motion.div
              key={field.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.01, duration: 0.4 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => navigate(`/library?field=${field.name}`)}
              className="group bg-white p-8 rounded-[3rem] border border-gray-50 cursor-pointer shadow-xl shadow-gray-200/40 hover:border-[#F28C28]/20 transition-all duration-700 flex flex-col relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-[#F5F0E6] rounded-2xl flex items-center justify-center text-[#F28C28] group-hover:bg-[#F28C28] group-hover:text-white transition-all duration-500 custom-shadow shadow-sm">
                  {getIcon(field.icon)}
                </div>
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[#F28C28] transition-colors tracking-tighter leading-tight">{field.name}</h3>
              <p className="text-gray-400 font-medium text-[11px] leading-relaxed mb-8 group-hover:text-gray-600 transition-colors uppercase tracking-widest">{field.description}</p>

              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest group-hover:text-gray-500">40+ Solutions</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredFields.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white rounded-[4rem] border-4 border-dashed border-gray-50 flex flex-col items-center"
        >
          <Compass className="w-12 h-12 text-gray-200 mb-6" />
          <h4 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Professional path not found.</h4>
          <p className="text-gray-400 font-medium text-sm mb-10 max-w-xs mx-auto leading-relaxed">Try a broader term or reset filters.</p>
          <button
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
            className="bg-gray-900 text-white px-10 py-5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#F28C28] transition-all"
          >
            Reset Professional Filters
          </button>
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.div className="mt-16">
        <div className="bg-gray-900 rounded-[3rem] p-10 text-white text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl font-black mb-3 tracking-tighter">Strategic Mapping</h2>
          <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8 max-w-xl mx-auto">Connect with AI Strategy Experts for a personalized corporate tool stack.</p>
          <Link to="/membership" className="bg-[#F28C28] text-white px-8 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all inline-block shadow-xl">
            Identity Membership
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default FieldsPage;
