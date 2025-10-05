import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import logo from "@/assets/logo.png";

// Step 1: Define the types for the props we are receiving
type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // Step 2: Use the `isOpen` state to conditionally change the width
    <aside className={`flex flex-col bg-zinc-900 text-zinc-400 p-4 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      
      {/* Top Section: Logo and Toggle Button */}
      <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} mb-10`}>
        {isOpen && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="404 Society Logo" className="h-8 w-8" />
            <span className="font-bold text-lg text-zinc-200">404 AI</span>
          </Link>
        )}
        {/* Step 3: The button now calls setIsOpen to toggle the state */}
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Footer Navigation */}
      <div className="flex flex-col gap-2">
        <Link to="/account" title="Account">
          <Button variant="ghost" className={`w-full flex gap-4 ${isOpen ? 'justify-start' : 'justify-center'}`}>
            <User className="w-5 h-5" />
            {isOpen && <span>Account</span>}
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          title="Log Out"
          className={`w-full flex gap-4 text-red-500 hover:text-red-400 ${isOpen ? 'justify-start' : 'justify-center'}`}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Log Out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
