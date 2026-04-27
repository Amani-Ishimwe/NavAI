
import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    badge?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    align = 'center',
    badge
}) => {
    return (
        <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
            {badge && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 bg-[#F28C28]/10 text-[#F28C28] rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-3"
                >
                    {badge}
                </motion.span>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[17px] text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionHeader;
