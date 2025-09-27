import React, { useState, useEffect } from "react";
import { firestore } from "../../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FiMail, FiCheck, FiX, FiArrowRight } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import { useNewsLetter } from "../../../contexts/NewsLetter";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controls = useAnimation();

  const { addSubscriber } = useNewsLetter();

  // Sound effects
  const playSound = (type) => {
    if (typeof window !== "undefined") {
      const sound = new Audio(
        type === 'success'
          ? 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'
          : 'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'
      );
      sound.volume = 0.2;
      sound.play().catch(e => console.log("Audio playback prevented:", e));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatus("");
    playSound('click');

    try {
      await addSubscriber(email);
      setStatus("success");
      playSound('success');
      setEmail("");
      await controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.6 }
      });
    } catch (error) {
      console.error("Error saving email:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confetti effect component
  const Confetti = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#BB86FC] rounded-full"
            style={{
              top: `${Math.random() * 20}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, window.innerHeight],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [1, 0],
              rotate: [0, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 0.5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative py-24 px-6 text-center bg-gradient-to-b from-[#0A0A0A] to-[#121212] overflow-hidden">
      {/* Luxury background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#BB86FC] opacity-5 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-[#BB86FC] opacity-5 filter blur-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
      </div>

      {/* Decorative border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BB86FC] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BB86FC] to-transparent"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative"
      >
        {/* Exclusive badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[#1E1E1E] border border-[#BB86FC]/30 text-[#BB86FC] text-sm font-medium tracking-wider"
        >
          EXCLUSIVE ACCESS
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
          Join Our <span className="font-medium text-[#BB86FC]">Inner Circle</span>
        </h2>

        <p className="text-[#BBBBBB] mb-10 text-xl max-w-2xl mx-auto leading-relaxed">
          Be the first to receive curated luxury selections, private event invitations, and members-only benefits.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-stretch gap-4 max-w-xl mx-auto"
        >
          <motion.div
            whileHover={{
              boxShadow: "0 0 0 1px #BB86FC",
              transition: { duration: 0.3 }
            }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1000
            }}
            className="relative flex-grow group"
          >
            <FiMail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#BBBBBB] group-focus-within:text-[#BB86FC] group-focus-within:animate-pulse transition-all duration-300" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => {
                e.target.parentElement.querySelector('svg').classList.add('text-[#BB86FC]', 'animate-pulse');
              }}
              onBlur={(e) => {
                e.target.parentElement.querySelector('svg').classList.remove('text-[#BB86FC]', 'animate-pulse');
              }}
              placeholder="Your exclusive email address"
              className="pl-14 pr-5 py-4 rounded-lg bg-[#1E1E1E] border border-[#2D2D2D] text-white w-full focus:outline-none focus:ring-1 focus:ring-[#BB86FC] placeholder-[#555555] transition-all duration-300 group-hover:border-[#BB86FC]/50 group-focus-within:border-[#BB86FC]"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            animate={controls}
            whileHover={{
              background: [
                'linear-gradient(45deg, #BB86FC, #9C6CF5)',
                'linear-gradient(45deg, #9C6CF5, #7D4FEB)',
                'linear-gradient(45deg, #7D4FEB, #BB86FC)'
              ],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-[#BB86FC] to-[#9C6CF5] text-[#121212] font-medium rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 shadow-lg hover:shadow-[#BB86FC]/20"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-[#121212]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="whitespace-nowrap">Securing Your Access...</span>
              </>
            ) : (
              <>
                <span className="whitespace-nowrap">Become An Insider</span>
                <FiArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </form>

        <p className="text-[#777777] text-sm mt-4">
          By subscribing, you agree to our <a href="#" className="text-[#BBBBBB] hover:text-[#BB86FC] underline transition-colors">privacy policy</a>.
        </p>

        {/* Success Modal */}
        {status === "success" && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1A1A1A] border border-[#BB86FC]/30 rounded-xl max-w-md p-8 text-center relative overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
              whileHover={{
                rotateY: 5,
                rotateX: -2,
                transition: { duration: 0.5 }
              }}
            >
              <Confetti />
              <FiCheck className="mx-auto text-4xl text-[#BB86FC] mb-4 p-2 rounded-full border border-[#BB86FC]/30" />
              <h3 className="text-2xl font-light text-white mb-2">Access Granted</h3>
              <p className="text-[#BBBBBB] mb-4">
                Welcome, <span className="text-[#BB86FC] font-medium">{email.split('@')[0]}</span>.
              </p>
              <p className="text-[#BBBBBB] mb-6">You're now part of our inner circle.</p>
              <button
                onClick={() => setStatus("")}
                className="px-6 py-2 bg-[#BB86FC] text-[#121212] rounded-lg hover:brightness-110 transition-all"
              >
                Continue Exploration
              </button>
            </motion.div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-[#1E1E1E] border border-red-900/50 rounded-lg inline-flex items-center gap-3 backdrop-blur-sm"
          >
            <div className="p-2 bg-red-900/30 rounded-full">
              <FiX className="text-red-400 text-xl" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-medium">Exclusive Access Pending</h4>
              <p className="text-[#BBBBBB] text-sm">Please try again or contact our concierge.</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NewsletterSignup;