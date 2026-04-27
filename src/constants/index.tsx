
import React from 'react';
import {
    Code, Palette, Layout, Database, BrainCircuit, ShieldCheck,
    Cloud, Link, Stethoscope, Scale, Banknote, Rocket, Megaphone,
    PenTool, GraduationCap, Users, ShoppingCart, Headset, Settings, Leaf,
    Microscope, Camera, Music, Globe2, Briefcase, Zap, Heart, Coffee, Gem,
    LineChart, MessageSquare, Anchor
} from 'lucide-react';
import { AIAgent, Field, Review } from '../types';

export const FIELDS: Field[] = [
    { id: 'dev', name: 'Software Development', icon: 'Code', description: 'Master the art of logic and building digital infrastructure with specialized coding companions.' },
    { id: 'uiux', name: 'UI/UX Design', icon: 'Layout', description: 'Design human-centric experiences using automation and intelligent user research tools.' },
    { id: 'graphic', name: 'Visual Arts', icon: 'Palette', description: 'Unlock generative creativity and produce stunning assets for the modern digital era.' },
    { id: 'data', name: 'Data Intelligence', icon: 'Database', description: 'Transform raw data into strategic insights with advanced predictive modeling assistants.' },
    { id: 'aiml', name: 'AI Engineering', icon: 'BrainCircuit', description: 'Build and fine-tune the next generation of intelligence with specialized ML workflows.' },
    { id: 'cyber', name: 'Security & Trust', icon: 'ShieldCheck', description: 'Protect digital assets and audit systems with high-speed threat detection agents.' },
    { id: 'cloud', name: 'Systems & DevOps', icon: 'Cloud', description: 'Scale infrastructure effortlessly with automated cloud architecture and deployment help.' },
    { id: 'web3', name: 'Foundry & Web3', icon: 'Link', description: 'Architect decentralized futures with smart contract auditors and blockchain assistants.' },
    { id: 'health', name: 'Clinical Care', icon: 'Stethoscope', description: 'Enhance patient outcomes and clinical research with precise diagnostic intelligence.' },
    { id: 'legal', name: 'Legal Strategy', icon: 'Scale', description: 'Navigate complex regulations and document analysis with high-speed legal research help.' },
    { id: 'fin', name: 'Wealth & Finance', icon: 'Banknote', description: 'Optimize portfolios and automate trade logic with specialized financial agents.' },
    { id: 'biz', name: 'Growth & Strategy', icon: 'Rocket', description: 'Identify market opportunities and scale operations with strategic business co-pilots.' },
    { id: 'mkt', name: 'Brand & Marketing', icon: 'Megaphone', description: 'Amplify your message and automate campaign performance with creative marketing help.' },
    { id: 'write', name: 'Narrative & Copy', icon: 'PenTool', description: 'Draft compelling stories and optimize copy for engagement with narrative-focused AI.' },
    { id: 'edu', name: 'Learning & EdTech', icon: 'GraduationCap', description: 'Personalize education and automate tutoring paths for students across the globe.' },
    { id: 'hr', name: 'Talent Culture', icon: 'Users', description: 'Streamline recruitment and nurture professional growth with culture-focused AI.' },
    { id: 'sales', name: 'Revenue Ops', icon: 'ShoppingCart', description: 'Accelerate lead generation and close deals faster with intelligent sales outreach.' },
    { id: 'cs', name: 'Client Success', icon: 'Headset', description: 'Deliver world-class support and resolve complex tickets with empathetic AI help.' },
    { id: 'eng', name: 'Industrial Systems', icon: 'Settings', description: 'Optimize CAD workflows and industrial automation with advanced engineering help.' },
    { id: 'climate', name: 'Green Tech', icon: 'Leaf', description: 'Monitor sustainability metrics and architect green futures with environmental AI.' },
    { id: 'science', name: 'Scientific Research', icon: 'Microscope', description: 'Accelerate discovery and data-driven hypothesis testing with research companions.' },
    { id: 'photo', name: 'Media Production', icon: 'Camera', description: 'Polish visual narratives and automate editing with specialized media assistants.' },
    { id: 'music', name: 'Sound & Audio', icon: 'Music', description: 'Compose, master, and synthesize new sounds with intelligent audio engineering.' },
    { id: 'travel', name: 'Global Logistics', icon: 'Globe2', description: 'Optimize international travel and supply chains with world-aware logistics AI.' },
    { id: 'consult', name: 'Expert Consulting', icon: 'Briefcase', description: 'Deliver high-value advice and professional strategy with deep-knowledge companions.' },
    { id: 'energy', name: 'Energy Discovery', icon: 'Zap', description: 'Architect efficient power grids and renewable energy systems with specialized AI.' },
    { id: 'ngo', name: 'Social Impact', icon: 'Heart', description: 'Amplify social good and manage humanitarian aid with mission-focused AI tools.' },
    { id: 'food', name: 'Culinary Arts', icon: 'Coffee', description: 'Innovate recipes and manage hospitality operations with intelligent food-tech help.' },
    { id: 'lux', name: 'Luxury & Fashion', icon: 'Gem', description: 'Design premium aesthetics and manage high-end brand experiences with elite AI.' },
    { id: 'logistics', name: 'Supply Chain', icon: 'Anchor', description: 'Master global trade and warehouse automation with specialized trade companions.' }
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
            const isFeatured = seededRandom(seed) > 0.9;
            const pricingType = seededRandom(seed + 1) > 0.6 ? 'Paid' : (seededRandom(seed + 1) > 0.3 ? 'Freemium' : 'Free');
            const rating = 3.5 + (seededRandom(seed + 2) * 1.5);

            const suffixes = ['AI', 'Assistant', 'Expert', 'Flow', 'Companion', 'Sync', 'Pilot', 'Engine', 'Brain', 'Core'];
            const name = `${field.name.split(' ')[0]} ${suffixes[Math.floor(seededRandom(seed + 3) * suffixes.length)]} ${i + 1}`;

            agents.push({
                id,
                name,
                field: field.name,
                shortDescription: `A powerful ${field.name.toLowerCase()} companion for elite professionals.`,
                longDescription: `This ${pricingType.toLowerCase()} assistant is meticulously designed for high-performance ${field.name.toLowerCase()} workflows. It offers deep integration, real-time strategy recommendations, and top-tier security.`,
                useCases: [
                    'Strategic workflow acceleration',
                    'Advanced domain analysis',
                    'Collaborative professional integration',
                    'Performance tracking and optimization'
                ],
                pricing: pricingType,
                rating: Number(rating.toFixed(1)),
                reviewsCount: Math.floor(seededRandom(seed + 4) * 500) + 12,
                tags: [field.name.split(' ')[0], 'Professional', 'Elite'],
                toolLink: 'https://example.com',
                featured: isFeatured
            });

            const reviewCount = Math.floor(seededRandom(seed + 5) * 5) + 3;
            for (let r = 0; r < reviewCount; r++) {
                reviews.push({
                    id: `rev-${id}-${r}`,
                    agentId: id,
                    userName: `Professional ${Math.floor(seededRandom(seed + r) * 1000)}`,
                    rating: Math.floor(seededRandom(seed + r + 10) * 2) + 4,
                    comment: seededRandom(seed + r) > 0.5
                        ? "Transformed my daily workflow completely. A professional necessity."
                        : "Highly capable and trustworthy for complex industry tasks.",
                    date: new Date(2024, 0, Math.floor(seededRandom(seed + r) * 365)).toISOString()
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
        PenTool, GraduationCap, Users, ShoppingCart, Headset, Settings, Leaf,
        Microscope, Camera, Music, Globe2, Briefcase, Zap, Heart, Coffee, Gem,
        LineChart, MessageSquare, Anchor
    };
    const IconComp = icons[iconName] || Settings;
    return <IconComp className="w-6 h-6" />;
};
