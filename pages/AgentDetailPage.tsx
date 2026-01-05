
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, ExternalLink, Bookmark, CheckCircle2,
  ArrowLeft, Share2, MessageSquare, Info, Send
} from 'lucide-react';
import { useStore } from '../store';

const AgentDetailPage = () => {
  const { id } = useParams();
  const { agents, savedTools, saveTool, removeTool, reviews, addReview, user } = useStore();
  const agent = agents.find(a => a.id === id);
  const isSaved = !!savedTools.find(t => t.agentId === id);

  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  if (!agent) return <div className="text-center py-20">Agent not found</div>;

  const agentReviews = reviews.filter(r => r.agentId === id);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    handleReview(newReview.rating, newReview.comment);
    setNewReview({ rating: 5, comment: '' });
  };

  const handleReview = (rating: number, comment: string) => {
    if (user) {
      addReview({
        agentId: agent.id,
        userName: user.email.split('@')[0], // Simple username from email
        rating,
        comment
      });
    }
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      <Link to="/directory" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#F28C28] mb-12 font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-[#F28C28]/10 text-[#F28C28] rounded-full text-xs font-bold uppercase tracking-widest">{agent.field}</span>
              <div className="flex items-center gap-1 text-sm font-bold bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {agent.rating} ({agent.reviewsCount} reviews)
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{agent.name}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">{agent.shortDescription}</p>
            <div className="flex gap-4">
              <button
                onClick={() => isSaved ? removeTool(agent.id) : saveTool(agent.id)}
                className={`flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${isSaved ? 'bg-gray-900 text-white' : 'bg-[#F28C28] text-white hover:bg-[#D97706]'
                  }`}
              >
                {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                {isSaved ? 'Saved to Dashboard' : 'Save Agent'}
              </button>
              <a href={agent.toolLink} target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-gray-100 p-4 rounded-2xl text-gray-700 hover:border-[#F28C28] transition-all">
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-10 rounded-[2.5rem] custom-shadow border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Info className="text-[#F28C28] w-6 h-6" /> Deep Dive
            </h3>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              {agent.longDescription}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {agent.useCases.map((useCase, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-[#F5F0E6] rounded-2xl border border-gray-100">
                  <div className="mt-1 w-5 h-5 bg-[#F28C28] rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-white w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Reviews */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
              <h3 className="text-2xl font-bold">Professional Feedback</h3>
              <span className="text-sm font-bold text-gray-400">{agentReviews.length} Verified Reviews</span>
            </div>

            {/* Review Form */}
            {user ? (
              <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                <h4 className="font-bold text-sm mb-4">Leave a review as {user.email}</h4>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience with this tool..."
                  className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#F28C28] focus:ring-1 focus:ring-[#F28C28] outline-none min-h-[100px] mb-4 text-sm"
                  required
                />
                <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <Send className="w-4 h-4" /> Post Review
                </button>
              </form>
            ) : (
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 text-center">
                <p className="text-gray-500 text-sm mb-4">Sign in to share your experience with {agent.name}.</p>
                <Link to="/login" className="inline-block bg-[#F28C28] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#D97706] transition-colors">Login to Review</Link>
              </div>
            )}

            <div className="space-y-4">
              {agentReviews.length > 0 ? (
                agentReviews.map((r, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={r.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 custom-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                        {r.userName.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{r.userName}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, starsIdx) => (
                            <Star key={starsIdx} className={`w-3 h-3 ${starsIdx < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="ml-auto text-[10px] font-bold text-gray-300">
                        {new Date(r.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic">"{r.comment}"</p>
                  </motion.div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm">No reviews yet. Be the first to review!</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] custom-shadow border border-gray-100 sticky top-28">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Agent Stats</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Pricing Plan</span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${agent.pricing === 'Free' ? 'bg-green-100 text-green-600' :
                    agent.pricing === 'Freemium' ? 'bg-blue-100 text-blue-600' :
                      'bg-orange-100 text-[#F28C28]'
                  }`}>{agent.pricing}</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Platform</span>
                <span className="text-gray-900 font-bold">Cloud/API</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Trust Score</span>
                <span className="text-[#F28C28] font-bold">A+ (Verified)</span>
              </div>
            </div>
            <Link to="/pricing" className="mt-10 block text-center w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all">
              Upgrade to navAI Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;
