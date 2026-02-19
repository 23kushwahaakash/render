import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

const OtpVerification = () => {
  const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/+$/, "");
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [statusText, setStatusText] = useState("");

  const email = state?.email || "your email";

  const pollPaymentStatus = async (studentId) => {
    for (let i = 0; i < 10; i += 1) {
      const token = await getRecaptchaToken("payment_status");
      const statusResponse = await axios.post(
        `${baseUrl}/api/users/payment-status/`,
        {
          student_id : studentId ,
          recaptcha_token:token ,
        }

      );
      const status = statusResponse.data?.payment_status;

      if (status === "SUCCESS") {
        return "SUCCESS";
      }

      if (status === "FAILED") {
        return "FAILED";
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return "PENDING";
  };

  const navigateToSuccess = (studentId) => {
    navigate("/registration-success", {
      state: {
        studentId,
        name: state?.name || "",
        email: state?.email || "",
        paymentStatus: "SUCCESS",
      },
    });
  };

  const openRazorpayCheckout = (order, studentId) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: razorpayKey || "rzp_test_mock_key",
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "RENDER",
      description: "Workshop Registration Fee",
      prefill: {
        name: state?.name || "",
        email: (state?.email || "").toLowerCase(),
        contact: state?.phone || "",
      },
      handler: async () => {
        setStatusText("Verifying payment status...");
        try {
          const finalStatus = await pollPaymentStatus(studentId);
          if (finalStatus === "SUCCESS") {
            toast.success("Payment successful. Registration completed.");
            navigateToSuccess(studentId);
            return;
          }
          if (finalStatus === "FAILED") {
            toast.error("Payment failed. Please try again.");
            return;
          }
          toast("Payment is still processing. Please check status again in a moment.");
        } catch (error) {
          toast.error(
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "Payment status check failed"
          );
        }
        setStatusText("");
        setIsPaying(false);
      },
      modal: {
        ondismiss: () => {
          setIsPaying(false);
          setStatusText("");
        },
      },
      theme: {
        color: "#6366F1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", async () => {
      setStatusText("Checking payment status...");
      try {
        const finalStatus = await pollPaymentStatus(studentId);
        if (finalStatus === "SUCCESS") {
          toast.success("Payment successful. Registration completed.");
          navigateToSuccess(studentId);
          return;
        }
        if (finalStatus === "FAILED") {
          toast.error("Payment failed. Please try again.");
          return;
        }
        toast("Payment is still processing. Please check status again in a moment.");
      } catch (error) {
        toast.error(
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Payment status check failed"
        );
      }
      setStatusText("");
      setIsPaying(false);
    });
    rzp.open();
  };

  const getRecaptchaToken = async (action) => {
    if (!window.grecaptcha) {
      toast.error("Captcha not loaded. Refresh page.");
      throw new Error("Captcha not loaded");
    }

    const token = await new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(recaptchaSiteKey, { action })
          .then(resolve)
          .catch(reject);
      });
    })
    return token ;
  };

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      toast.error("Enter a valid OTP.");
      return;
    }
    if (!state) {
      toast.error("Session expired. Please start registration again.");
      return;
    }

    setIsVerifying(true);
    try {
      if (!window.grecaptcha) {
        throw new Error("Captcha not loaded. Refresh page.");
      }

      const token = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: "verify_otp" })
            .then(resolve)
            .catch(reject);
        });
      });

      const verifyPayload = {
        name: state.name,
        email: state.email.trim().toLowerCase(),
        phone: state.phone,
        student_number: state.studentNumber,
        branch: state.branch,
        hostler: state.residence,
        gender: state.gender,
        otp: otp,
        recaptcha_token: token,
      };
      console.log(verifyPayload);

      const verifyResponse = await axios.post(
        `${baseUrl}/api/users/verify-otp/`,
        verifyPayload
      );

      const studentId = verifyResponse.data?.id;
      if (!studentId) {
        toast.error("Student ID not returned after OTP verification");
        return;
      }

      setIsPaying(true);
      setStatusText("Creating payment order...");
      const recaptchaToken = await getRecaptchaToken("payment_initiation");
      const paymentInitResponse = await axios.post(
        `${baseUrl}/api/users/payment-initiation/`,
        {
          student_id: studentId,
          recaptcha_token: recaptchaToken,
        }
      );

      openRazorpayCheckout(paymentInitResponse.data, studentId);
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(
          error.response.data?.message ||
          error.response.data?.detail ||
          "OTP or payment initiation failed"
        );
      } else {
        toast.error("Server not reachable");
      }
      setIsPaying(false);
      setStatusText("");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl"
      >
        <h2 className="text-3xl font-poppins font-bold text-white mb-3">
          Verify OTP
        </h2>
        <p className="text-gray-400 mb-8">
          Enter the OTP sent to <span className="text-indigo-300">{email}</span>.
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 ml-1">
              OTP Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 4-6 digit OTP"
              className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl px-4 py-3 text-white transition-all"
              required
            />
          </div>

          {statusText && (
            <p className="text-sm text-indigo-300">{statusText}</p>
          )}

          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying || isPaying || !state}
            className={`w-full px-10 py-4 rounded-2xl font-bold transition-all ${isVerifying || isPaying || !state
                ? "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              }`}
          >
            {isVerifying ? "VERIFYING OTP..." : isPaying ? "OPENING PAYMENT..." : "VERIFY OTP"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;

