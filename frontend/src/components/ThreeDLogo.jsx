import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CSI from "../assets/CSI.png";

const ThreeDLogo = () => {
  // Raw mouse values (normalized)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const mouseX = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 18 });

  // 3D rotations
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const scale = useTransform(mouseX, [-0.5, 0.5], [1.05, 1.05]);

  // Lighting position
  const lightX = useTransform(mouseX, [-0.5, 0.5], ["30%", "70%"]);
  const lightY = useTransform(mouseY, [-0.5, 0.5], ["30%", "70%"]);

  // Shadow movement
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="flex items-center justify-center h-full bg-black"
      style={{ perspective: 1500 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-94 h-64 flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floating shadow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(0,0,0,0.45)",
            filter: "blur(45px)",
            x: shadowX,
            y: shadowY,
            transform: "translateZ(-60px)",
          }}
        />

        {/* Logo */}
        <img
          src={CSI}
          alt="Logo"
          className="w-40 h-40 select-none"
          style={{ transform: "translateZ(80px)" }}
        />

        {/* Dynamic light reflection */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${lightX} ${lightY},
              rgba(255,255,255,0.4),
              transparent 60%)`,
            transform: "translateZ(100px)",
          }}
        />

        {/* Outer rim */}
        <div
          className="absolute -inset-2 rounded-full border border-white/10"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>
    </div>
  );
};

export default ThreeDLogo;
