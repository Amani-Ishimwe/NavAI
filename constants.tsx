
import React from 'react';
import { 
  Code, Palette, Layout, Database, BrainCircuit, ShieldCheck, 
  Cloud, Link, Stethoscope, Scale, Banknote, Rocket, Megaphone, 
  PenTool, GraduationCap, Users, ShoppingCart, Headset, Settings, Leaf 
} from 'lucide-react';
import { AIAgent, Field, Review } from './types';

export const FIELDS: Field[] = [
  { id: 'dev', name: 'Software Development', icon: 'Code', description: 'AI for coding, testing, and deployment.' },
  { id: 'uiux', name: 'UI/UX Design', icon: 'Layout', description: 'Design automation and user research.' },
  { id: 'graphic', name: 'Graphic Design', icon: 'Palette', description: 'Generative art and asset creation.' },
  { id: 'data', name: 'Data Science', icon: 'Database', description: 'Predictive modeling and analytics.' },
  { id: 'aiml', name: 'AI & Machine Learning', icon: 'BrainCircuit', description: 'Model training and fine-tuning.' },
  { id: 'cyber', name: 'Cybersecurity', icon: 'ShieldCheck', description: 'Threat detection and security auditing.' },
  { id: 'cloud', name: 'Cloud & DevOps', icon: 'Cloud', description: 'Infrastructure and automation.' },
  { id: 'web3', name: 'Blockchain & Web3', icon: 'Link', description: 'Smart contracts and dApps.' },
  { id: 'health', name: 'Healthcare', icon: 'Stethoscope', description: 'Diagnosis and medical research.' },
  { id: 'legal', name: 'Legal', icon: 'Scale', description: 'Document analysis and research.' },
  { id: 'fin', name: 'Finance', icon: 'Banknote', description: 'Algorithmic trading and budgeting.' },
  { id: 'biz', name: 'Business & Startups', icon: 'Rocket', description: 'Strategy and operations.' },
  { id: 'mkt', name: 'Marketing', icon: 'Megaphone', description: 'Campaigns and SEO.' },
  { id: 'write', name: 'Content & Writing', icon: 'PenTool', description: 'Copywriting and storytelling.' },
  { id: 'edu', name: 'Education', icon: 'GraduationCap', description: 'Personalized learning and tutoring.' },
  { id: 'hr', name: 'HR', icon: 'Users', description: 'Recruitment and management.' },
  { id: 'sales', name: 'Sales', icon: 'ShoppingCart', description: 'Lead gen and outreach.' },
  { id: 'cs', name: 'Customer Support', icon: 'Headset', description: 'Chatbots and ticket resolution.' },
  { id: 'eng', name: 'Engineering', icon: 'Settings', description: 'CAD and industrial automation.' },
  { id: 'climate', name: 'Climate Tech', icon: 'Leaf', description: 'Sustainability and monitoring.' },
];

// Helper to generate consistent pseudo-random numbers
const seededRandom = (seed: number) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

const generateMockData = () => {
    const agents: AIAgent[] = [];
    const reviews: Review[] = [];
    
    FIELDS.forEach((field, fieldIdx) => {
        // Generate 40 agents per field
        for (let i = 0; i < 40; i++) {
            const seed = fieldIdx * 100 + i;
            const id = `${field.id}-${i}`;
            const isFeatured = seededRandom(seed) > 0.9; // 10% featured
            const pricingType = seededRandom(seed + 1) > 0.6 ? 'Paid' : (seededRandom(seed + 1) > 0.3 ? 'Freemium' : 'Free');
            const rating = 3.5 + (seededRandom(seed + 2) * 1.5); // 3.5 to 5.0
            
            const suffixes = ['AI', 'Bot', 'Gen', 'Flow', 'Minds', 'Sync', 'Pilot', 'Engine', 'Brain', 'Logic'];
            const name = `${field.name.split(' ')[0]}${suffixes[Math.floor(seededRandom(seed + 3) * suffixes.length)]} ${i + 1}`;
            
            agents.push({
                id,
                name,
                field: field.name,
                shortDescription: `Advanced AI solution for ${field.name.toLowerCase()} tasks and workflows.`,
                longDescription: `This ${pricingType.toLowerCase()} tool leverages state-of-the-art models to revolutionize how professionals in ${field.name} work. It features seamless integration, real-time analysis, and enterprise-grade security. Perfect for teams looking to scale their ${field.name.toLowerCase()} operations efficiently.`,
                useCases: [
                    'Automated workflow optimization',
                    'Real-time data analysis',
                    'Predictive modeling',
                    'Collaborative workspace integration'
                ],
                pricing: pricingType,
                rating: Number(rating.toFixed(1)),
                reviewsCount: Math.floor(seededRandom(seed + 4) * 500) + 10,
                tags: [field.name.split(' ')[0], 'Productivity', 'Automation'],
                toolLink: 'https://example.com',
                featured: isFeatured
            });

            // Generate 3-8 reviews per agent
            const reviewCount = Math.floor(seededRandom(seed + 5) * 5) + 3;
            for (let r = 0; r < reviewCount; r++) {
                reviews.push({
                    id: `rev-${id}-${r}`,
                    agentId: id,
                    userName: `User ${Math.floor(seededRandom(seed + r) * 1000)}`,
                    rating: Math.floor(seededRandom(seed + r + 10) * 2) + 4, // 4 or 5 stars mostly
                    comment: seededRandom(seed + r) > 0.5 
                        ? "Great tool, really helped speed up our workflow!" 
                        : "Good features but the UI could be improved.",
                    date: new Date(2023, 0, 1).toISOString() // simplistic date
                });
            }
        }
    });
    
    return { agents, reviews };
};

const { agents: GENERATED_AGENTS, reviews: GENERATED_REVIEWS } = generateMockData();

export const MOCK_AGENTS = GENERATED_AGENTS;
export const MOCK_REVIEWS = GENERATED_REVIEWS;

export const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Code, Palette, Layout, Database, BrainCircuit, ShieldCheck, 
    Cloud, Link, Stethoscope, Scale, Banknote, Rocket, Megaphone, 
    PenTool, GraduationCap, Users, ShoppingCart, Headset, Settings, Leaf
  };
  const IconComp = icons[iconName] || Settings;
  return <IconComp className="w-6 h-6" />;
};
