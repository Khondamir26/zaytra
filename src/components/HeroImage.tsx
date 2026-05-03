"use client";

import { motion } from "framer-motion";

export default function BridgeAnimation() {
  return (
    <div className="w-full max-w-3xl relative flex justify-center">
      {/* Fake line-by-line build using clipPath masks */}
      <motion.img
        src="/icons/bridge-icon.png" // use your PNG here
        alt="Bridge"
        className="w-full h-auto absolute"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />


      {/* Main bridge breathing */}
      <motion.img
        src="/icons/bridge-icon.png"
        alt="Bridge"
        className="w-full h-auto relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [1, 1, 1] }}
        transition={{
          opacity: { duration: 5, ease: "easeOut" },
          scale: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />
    </div>
  );
}
