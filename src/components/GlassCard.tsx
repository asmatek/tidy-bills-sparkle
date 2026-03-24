import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  variant?: "default" | "electric" | "gold";
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, variant = "default", className = "", hover = true }: GlassCardProps) => {
  const variantClasses = {
    default: "glass-card",
    electric: "glass-card-electric",
    gold: "glass-card-gold",
  };

  const hoverBorder = {
    default: "hover:border-foreground/20",
    electric: "hover:border-electric/30",
    gold: "hover:border-gold/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`rounded-2xl p-6 md:p-8 transition-all duration-300 ${variantClasses[variant]} ${hover ? hoverBorder[variant] : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
