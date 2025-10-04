import { Link, useLocation } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              404
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!isAuthPage && (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
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
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {!isAuthPage && (
              <>
                <Link to="/login" className="block">
                  <Button variant="ghost" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" className="block">
                  <Button className="w-full gradient-accent">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
