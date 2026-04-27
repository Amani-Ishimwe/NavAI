
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CreditCard, Shield, Lock, CheckCircle2,
    ArrowRight, Landmark, Smartphone, Globe,
    ShieldCheck, ArrowLeft, Target, Sparkles
} from 'lucide-react';
import { useStore } from '../store';

const CheckoutPage = () => {
    const { planId } = useParams<{ planId: string }>();
    const navigate = useNavigate();
    const { user, updateMembership } = useStore();
    const [method, setMethod] = useState<'card' | 'momo' | 'bank'>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const planNames: Record<string, string> = {
        explorer: 'Explorer Node',
        pioneer: 'Pioneer Hub',
        navigator: 'Navigator Elite'
    };

    const planPrices: Record<string, string> = {
        explorer: '0',
        pioneer: '19',
        navigator: '49'
    };

    const currentPlan = planId || 'pioneer';

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment protocol
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            updateMembership(currentPlan as any);

            setTimeout(() => {
                navigate('/workspace');
            }, 3000);
        }, 2500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 md:p-16 rounded-[4rem] custom-shadow shadow-sm border border-gray-50 text-center max-w-lg w-full"
                >
                    <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-green-100">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter leading-none">Protocol Confirmed</h2>
                    <p className="text-gray-400 font-medium text-lg mb-12 leading-relaxed">Your professional status has been updated to <span className="text-gray-900 font-black uppercase text-sm tracking-widest">{currentPlan}</span>.</p>
                    <div className="flex items-center justify-center gap-3 text-[10px] font-black text-gray-300 uppercase tracking-widest animate-pulse">
                        Redirecting to your Workspace Hub <div className="w-4 h-4 rounded-full border-2 border-[#F28C28] border-t-transparent animate-spin" />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="py-12 md:py-20 px-6 max-w-7xl mx-auto font-sans">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest mb-12 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to plans
            </button>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Main Checkout Form */}
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-10 md:p-12 rounded-[4rem] custom-shadow shadow-sm border border-gray-50"
                    >
                        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight leading-none">Confirm Selection</h2>
                        <p className="text-gray-400 font-medium mb-12 text-sm uppercase tracking-widest">Global Secure Payment Protocol</p>

                        <div className="flex gap-4 mb-12">
                            {[
                                { id: 'card', name: 'Global Card', icon: CreditCard },
                                { id: 'momo', name: 'Mobile Money', icon: Smartphone },
                                { id: 'bank', name: 'Direct Bank', icon: Landmark }
                            ].map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => setMethod(m.id as any)}
                                    className={`flex-grow p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-3 group ${method === m.id ? 'bg-gray-900 border-transparent text-white shadow-xl shadow-gray-200' : 'bg-white border-gray-100 text-gray-400 hover:border-[#F28C28]'}`}
                                >
                                    <m.icon className={`w-6 h-6 transition-all ${method === m.id ? 'text-[#F28C28]' : 'group-hover:text-gray-900'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{m.name}</span>
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handlePayment} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Identity Details</label>
                                <input
                                    required
                                    type="email"
                                    defaultValue={user?.email}
                                    placeholder="professional@email.com"
                                    className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10"
                                />
                            </div>

                            {method === 'card' && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Secure Card Input</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full bg-gray-50 border-none rounded-2xl py-6 px-14 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10"
                                            />
                                            <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <input required type="text" placeholder="MM/YY" className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10" />
                                        <input required type="text" placeholder="CVV" className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10" />
                                    </div>
                                </div>
                            )}

                            <button
                                disabled={isProcessing}
                                className="w-full py-6 bg-gray-900 text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#F28C28] transition-all shadow-3xl shadow-gray-300 disabled:opacity-50 group"
                            >
                                {isProcessing ? (
                                    <>Processing Protocol <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /></>
                                ) : (
                                    <>Verify and Deploy <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 flex items-center justify-center gap-8 text-gray-300">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Encrypted</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4 text-[#F28C28]" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Private Node</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-blue-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Global Support</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Checkout Summary Sidebar */}
                <div className="lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-900 rounded-[4rem] p-10 md:p-12 text-white relative shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F28C28] rounded-full blur-[100px] opacity-10" />
                        <h3 className="text-[11px] font-black text-[#F28C28] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                            <Target className="w-5 h-5" /> Summary Node
                        </h3>

                        <div className="space-y-10">
                            <div className="flex justify-between items-start pb-10 border-b border-white/5">
                                <div>
                                    <div className="text-3xl font-black tracking-tighter mb-1 leading-none">{planNames[currentPlan]}</div>
                                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Discovery Tier</div>
                                </div>
                                <div className="text-3xl font-black tracking-tighter text-[#F28C28] leading-none">${planPrices[currentPlan]}</div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Interval Processing</span>
                                    <span className="text-white">Monthly Cycle</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Strategic ROI Hub</span>
                                    <span className="text-white">Included</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Tax Logic (VAT)</span>
                                    <span className="text-white">$0.00</span>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-white/10 flex justify-between items-end">
                                <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest leading-none pb-2">Platform Total</span>
                                <span className="text-6xl font-black tracking-tighter leading-none">${planPrices[currentPlan]}</span>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 group cursor-help transition-all hover:bg-white/10">
                            <div className="flex items-center gap-4 mb-3">
                                <Sparkles className="w-6 h-6 text-[#F28C28]" />
                                <div className="text-sm font-black tracking-tight leading-none uppercase">Navigator Guarantee</div>
                            </div>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-widest">Join the top 10% of efficiency-ready professionals globally.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
