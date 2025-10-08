import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import logo from "@/assets/logo.png";

type Session = {
  id: number;
  title: string;
  last_updated: string;
};

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sessions?: Session[]; // Optional for safety
  onNewChat: () => void;
  onSelectSession: (id: number) => void;
};

const Sidebar = ({
  isOpen,
  setIsOpen,
  sessions = [],
  onNewChat,
  onSelectSession,
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`flex flex-col bg-zinc-900 text-zinc-400 p-4 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Top Section: Logo and Toggle Button */}
      <div
        className={`flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        } mb-8`}
      >
        {isOpen && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="404 Society Logo" className="h-8 w-8" />
            <span className="font-bold text-lg text-zinc-200">404 AI</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="mb-4">
        <Button
          onClick={onNewChat}
          variant="outline"
          className="w-full flex items-center gap-2 border-blue-500 text-blue-500"
        >
          <Plus size={18} />
          {isOpen && <span>New Chat</span>}
        </Button>
      </div>

      {/* Sessions List (History) */}
      <div className="flex-1 overflow-y-auto mb-6">
        <div className="text-xs mb-2 text-zinc-400 pl-1">
          {isOpen && "Chat History"}
        </div>
        {sessions.length === 0 ? (
          <div className="text-zinc-600 px-2">{isOpen ? "No previous chats." : ""}</div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`p-2 rounded cursor-pointer hover:bg-zinc-800 ${isOpen ? "" : "justify-center flex"}`}
              title={session.title}
            >
              <div>
                <div className="font-medium text-zinc-200 truncate">
                  {isOpen ? session.title : session.title.charAt(0)}
                </div>
                {isOpen && (
                  <div className="text-xs text-zinc-500 truncate mt-0.5">
                    {new Date(session.last_updated).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col gap-2">
        <Link to="/account" title="Account">
          <Button
            variant="ghost"
            className={`w-full flex gap-4 ${isOpen ? "justify-start" : "justify-center"}`}
          >
            <User className="w-5 h-5" />
            {isOpen && <span>Account</span>}
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          title="Log Out"
          className={`w-full flex gap-4 text-red-500 hover:text-red-400 ${isOpen ? "justify-start" : "justify-center"}`}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Log Out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
