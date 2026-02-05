import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-poppins font-bold text-lg mb-2">
              AKGEC <span className="text-indigo-400">WORKSHOP HUB</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              Empowering students through high-impact technical workshops and community building.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm mb-4">
              Contact us at: <a href="mailto:society@akgec.ac.in" className="text-indigo-400 hover:underline">society@akgec.ac.in</a>
            </p>
            <p className="text-gray-600 text-xs">
              © 2025 AKGEC Tech Society. Made with 💙 by Creative Labs.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;