
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, CheckCircle2, Search, 
  BarChart3, Sparkles, AlertCircle, DollarSign 
} from 'lucide-react';
import { FIELDS } from '../constants';

const LandingPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#F28C28]/10 text-[#F28C28] px-4 py-2 rounded-full text-sm font-semibold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Empowering 20+ Career Paths
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight"
          >
            Stop guessing. <br />
            <span className="text-[#F28C28]">Navigate</span> the AI world.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            navAI helps professionals discover tailored AI agents, compare pricing, and manage their tool stack in one simple dashboard.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/fields" className="bg-[#F28C28] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#D97706] transition-all flex items-center justify-center gap-2 custom-shadow">
              Explore Fields <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/directory" className="bg-white border-2 border-gray-100 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-[#F28C28] transition-all flex items-center justify-center">
              View Directory
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The AI Confusion</h2>
            <p className="text-gray-500">Why navigating the current landscape is frustrating.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: AlertCircle, title: 'Analysis Paralysis', desc: 'Too many tools, no clear winner for your specific job.' },
              // Fix: DollarSign is now imported and correctly referenced here
              { icon: DollarSign, title: 'Hidden Costs', desc: 'Subscription fatigue and unclear free vs. paid boundaries.' },
              { icon: Shield, title: 'Trust Gap', desc: 'Which recommendations are real and which are paid ads?' }
            ].map((p, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-[#F5F0E6] border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 text-[#F28C28]">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fields Preview */}
      <section className="py-24 px-4 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Discovery by Field</h2>
              <p className="text-gray-500">Pick your professional path to see relevant agents.</p>
            </div>
            <Link to="/fields" className="text-[#F28C28] font-bold flex items-center gap-2 hover:underline">
              All 20 Fields <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {FIELDS.slice(0, 10).map((field) => (
              <Link key={field.id} to={`/directory?field=${field.name}`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-6 rounded-3xl text-center border border-gray-100 hover:border-[#F28C28]/30 transition-all custom-shadow"
                >
                  <div className="mb-4 inline-block text-[#F28C28]">{/* Dynamically handled in FieldsPage, using static here for brevity */}
                    <Search className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">{field.name}</h4>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Expert Rating & Clear Feedback</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every tool on navAI is vetted. We track community sentiment, expert reviews, and real-world performance metrics so you don't have to.
            </p>
            <div className="space-y-4">
              {[
                'Unbiased, non-sponsored ratings',
                'Verified professional use cases',
                'Live pricing updates'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#F28C28] w-5 h-5" />
                  <span className="font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[#F28C28]/10 rounded-full blur-3xl -z-10" />
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="bg-white p-8 rounded-[2rem] custom-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F28C28]/10 rounded-xl flex items-center justify-center text-[#F28C28]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold">Trust Indicator</h3>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase">Verified</span>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase">Utility Score</div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} className="bg-[#F28C28] h-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase">Cost/Value Ratio</div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="bg-blue-400 h-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-[3rem] p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F28C28] rounded-full blur-[120px] opacity-20" />
          <h2 className="text-4xl font-bold text-white mb-8">Start your AI journey today.</h2>
          <p className="text-gray-400 mb-12 max-xl mx-auto">Join thousands of professionals using navAI to reclaim their time and master the new AI workforce.</p>
          <Link to="/login" className="bg-[#F28C28] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all inline-block">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
