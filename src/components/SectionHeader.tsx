import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  labelColor?: "electric" | "gold";
  centered?: boolean;
  children?: ReactNode;
}

const SectionHeader = ({
  label,
  title,
  subtitle,
  labelColor = "electric",
  centered = false,
  children,
}: SectionHeaderProps) => {
  const labelClass = labelColor === "electric" ? "text-electric" : "text-gold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={centered ? "text-center" : ""}
    >
      <p className={`text-xs font-semibold tracking-[0.12em] uppercase mb-3 ${labelClass}`}>
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
};

export default SectionHeader;
