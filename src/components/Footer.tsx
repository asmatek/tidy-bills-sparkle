import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-deep">
      <div className="px-[5vw] py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-electric to-gold flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading text-lg font-bold text-foreground">
            Nova<span className="text-electric">Energy</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          <Link to="/commercial" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Commercial
          </Link>
          <Link to="/residential" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Residential
          </Link>
          <a href="mailto:contracts@gonovaenergy.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nova Energy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
