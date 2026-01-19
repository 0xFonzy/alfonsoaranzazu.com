"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function GlitchText({ text, className = "", as: Component = "span" }: GlitchTextProps) {
  return (
    <motion.span
      className={`glitch inline-block ${className}`}
      data-text={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Component === "h1" && <h1 className={className}>{text}</h1>}
      {Component === "h2" && <h2 className={className}>{text}</h2>}
      {Component === "h3" && <h3 className={className}>{text}</h3>}
      {Component === "span" && <span>{text}</span>}
      {Component === "p" && <p>{text}</p>}
    </motion.span>
  );
}
