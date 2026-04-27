
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User as UserIcon, Shield, CreditCard, Bell,
    Settings as SettingsIcon, LogOut, ChevronRight,
    Sparkles, ShieldCheck, Mail, Lock, Smartphone,
    Zap, Compass, Target, Globe
} from 'lucide-react';
import { useStore } from '../store';
import { Navigate, Link } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';

const SettingsPage = () => {
    const { user, logout } = useStore();
    const [activeTab, setActiveTab] = useState<'profile' | 'membership' | 'security' | 'prefs'>('profile');

    if (!user) return <Navigate to="/login" />

    const tabs = [
        { id: 'profile', label: 'Identity', icon: UserIcon },
        { id: 'membership', label: 'Access', icon: Sparkles },
        { id: 'security', label: 'Trust', icon: Shield },
        { id: 'prefs', label: 'Logic', icon: SettingsIcon }
    ];

    return (
        <div className="py-12 md:py-16 px-6 max-w-7xl mx-auto font-sans">
            <SectionHeader
                badge="Account Operations"
                title="Settings Control"
                subtitle="Manage your professional identity and discovery parameters."
            />

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-6 rounded-[3rem] border border-gray-100 custom-shadow shadow-sm flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group ${activeTab === tab.id
                                        ? 'bg-gray-900 text-white shadow-xl shadow-gray-200'
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${activeTab === tab.id ? 'bg-[#F28C28] text-white' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-200'
                                    }`}>
                                    <tab.icon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${activeTab === tab.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-3 p-5 rounded-[2rem] bg-red-50 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                        <LogOut className="w-5 h-5" /> Deactivate Session
                    </button>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white p-10 md:p-12 rounded-[4rem] border border-gray-100 custom-shadow shadow-sm"
                            >
                                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Professional Identity</h3>
                                <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-10">Public information across the discovery hub.</p>

                                <div className="space-y-8">
                                    <div className="flex items-center gap-8 mb-12 p-6 bg-gray-50 rounded-[2.5rem]">
                                        <div className="w-20 h-20 bg-gray-900 text-[#F28C28] rounded-[2rem] flex items-center justify-center text-3xl font-black relative group">
                                            {user.email[0].toUpperCase()}
                                            <div className="absolute inset-0 bg-black/40 rounded-[2rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                                <SettingsIcon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-black text-gray-900 leading-none mb-1">{user.email.split('@')[0]}</div>
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{user.membership} Tier Member</div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Display Identification</label>
                                            <input type="text" defaultValue={user.email.split('@')[0]} className="w-full bg-gray-50 border-none rounded-xl py-5 px-6 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#F28C28]/10" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Communication Hub</label>
                                            <input type="email" defaultValue={user.email} className="w-full bg-gray-50 border-none rounded-xl py-5 px-6 font-bold text-gray-400 outline-none" disabled />
                                        </div>
                                    </div>

                                    <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F28C28] transition-all shadow-xl">Update Node</button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'membership' && (
                            <motion.div
                                key="membership"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white p-10 md:p-12 rounded-[4rem] border border-gray-100 custom-shadow shadow-sm"
                            >
                                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Access Management</h3>
                                <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-10">Current platform discovery tier.</p>

                                <div className="bg-gray-900 rounded-[3rem] p-10 text-white mb-10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#F28C28] rounded-full blur-[80px] opacity-10" />
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="p-4 bg-white/10 rounded-2xl">
                                            <Zap className="w-8 h-8 text-[#F28C28]" />
                                        </div>
                                        <span className="bg-[#F28C28] text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">Live Sync</span>
                                    </div>
                                    <h4 className="text-3xl font-black tracking-tight mb-2 leading-none">{user.membership.toUpperCase()} HUB</h4>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed mb-10">Your next renewal node is scheduled for January 24th, 2026.</p>

                                    <Link to="/membership" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F28C28] hover:text-white transition-all">Optimize Access Level</Link>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-between group">
                                        <div>
                                            <div className="text-[10px] font-black text-gray-900 tracking-tight leading-none mb-1">Billing Protocol</div>
                                            <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Mastercard •••• 4242</div>
                                        </div>
                                        <CreditCard className="w-6 h-6 text-gray-300 group-hover:text-gray-900 transition-colors" />
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-between group">
                                        <div>
                                            <div className="text-[10px] font-black text-gray-900 tracking-tight leading-none mb-1">Receipt Hub</div>
                                            <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">History Log</div>
                                        </div>
                                        <Mail className="w-6 h-6 text-gray-300 group-hover:text-gray-900 transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white p-10 md:p-12 rounded-[4rem] border border-gray-100 custom-shadow shadow-sm"
                            >
                                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Trust Protocols</h3>
                                <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-10">Secure your professional discovery node.</p>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                <ShieldCheck className="w-6 h-6 text-green-500" />
                                            </div>
                                            <div>
                                                <div className="text-base font-black text-gray-900 tracking-tight leading-none">Two-Factor Authentication</div>
                                                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">High-Security Layer Enabled</div>
                                            </div>
                                        </div>
                                        <button className="text-[9px] font-black text-[#F28C28] uppercase tracking-widest">Disable</button>
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                <Lock className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <div>
                                                <div className="text-base font-black text-gray-900 tracking-tight leading-none">Global Password Protocol</div>
                                                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Last Updated 4 Months Ago</div>
                                            </div>
                                        </div>
                                        <button className="text-[9px] font-black text-gray-900 uppercase tracking-widest underline">Update</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'prefs' && (
                            <motion.div
                                key="prefs"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white p-10 md:p-12 rounded-[4rem] border border-gray-100 custom-shadow shadow-sm"
                            >
                                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Platform Logic</h3>
                                <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-10">Customize your discovery experience.</p>

                                <div className="space-y-6">
                                    {[
                                        { label: 'Discovery Mode', desc: 'Prioritize new and untested AI assistants.', icon: Compass },
                                        { label: 'Intelligence Sync', desc: 'Real-time notifications for agent status changes.', icon: Bell },
                                        { label: 'Global Ranking', desc: 'Visibility in the global professional leaderboard.', icon: Globe }
                                    ].map((pref, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-gray-900 group-hover:text-[#F28C28] transition-all">
                                                    <pref.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-base font-black text-gray-900 tracking-tight leading-none mb-1">{pref.label}</div>
                                                    <div className="text-[10px] font-medium text-gray-400 leading-tight uppercase tracking-widest max-w-[200px]">{pref.desc}</div>
                                                </div>
                                            </div>
                                            <motion.div className="w-12 h-6 bg-gray-900 rounded-full p-1 cursor-pointer">
                                                <div className="w-4 h-4 bg-[#F28C28] rounded-full translate-x-6" />
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
