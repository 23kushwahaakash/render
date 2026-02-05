import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "What you’ll learn",
    description: "Hands-on experience with React, Django REST Framework, and cloud deployments using modern DevOps practices.",
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "indigo"
  },
  {
    title: "Who should attend",
    description: "Aspiring developers from AKGEC seeking to bridge the gap between classroom theory and industry requirements.",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "cyan"
  },
  {
    title: "Highlights",
    description: "6 hours of intensive training, certified attendance, industry networking, and a guided project portfolio build.",
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "purple"
  }
];

// Removed : React.FC
const InfoSection = () => {
  return (
    <section id="info" className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-sm overflow-hidden"
          >
            {/* Hover highlight glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-${feature.color}-500`}></div>
            
            <div className="mb-6 inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/5">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-poppins font-bold text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;