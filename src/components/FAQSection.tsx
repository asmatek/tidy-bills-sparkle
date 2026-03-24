import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-center justify-between gap-4 text-foreground font-medium hover:text-electric transition-colors"
      >
        <span>{question}</span>
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-electric transition-transform duration-300 ${
            open ? "rotate-45 border-electric" : ""
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FAQSectionProps {
  items: FAQItemProps[];
  children?: ReactNode;
}

const FAQSection = ({ items, children }: FAQSectionProps) => {
  return (
    <section className="section-padding bg-deep">
      <div className="max-w-3xl mx-auto">
        {children}
        <div className="mt-10">
          {items.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
