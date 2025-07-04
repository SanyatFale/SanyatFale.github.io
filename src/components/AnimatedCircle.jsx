import React from "react";
import { motion } from "framer-motion";

export default function AnimatedCircle({ children, delay = 0, href }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.08,
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 8,
          duration: 0.2,
        }
      }}
      whileTap={{ scale: 0.95 }}
      className="
        w-32 h-32
        rounded-full
        bg-gradient-to-br from-indigo-500 to-purple-600
        text-white text-lg font-semibold
        flex items-center justify-center
        transition-shadow duration-300 ease-in-out
        hover:shadow-2xl hover:shadow-indigo-500/25
        dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-700
        dark:hover:shadow-gray-500/25
        cursor-pointer
      "
    >
      {children}
    </motion.a>
  );
}