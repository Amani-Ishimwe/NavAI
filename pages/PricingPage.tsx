
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Sparkles, Building2 } from 'lucide-react';

const PricingPage = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      description: 'Perfect for exploring the AI landscape.',
      icon: Sparkles,
      color: 'gray-900',
      features: [
        'Full access to 20 professional fields',
        'Save up to 10 AI agents',
        'Basic pricing clarity badges',
        'Standard dashboard tracking'
      ],
      notIncluded: [
        'Advanced ROI analysis',
        'Unlimited saved agents',
        'Team collaboration tools',
        'Early access to new reports'
      ],
      cta: 'Free Forever',
      current: true
    },
    {
      name: 'Pro',
      price: '19',
      description: 'For professionals optimizing their daily stack.',
      icon: Shield,
      color: '[#F28C28]',
      features: [
        'Unlimited saved agents',
        'In-depth ROI & cost calculators',
        'Custom status categories',
        'Early access to new field data',
        'Priority email support',
        'No advertisements'
      ],
      notIncluded: [
        'Bulk seat management',
        'Custom enterprise integration'
      ],
      cta: 'Coming Soon',
      highlight: true
    },
    {
      name: 'Teams',
      price: '49',
      description: 'Ideal for small firms and departments.',
      icon: Building2,
      color: 'blue-600',
      features: [
        'Everything in Pro',
        'Up to 10 team seats',
        'Shared departmental dashboards',
        'Collaborative feedback system',
        'Admin audit logs',
        'Custom onboarding session'
      ],
      notIncluded: [],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Clear Pricing.</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">navAI helps you find tools that save you thousands. Our plans are designed to scale with your career growth.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className={`relative bg-white p-10 rounded-[3rem] custom-shadow border-2 transition-all ${
              plan.highlight ? 'border-[#F28C28] scale-105 z-10' : 'border-gray-50'
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F28C28] text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                Recommended
              </div>
            )}
            
            <div className={`w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 text-${plan.color}`}>
              <plan.icon className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-500 text-sm mb-6 h-10">{plan.description}</p>
            
            <div className="flex items-baseline gap-1 mb-10">
              <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
              <span className="text-gray-400 font-medium">/month</span>
            </div>

            <button className={`w-full py-4 rounded-2xl font-bold mb-10 transition-all ${
              plan.highlight 
                ? 'bg-[#F28C28] text-white hover:bg-orange-600 shadow-xl shadow-orange-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              {plan.cta}
            </button>

            <div className="space-y-4">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-start gap-3">
                  <Check className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-600 leading-tight">{f}</span>
                </div>
              ))}
              {plan.notIncluded.map((f, j) => (
                <div key={j} className="flex items-start gap-3 opacity-30">
                  <X className="text-gray-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-400 leading-tight line-through">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F28C28] rounded-full blur-[120px] opacity-10" />
        <h2 className="text-3xl font-bold text-white mb-6">Need custom data for your industry?</h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">We provide bespoke AI implementation maps and vendor audits for large-scale enterprise environments.</p>
        <button className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all">
          Talk to an Analyst
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
