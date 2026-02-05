import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './Pages/Hero';
import InfoSection from './Pages/InfoSection';
import RulesSection from './components/RulesSection';
import RegistrationForm from './Pages/RegistrationForm';
import Footer from './components/Footer';

const App = () => {
  // In JS, we don't need to specify the HTML element type
  const registerRef = useRef(null);

  const scrollToRegister = () => {
    // Optional chaining (?.) still works in modern JS
    registerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-[indigo-500] selection:text-white">
      {/* Background radial gradients for atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        <Navbar onRegisterClick={scrollToRegister} />
        
        <main>
          <Hero onCtaClick={scrollToRegister} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
            <InfoSection />
            <RulesSection />
            
            <div ref={registerRef} className="pt-16">
              <RegistrationForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;