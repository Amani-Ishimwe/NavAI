import React from 'react';
import {
  ArrowRight, Shield, Zap, Target, Star,
  MessageSquare, UserCheck, Play, Sparkles,
  ChevronRight, Compass, ShieldCheck, Globe,
  Settings, Database, Cpu, Activity, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

const LandingPage = () => {
  const { agents } = useStore();
  const featuredAgents = agents.filter(a => a.featured).slice(0, 3);

  return (
    <div className="overflow-hidden bg-white">
      {/* Static Hero Section */}
      <section className="relative min-h-[85vh] flex items-center px-6 py-12 md:py-20 border-b border-gray-50">
        <div className="absolute inset-0 bg-white -z-20" />
        <div className="absolute top-0 right-0 w-[55%] h-[100%] bg-gradient-to-l from-[#F28C28]/5 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">
          <div
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 bg-gray-900 text-[#F28C28] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8">
              <Compass className="w-3.5 h-3.5" /> Elite Discovery Node
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 tracking-tighter leading-[0.85] mb-8">
              Master Your <br /> Field with <span className="text-[#F28C28]">AI Excellence.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mb-12 leading-relaxed">
              Stop searching. Start deploying. We vet and curate the world's most effective AI assistants, tailored precisely for your <span className="text-gray-900 font-black underline decoration-[#F28C28] decoration-4 underline-offset-4">professional discipline.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/fields" className="bg-gray-900 text-white px-12 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#F28C28] transition-all flex items-center justify-center gap-3 shadow-3xl shadow-gray-200">
                Begin Discovery <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/membership" className="bg-white border border-gray-100 text-gray-400 px-12 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all flex items-center justify-center custom-shadow">
                View Membership
              </Link>
            </div>

            <div className="mt-16 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-gray-100 border-4 border-white flex items-center justify-center text-[10px] font-black text-gray-400 shadow-sm relative">
                    P{i}
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] leading-loose">
                Trusted by high-output professionals in <br />
                <span className="text-gray-900 font-black text-opacity-80">Design, Finance, Law, and Technology.</span>
              </div>
            </div>
          </div>

          {/* Static Professional Visual */}
          <div
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="bg-white p-12 rounded-[4.5rem] shadow-3xl border border-gray-50 flex flex-col gap-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F28C28]/10 rounded-full blur-3xl -z-10" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-900 rounded-3xl flex items-center justify-center text-[#F28C28] shadow-2xl">
                    <Star className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Quality Standard</div>
                    <div className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Status: Human Verified</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {[
                  { label: 'Professional Alignment', val: 98, color: 'bg-green-500' },
                  { label: 'Ease of Use', val: 100, color: 'bg-[#F28C28]' },
                  { label: 'Verified Reliability', val: 96, color: 'bg-gray-900' }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <span>{item.label}</span>
                      <span className="text-gray-900">{item.val}%</span>
                    </div>
                    <div className="bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-50 flex justify-between items-center text-[9px] font-black text-gray-300 uppercase tracking-widest">
                <span>VERIFIED REGISTRY</span>
                <span className="text-gray-900">2026 EDITION</span>
              </div>
            </div>

            {/* Floating Data Badge */}
            <div className="absolute -bottom-8 -left-8 bg-gray-900 text-white p-8 rounded-[3rem] shadow-3xl z-20 max-w-[200px]">
              <div className="text-[28px] font-black tracking-tighter mb-1 leading-none">0%</div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">Technical friction for <br /> our active members.</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Discovery Path - Human Centric */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-[10px] font-black text-[#F28C28] uppercase tracking-[0.4em] mb-4">The Journey</div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-6">How You Evolve.</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto text-base leading-relaxed">No code, no technical hurdles. Just a refined path to your new professional competitive advantage.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="bg-gray-50 p-12 rounded-[4rem] border border-gray-100 flex flex-col items-center text-center relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-900 mb-8 shadow-sm group-hover:bg-gray-900 group-hover:text-[#F28C28] transition-all">
                <Target className="w-10 h-10" />
              </div>
              <h4 className="text-[10px] font-black text-[#F28C28] uppercase tracking-[0.3em] mb-3">Step 01</h4>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">Choose Your Field</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">Navigate through 30+ curated professional disciplines. We have already done the vetting for you.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-900 p-12 rounded-[4rem] flex flex-col items-center text-center relative group shadow-3xl">
              <div className="w-20 h-20 bg-[#F28C28] rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h4 className="text-[10px] font-black text-[#F28C28]/60 uppercase tracking-[0.3em] mb-3">Step 02</h4>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">Select Your Elite Ally</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">Detailed profiles and real-world performance metrics help you choose the assistant that matches your workflow.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 p-12 rounded-[4rem] border border-gray-100 flex flex-col items-center text-center relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-900 mb-8 shadow-sm group-hover:bg-gray-900 group-hover:text-[#F28C28] transition-all">
                <Zap className="w-10 h-10" />
              </div>
              <h4 className="text-[10px] font-black text-[#F28C28] uppercase tracking-[0.3em] mb-3">Step 03</h4>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">Scale Your Output</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">Integrate your chosen tools instantly. Watch your professional scale grow while your effort remains focused.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vetting Standard - Human Centric Data */}
      <section className="py-24 bg-gray-50 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-20">
            <div className="text-center md:text-left">
              <div className="text-[10px] font-black text-[#F28C28] uppercase tracking-[0.4em] mb-4">Quality Assurance</div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">Expert <br /> Vetting.</h2>
            </div>
            <div className="grid grid-cols-2 gap-10 text-center md:text-left">
              <div>
                <div className="text-4xl font-black text-gray-900 mb-1 tracking-tighter">100%</div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Human Vetted</div>
              </div>
              <div>
                <div className="text-4xl font-black text-gray-900 mb-1 tracking-tighter">Top 1%</div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Agent Selection</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Strategic Fit', val: 'Primary', desc: 'Every tool is matched to professional outcomes.' },
              { label: 'Security Audit', val: 'Verified', desc: 'Comprehensive data safety and privacy checks.' },
              { label: 'Ease of Access', val: 'Tier 1', desc: 'No technical setup required to begin using.' },
              { label: 'Ongoing Review', val: 'Active', desc: 'Weekly performance audits for every assistant.' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 space-y-4 shadow-sm">
                <div className="text-2xl font-black text-[#F28C28] tracking-tighter">{stat.val}</div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1">{stat.label}</h4>
                  <p className="text-gray-400 text-[12px] font-medium leading-snug">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Symbols */}
      <section className="py-12 bg-gray-50 mt-[-2px]">
        <div className="max-w-7xl mx-auto px-6 border-y border-gray-200/50 py-10 overflow-hidden relative">
          <div className="flex animate-marquee gap-20 whitespace-nowrap">
            {['PROFESSIONAL CAREER HUB', 'AI STRATEGY NODE', 'EFFICIENCY PROTOCOL', 'DISCOVERY ENGINE', 'ELITE PERFORMANCE', 'CAREER ACCELERATOR'].map((s, i) => (
              <span key={i} className="text-[11px] font-black text-gray-300 uppercase tracking-[0.6em]">{s}</span>
            ))}
            {['PROFESSIONAL CAREER HUB', 'AI STRATEGY NODE', 'EFFICIENCY PROTOCOL', 'DISCOVERY ENGINE', 'ELITE PERFORMANCE', 'CAREER ACCELERATOR'].map((s, i) => (
              <span key={i + 10} className="text-[11px] font-black text-gray-300 uppercase tracking-[0.6em]">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Redesigned */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-[10px] font-black text-[#F28C28] uppercase tracking-[0.4em] mb-4">The Stream Advantage</div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6 leading-none">Why Experts <br /> Choose Stream.</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto text-base leading-relaxed">Integrated intelligence is the new standard. We provide the clarity you need to stay ahead.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'Expert Curation', desc: 'Direct access to a vault of AI tools vetted by industry veterans, not marketing algorithms.', icon: Target },
              { title: 'Proven Results', desc: 'Real success cases and deployment strategies from leaders in Design, Law, and Tech.', icon: ShieldCheck },
              { title: 'Rapid Adoption', desc: 'Reduce the time between discovery and mastery. Use the right tools the first time.', icon: Zap },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-gray-50/50 p-12 rounded-[3.5rem] border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-700"
              >
                <div className="w-16 h-16 bg-white custom-shadow rounded-2xl flex items-center justify-center mb-10">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-tight uppercase">{f.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed text-[15px]">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Elite Tactics Sub-section */}
          <div className="bg-gray-900 rounded-[4rem] p-12 text-white">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { tactic: 'The Morning Audit', desc: 'Quickly identify manual tasks that can be handled by AI in minutes.' },
                { tactic: 'Parallel Adoption', desc: 'Begin using AI alongside your current methods with zero risk.' },
                { tactic: 'Feedback Integration', desc: 'Constantly refine your AI toolset based on your professional growth.' }
              ].map((t, i) => (
                <div key={i} className="border-l border-white/10 pl-8">
                  <div className="text-[#F28C28] text-[9px] font-black uppercase tracking-[0.3em] mb-2">Pillar 0{i + 1}</div>
                  <h4 className="text-xl font-black mb-3 tracking-tight">{t.tactic}</h4>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Showcases */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 px-4">
            <div>
              <div className="text-[10px] font-black text-[#F28C28] uppercase tracking-[0.4em] mb-4">Featured Discovery</div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.85]">Professional <br /> Intelligence.</h2>
            </div>
            <Link to="/library" className="group flex items-center gap-4 text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] hover:text-[#F28C28] transition-colors">
              Access Full Registry <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {featuredAgents.map((agent) => (
              <Link to={`/assistant/${agent.id}`} key={agent.id}>
                <div
                  className="bg-white rounded-[4rem] p-12 border border-transparent hover:border-[#F28C28]/20 transition-all duration-300 shadow-xl flex flex-col h-full"
                >
                  <div className="w-16 h-16 bg-[#F5F0E6] rounded-2xl flex items-center justify-center text-[#F28C28] mb-10 font-black text-2xl shadow-sm">
                    {agent.name[0]}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3 leading-none tracking-tighter">{agent.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">{agent.field}</div>
                    <div className="bg-[#F28C28]/10 text-[#F28C28] px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                      <UserCheck className="w-2.5 h-2.5 fill-[#F28C28]" /> User Friendly
                    </div>
                  </div>
                  <p className="text-gray-400 text-[15px] font-medium leading-relaxed mb-auto">{agent.shortDescription}</p>

                  <div className="mt-12 flex items-center justify-between border-t border-gray-50 pt-8">
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-900">
                      <Star className="w-4 h-4 text-[#F28C28] fill-[#F28C28]" /> {agent.rating}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900 rounded-[5rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-3xl">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-10">
                <Sparkles className="w-4 h-4 text-[#F28C28]" /> Career Catalyst
              </div>
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.85]">Evolve Your <br /> Value.</h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium mb-16 max-w-xl mx-auto leading-relaxed">Join thousands of high-output professionals. Access elite intelligence and expand your professional reach.</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link to="/signup" className="bg-[#F28C28] text-white px-14 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:text-gray-900 transition-all">
                  Join The Initiative
                </Link>
                <Link to="/fields" className="text-white hover:text-[#F28C28] text-[10px] font-black uppercase tracking-[0.3em] transition-all border-b border-white/10 hover:border-[#F28C28]">
                  Browse Pro Registry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
