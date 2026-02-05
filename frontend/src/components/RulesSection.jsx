import React from 'react';
import { motion } from 'framer-motion';

const rules = [
  { text: "Only AKGEC students are eligible to participate.", icon: "🎓" },
  { text: "Registration requires a valid @akgec.ac.in college email.", icon: "📧" },
  { text: "Valid student number (starting with 25) is mandatory.", icon: "🆔" },
  { text: "Strictly one registration per student ID allowed.", icon: "👤" },
  { text: "A non-refundable registration fee of ₹100 applies.", icon: "💰" }
];

// Removed : React.FC
const RulesSection = () => {
  return (
    <section className="relative py-12">
      <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
              Participation <br />
              <span className="text-indigo-400">Rules & Guidelines</span>
            </h2>
            <p className="text-gray-400">
              Please ensure you meet all the criteria before proceeding with the registration and payment.
            </p>
          </div>
          
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rules.map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
              >
                <span className="text-2xl shrink-0">{rule.icon}</span>
                <p className="text-sm text-gray-300 font-medium leading-tight pt-1">
                  {rule.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;