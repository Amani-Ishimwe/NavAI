
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, ExternalLink, Bookmark, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { AIAgent } from '../types';

const ITEMS_PER_PAGE = 12;

const DirectoryPage = () => {
  const { agents, savedTools, saveTool, removeTool } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const fieldQuery = searchParams.get('field') || 'All';
  const [searchTerm, setSearchTerm] = useState('');
  const [pricingFilter, setPricingFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, fieldQuery, pricingFilter]);

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesField = fieldQuery === 'All' || agent.field === fieldQuery;
      const matchesPricing = pricingFilter === 'All' || agent.pricing === pricingFilter;
      return matchesSearch && matchesField && matchesPricing;
    });
  }, [agents, searchTerm, fieldQuery, pricingFilter]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const isSaved = (id: string) => !!savedTools.find(t => t.agentId === id);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Agents Directory</h1>
          <p className="text-gray-500">Discover and compare the best tools for {fieldQuery === 'All' ? 'any career' : fieldQuery}.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {['All', 'Free', 'Freemium', 'Paid'].map((type) => (
            <button
              key={type}
              onClick={() => setPricingFilter(type)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${pricingFilter === type
                  ? 'bg-[#F28C28] text-white shadow-lg'
                  : 'bg-white text-gray-500 hover:border-[#F28C28]/30 border border-gray-100'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-3xl custom-shadow border border-gray-100">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#F28C28]" />
              Quick Search
            </h3>
            <input
              type="text"
              placeholder="App name, keyword..."
              className="w-full px-4 py-3 rounded-xl bg-[#F5F0E6] border-none outline-none text-sm focus:ring-2 focus:ring-[#F28C28]/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white p-6 rounded-3xl custom-shadow border border-gray-100">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#F28C28]" />
              Field Filter
            </h3>
            <select
              className="w-full px-4 py-3 rounded-xl bg-[#F5F0E6] border-none outline-none text-sm focus:ring-2 focus:ring-[#F28C28]/20"
              value={fieldQuery}
              onChange={(e) => setSearchParams({ field: e.target.value })}
            >
              <option value="All">All Careers</option>
              {Array.from(new Set(agents.map(a => a.field))).map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid md:grid-cols-2 gap-6">
              {paginatedAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-8 rounded-[2rem] custom-shadow border border-gray-100 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${agent.pricing === 'Free' ? 'bg-green-100 text-green-600' :
                          agent.pricing === 'Freemium' ? 'bg-blue-100 text-blue-600' :
                            'bg-orange-100 text-[#F28C28]'
                        }`}>
                        {agent.pricing}
                      </span>
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {agent.rating}
                      </div>
                    </div>
                    <Link to={`/agent/${agent.id}`} className="block mb-2">
                      <h3 className="text-xl font-bold group-hover:text-[#F28C28] transition-colors">{agent.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-400 mb-4">{agent.field}</p>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2">{agent.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {agent.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#F5F0E6] rounded-lg text-xs font-medium text-gray-500">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link to={`/agent/${agent.id}`} className="flex-grow bg-[#F5F0E6] text-gray-700 py-3 rounded-xl font-bold text-sm text-center hover:bg-[#F28C28] hover:text-white transition-all">
                      Details
                    </Link>
                    <button
                      onClick={() => isSaved(agent.id) ? removeTool(agent.id) : saveTool(agent.id)}
                      className={`p-3 rounded-xl transition-all ${isSaved(agent.id) ? 'bg-[#F28C28] text-white' : 'bg-[#F28C28]/10 text-[#F28C28] hover:bg-[#F28C28] hover:text-white'}`}
                    >
                      {isSaved(agent.id) ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredAgents.length === 0 && (
            <div className="bg-white rounded-[3rem] p-20 text-center custom-shadow border border-dashed border-gray-200">
              <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No agents found</h2>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-full bg-white border border-gray-100 disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-gray-500 font-bold text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full bg-white border border-gray-100 disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectoryPage;
