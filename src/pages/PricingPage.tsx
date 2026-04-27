
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Target, Rocket, Sparkles, ChevronRight, ArrowRight, ShieldCheck, Calculator, LifeBuoy, Plus, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';

const PricingPage = () => {
  const plans = [
    {
      id: 'explorer',
      name: 'Explorer',
      badge: 'Discovery Node',
      price: '$0',
      period: 'Forever',
      description: 'Perfect for professionals just beginning their AI journey.',
      features: [
        'Access to full Assistant Library',
        'Save up to 3 AI assistants',
        'Basic Career Path discovery',
        'Community trust scores',
        'Personal workspace (Basic)'
      ],
      cta: 'Begin Discovery',
      popular: false,
      color: 'bg-white text-gray-900 border-gray-100'
    },
    {
      id: 'pioneer',
      name: 'Pioneer',
      badge: 'Performance Hub',
      price: '$19',
      period: 'Monthly',
      description: 'For active professionals needing daily strategic optimization.',
      features: [
        'Everything in Explorer',
        'Unlimited saved assistants',
        'ROI & Efficiency Yield calculator',
        'Priority Career Path mapping',
        'Early access to new registrations',
        'Custom roadmap tips'
      ],
      cta: 'Go Pioneer',
      popular: true,
      color: 'bg-gray-900 text-white border-transparent shadow-2xl shadow-gray-400'
    },
    {
      id: 'navigator',
      name: 'Navigator',
      badge: 'Enterprise Logic',
      price: '$49',
      period: 'Monthly',
      description: 'Elite solutions for strategic leaders and scale-ups.',
      features: [
        'Everything in Pioneer',
        'Custom AI Strategy sessions',
        'Team Management Hub',
        'Bulk assistant licensing assistance',
        'Dedicated strategy expert',
        'Priority 24/7 client success'
      ],
      cta: 'Become Navigator',
      popular: false,
      color: 'bg-white text-gray-900 border-[#F28C28]/20'
    }
  ];

  return (
    <div className="py-12 md:py-16 px-6 max-w-7xl mx-auto font-sans">
      <SectionHeader
        badge="Strategic Access"
        title="Predictable Pricing"
        subtitle="Fuel your professional growth with the right discovery tier. No hidden complexity."
      />

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-10 rounded-[4rem] border flex flex-col ${plan.color}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#F28C28] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                Strategic Selection
              </div>
            )}

            <div className="mb-10 text-center">
              <div className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${plan.popular ? 'bg-white/10 text-[#F28C28]' : 'bg-gray-50 text-gray-400'}`}>
                {plan.badge}
              </div>
              <h3 className="text-4xl font-black tracking-tighter mb-2 leading-none">{plan.name}</h3>
              <p className={`text-sm font-medium leading-relaxed ${plan.popular ? 'text-gray-400' : 'text-gray-400'}`}>{plan.description}</p>
            </div>

            <div className="mb-12 text-center pb-12 border-b border-gray-100/10">
              <div className="flex items-end justify-center gap-1">
                <span className="text-6xl font-black tracking-tighter leading-none">{plan.price}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest leading-none pb-2 ${plan.popular ? 'text-gray-500' : 'text-gray-300'}`}>{plan.id === 'explorer' ? 'Forever' : '/ month'}</span>
              </div>
            </div>

            <ul className="space-y-6 mb-12 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-4 group">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${plan.popular ? 'bg-[#F28C28] text-white' : 'bg-gray-900 text-white'}`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform ${plan.popular ? 'text-gray-200' : 'text-gray-900'}`}>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to={`/checkout/${plan.id}`}
              className={`w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-center transition-all shadow-2xl ${plan.popular
                  ? 'bg-[#F28C28] text-white hover:bg-white hover:text-gray-900'
                  : 'bg-gray-900 text-white hover:bg-[#F28C28]'
                }`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Trust & FAQ Preview */}
      <div className="bg-white rounded-[4rem] p-12 md:p-16 custom-shadow shadow-sm border border-gray-100">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter leading-none">Frequently Handled Questions</h2>
            <div className="space-y-6">
              {[
                { q: 'Can I switch plans anytime?', a: 'Yes, our platform is flexible. Upgrade or shift nodes whenever your professional needs change.' },
                { q: 'Is there a limit on ROI tracking?', a: 'Pioneer and Navigator tiers have full visual output tracking for all saved tools.' }
              ].map((faq, i) => (
                <div key={i} className="group">
                  <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-3">
                    <Plus className="w-4 h-4 text-[#F28C28]" /> {faq.q}
                  </h4>
                  <p className="text-gray-400 font-medium text-sm leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Verified Integrity', icon: ShieldCheck },
              { label: 'Expert Support', icon: LifeBuoy },
              { label: 'Strategic ROI', icon: Calculator },
              { label: 'Global Access', icon: Globe }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-[3rem] text-center group hover:bg-white hover:shadow-xl hover:border-gray-50 border border-transparent transition-all">
                <item.icon className="w-8 h-8 text-[#F28C28] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-[9px] font-black text-gray-900 uppercase tracking-widest leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
