import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-deep">
      <div className="px-[5vw] py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Nova Energy" className="h-10 w-auto" />
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
