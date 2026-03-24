import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Commercial", to: "/commercial" },
  { label: "Residential", to: "/residential" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-3 bg-background/85 backdrop-blur-xl border-b border-border">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Nova Energy" className="h-12 w-auto" />
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`text-sm tracking-wide transition-colors duration-200 ${
                location.pathname === item.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <a
        href="mailto:contracts@gonovaenergy.com"
        className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-electric text-primary-foreground font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-electric/30"
      >
        Get a Free Quote
      </a>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-foreground"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border md:hidden"
          >
            <div className="flex flex-col px-[5vw] py-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="mailto:contracts@gonovaenergy.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-electric text-primary-foreground font-medium text-sm mt-2"
              >
                Get a Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
