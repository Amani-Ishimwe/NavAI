
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { FIELDS, getIcon } from '../constants';

const FieldsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFields = FIELDS.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Path</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Find AI tools specific to your professional discipline. We've mapped out the best agents for 20 unique fields.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-16 relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="Search professional fields..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-6 py-5 rounded-[2rem] border-none bg-white custom-shadow focus:ring-2 focus:ring-[#F28C28]/20 transition-all text-lg outline-none"
        />
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredFields.map((field) => (
          <motion.div
            key={field.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            onClick={() => navigate(`/directory?field=${field.name}`)}
            className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 cursor-pointer custom-shadow hover:border-[#F28C28]/20 transition-all"
          >
            <div className="w-16 h-16 bg-[#F5F0E6] rounded-2xl flex items-center justify-center text-[#F28C28] mb-6 group-hover:bg-[#F28C28] group-hover:text-white transition-all duration-300">
              {getIcon(field.icon)}
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-[#F28C28] transition-colors">{field.name}</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-2">{field.description}</p>
            <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#F28C28] transition-colors">
              Explore agents <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {filteredFields.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">No fields found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default FieldsPage;
