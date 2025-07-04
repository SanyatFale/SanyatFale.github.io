import React from "react";
import { motion } from "framer-motion";

export default function AnimatedIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row items-center gap-8 p-8"
    >
      <img
        src="/images/your-photo.jpg"
        alt="Your photo"
        className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
      />
      <h1 className="text-3xl md:text-4xl font-semibold text-center md:text-left">
        Hi, I’m Sanyat — I write, build, and explore.
      </h1>
    </motion.div>
  );
}
