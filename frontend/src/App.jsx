import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AppRoutes from "./AppRoutes";
import PrivacyPolicy from "./components/PrivacyPolicy";
import RefundPolicy from "./components/RefundPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import ContactUs from "./Pages/ContactUs";
import OtpVerification from "./Pages/OtpVerification";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<AppRoutes />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />

      <Footer />
    </>
  );
};

export default App;
