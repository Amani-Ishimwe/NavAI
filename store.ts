
import { create } from 'zustand';
import { AIAgent, User, SavedTool, ToolStatus, Review } from './types';
import { MOCK_AGENTS, MOCK_REVIEWS } from './constants';

interface AppState {
  user: User | null;
  savedTools: SavedTool[];
  agents: AIAgent[];
  reviews: Review[];
  login: (email: string, role: 'user' | 'admin') => void;
  logout: () => void;
  saveTool: (agentId: string) => void;
  removeTool: (agentId: string) => void;
  updateToolStatus: (agentId: string, status: ToolStatus) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const STORAGE_KEY = 'navai_storage';

export const useStore = create<AppState>((set, get) => {
  // Try to rehydrate from localStorage
  const savedData = localStorage.getItem(STORAGE_KEY);
  const initialState = savedData ? JSON.parse(savedData) : {
    user: null,
    savedTools: [],
    agents: MOCK_AGENTS,
    reviews: MOCK_REVIEWS
  };

  // If rehydrated agents are missing (e.g. from old version), use MOCK_AGENTS
  if (!initialState.agents || initialState.agents.length === 0) {
    initialState.agents = MOCK_AGENTS;
  }
  // If rehydrated reviews are missing, use MOCK_REVIEWS
  if (!initialState.reviews || initialState.reviews.length === 0) {
    initialState.reviews = MOCK_REVIEWS;
  }

  const persist = (newState: Partial<AppState>) => {
    const current = { ...get(), ...newState };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      user: current.user,
      savedTools: current.savedTools,
      agents: current.agents,
      reviews: current.reviews
    }));
    set(newState);
  };

  return {
    ...initialState,
    login: (email, role) => persist({ user: { email, role } }),
    logout: () => persist({ user: null, savedTools: [] }),
    saveTool: (agentId) => {
      const { savedTools } = get();
      if (!savedTools.find(t => t.agentId === agentId)) {
        persist({
          savedTools: [...savedTools, { agentId, status: 'Trying', addedAt: new Date().toISOString() }]
        });
      }
    },
    removeTool: (agentId) => {
      persist({
        savedTools: get().savedTools.filter(t => t.agentId !== agentId)
      });
    },
    updateToolStatus: (agentId, status) => {
      persist({
        savedTools: get().savedTools.map(t =>
          t.agentId === agentId ? { ...t, status } : t
        )
      });
    },
    addReview: (reviewData) => {
      const newReview: Review = {
        ...reviewData,
        id: `rev-${Date.now()}`,
        date: new Date().toISOString()
      };
      const updatedReviews = [newReview, ...get().reviews];
      persist({ reviews: updatedReviews });

      // Also update agent stats
      const agent = get().agents.find(a => a.id === reviewData.agentId);
      if (agent) {
        const agentReviews = updatedReviews.filter(r => r.agentId === reviewData.agentId);
        const newRating = agentReviews.reduce((acc, r) => acc + r.rating, 0) / agentReviews.length;
        const updatedAgents = get().agents.map(a =>
          a.id === reviewData.agentId
            ? { ...a, rating: Number(newRating.toFixed(1)), reviewsCount: agentReviews.length }
            : a
        );
        persist({ agents: updatedAgents });
      }
    }
  };
});
