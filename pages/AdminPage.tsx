
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, Users, FileText, Settings, 
  MessageSquare, ShieldCheck, TrendingUp, AlertCircle 
} from 'lucide-react';
import { useStore } from '../store';

const AdminPage = () => {
  const { user, agents } = useStore();

  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  const stats = [
    { label: 'Active Users', value: '1,248', growth: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Total Agents', value: agents.length.toString(), growth: '+2', icon: FileText, color: 'text-[#F28C28]' },
    { label: 'Reviews Today', value: '84', growth: '+24%', icon: MessageSquare, color: 'text-green-600' },
    { label: 'Reported Tools', value: '3', icon: AlertCircle, color: 'text-red-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-[#F28C28] rounded-xl flex items-center justify-center text-white shadow-lg">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Admin Headquarters</h1>
          <p className="text-gray-500 font-medium text-sm">System status: All systems operational</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-3xl custom-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 bg-gray-50 ${s.color} rounded-xl`}>
                <s.icon className="w-5 h-5" />
              </div>
              {s.growth && <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{s.growth}</span>}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] custom-shadow border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recently Added Agents</h3>
            <button className="text-[#F28C28] font-bold text-sm hover:underline">Manage All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F5F0E6] text-[10px] uppercase tracking-widest font-bold text-gray-400">
                <tr>
                  <th className="px-8 py-4">Name</th>
                  <th className="px-8 py-4">Field</th>
                  <th className="px-8 py-4">Rating</th>
                  <th className="px-8 py-4">Pricing</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {agents.slice(0, 5).map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 font-bold text-sm text-gray-900">{a.name}</td>
                    <td className="px-8 py-5 text-xs text-gray-500">{a.field}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1 text-xs font-bold text-yellow-600">
                        <TrendingUp className="w-3 h-3" /> {a.rating}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2 py-0.5 bg-[#F5F0E6] text-gray-600 text-[10px] rounded font-bold">{a.pricing}</span>
                    </td>
                    <td className="px-8 py-5">
                      <button className="text-xs font-bold text-blue-500 hover:text-blue-700">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] custom-shadow border border-gray-100">
          <h3 className="text-lg font-bold mb-8">System Analytics</h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Platform Traffic</div>
              <div className="h-24 bg-[#F5F0E6] rounded-2xl flex items-end gap-1 p-4">
                {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-grow bg-[#F28C28]/20 rounded-t-sm relative group cursor-help">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${h}%` }} 
                      className="bg-[#F28C28] rounded-t-sm absolute bottom-0 left-0 right-0 group-hover:bg-orange-600 transition-colors" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-50">
              <h4 className="text-sm font-bold mb-4">Maintenance Tasks</h4>
              <div className="space-y-3">
                {[
                  { task: 'Verify 12 user reviews', priority: 'High' },
                  { task: 'Update Pricing for CodeWhisperer', priority: 'Medium' },
                  { task: 'Approve new "HR" field icons', priority: 'Low' }
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-medium text-gray-700">{t.task}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      t.priority === 'High' ? 'bg-red-100 text-red-600' : 
                      t.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-500'
                    }`}>{t.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
