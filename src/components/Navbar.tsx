import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png"; // Make sure your logo is at src/assets/logo.png

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine if we are on the Home page
  const isHomePage = location.pathname === "/";
  // Determine if we are on an authentication page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  // Conditionally apply classes for the transparent effect
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
    isHomePage ? 'bg-transparent' : 'glass-effect border-b'
  }`;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="404 Society Logo" 
              className="h-10 w-auto group-hover:scale-110 transition-transform" 
            />
            <span className="text-xl font-bold tracking-tight text-white">
              404 AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {!isAuthPage && (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="gradient-accent shadow-glow">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-white/10">
            {!isAuthPage && (
              <div className="flex flex-col gap-4">
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full bg-transparent text-white border-white/50">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" className="block">
                  <Button className="w-full gradient-accent">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
