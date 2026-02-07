import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios'; 

// In JS, we replace the Enum/Type import with a local constant
const BRANCHES = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other"
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentNumber: '',
    branch: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  // Real-time validation logic remains the same
  useEffect(() => {
    const newErrors = {};

    if (formData.name && formData.name.length < 3) {
      newErrors.name = 'Name is too short';
    }

    if (formData.email && !formData.email.endsWith('@akgec.ac.in')) {
      newErrors.email = 'Use your college email (@akgec.ac.in)';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (formData.studentNumber && !/^25\d+$/.test(formData.studentNumber)) {
      newErrors.studentNumber = 'Must start with 25 and contain only digits';
    }

    setErrors(newErrors);
  }, [formData]);

  const isFormValid = useMemo(() => {
    return (
      formData.name.length >= 3 &&
      formData.email.endsWith('@akgec.ac.in') &&
      /^\d{10}$/.test(formData.phone) &&
      /^25\d+$/.test(formData.studentNumber) &&
      formData.branch !== '' &&
      Object.keys(errors).length === 0
    );
  }, [formData, errors]);

  // Removed React.ChangeEvent type
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const initPayment = (orderData) => {
    const options = {
      key: "rzp_test_mock_key",
      amount: orderData.amount,
      currency: "INR",
      name: "RENDER",
      description: "Workshop Registration Fee",
      order_id: orderData.id,
      handler: async (response) => {
        try {
          // payment verification logic
          setPaymentStatus('success');
        } catch (err) {
          setPaymentStatus('failed');
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#6366F1",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      setPaymentStatus('failed');
    });
    rzp1.open();
  };

  // Removed React.FormEvent type
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setPaymentStatus('pending');

    try {
      // Mocking the backend response delay
      setTimeout(() => {
        const mockOrder = {
          id: 'order_' + Math.random().toString(36).substr(2, 9),
          amount: 10000 // ₹100
        };
        initPayment(mockOrder);
        setIsSubmitting(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setPaymentStatus('failed');
    }
  };

  if (paymentStatus === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-12 rounded-3xl bg-indigo-900/20 border border-indigo-500/30 text-center"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-4">Registration Successful!</h2>
        <p className="text-gray-400 mb-8">
          Welcome aboard, <span className="text-white font-semibold">{formData.name}</span>. 
          A confirmation email has been sent to <span className="text-indigo-400">{formData.email}</span>.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="text-indigo-400 font-semibold hover:underline"
        >
          Register another student
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-poppins font-bold text-white mb-4">Reserve Your Seat</h2>
        <p className="text-gray-400">Fill out the form accurately. Payment will be processed after form validation.</p>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Emma Watson"
              className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl px-4 py-3 text-white transition-all`}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs ml-1 font-medium">{errors.name}</motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 ml-1">College Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="nameStdno@akgec.ac.in"
              className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl px-4 py-3 text-white transition-all`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs ml-1 font-medium">{errors.email}</motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 ml-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="x x x x x x x x x x"
              className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl px-4 py-3 text-white transition-all`}
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs ml-1 font-medium">{errors.phone}</motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 ml-1">Student Number</label>
            <input
              type="text"
              name="studentNumber"
              required
              value={formData.studentNumber}
              onChange={handleInputChange}
              placeholder="25*****"
              className={`w-full bg-white/5 border ${errors.studentNumber ? 'border-red-500/50' : 'border-white/10'} focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl px-4 py-3 text-white transition-all`}
            />
            <AnimatePresence>
              {errors.studentNumber && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs ml-1 font-medium">{errors.studentNumber}</motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-300 ml-1">Branch</label>
            <select
              name="branch"
              required
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full bg-[#1a1f2e] border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl px-4 py-3 text-white transition-all appearance-none"
            >
              <option value="" disabled>Select your branch</option>
              {BRANCHES.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-poppins font-bold text-white">₹100</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Non-refundable <br /> Registration Fee</div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full md:w-auto px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
              isFormValid && !isSubmitting
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                Pay & Register
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </>
            )}
          </button>
        </div>

        {paymentStatus === 'failed' && (
          <p className="text-center text-red-400 text-sm font-medium">Payment failed or cancelled. Please try again.</p>
        )}
      </motion.form>
    </div>
  );
};

export default RegistrationForm;