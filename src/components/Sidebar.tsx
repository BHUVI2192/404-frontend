import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, Plus, BookOpen, Pencil } from "lucide-react";
import logo from "@/assets/logo.png";
import { Switch } from "@/components/ui/switch";

type Session = {
  id: number;
  title: string;
  last_updated: string;
};

type SidebarProps = {
  sessions?: Session[];
  onNewChat: () => void;
  onSelectSession: (id: number) => void;
  onIncognitoChange?: (incognito: boolean) => void;
};

const Sidebar = ({
  sessions = [],
  onNewChat,
  onSelectSession,
  onIncognitoChange,
}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [incognito, setIncognito] = useState<boolean>(localStorage.getItem("incognitoMode") === "true");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const sync = () => setIncognito(localStorage.getItem("incognitoMode") === "true");
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleIncognitoToggle = (checked: boolean) => {
    setIncognito(checked);
    localStorage.setItem("incognitoMode", checked ? "true" : "false");
    onIncognitoChange?.(checked);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("incognitoMode");
    navigate("/login");
  };

  return (
    <nav
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`flex flex-col items-center transition-all duration-200 h-screen py-3 bg-zinc-900 text-zinc-200 border-r border-zinc-800 ${
        open ? "w-72" : "w-16"
      }`}
      style={{ minWidth: open ? "18rem" : "4rem" }}
    >
      <div className="mb-4 flex items-center w-full justify-center">
        <img src={logo} alt="404 AI Logo" className={`h-8 w-8 transition-all ${open ? "mr-2" : ""}`} />
        {open && <span className="font-bold text-lg">404 AI</span>}
      </div>
      <div className="flex flex-col gap-1 w-full items-stretch mt-2">
        <Button
          variant={location.pathname === "/dashboard" ? "default" : "ghost"}
          className={`my-1 flex items-center gap-3 justify-${open ? "start" : "center"} w-full`}
          onClick={onNewChat}
          tabIndex={0}
        >
          <Plus className="w-5 h-5" />
          {open && <span>New Chat</span>}
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center gap-3 justify-${open ? "start" : "center"} w-full`}
          onClick={() => setShowHistory((v) => !v)}
        >
          <BookOpen className="w-5 h-5" />
          {open && <span>History</span>}
        </Button>
        {/* Extremely clear, padded, readable history flyout */}
        {showHistory && open && (
          <div
            className="relative ml-8 mb-2 flex flex-col gap-3 max-h-72 min-h-[72px] overflow-y-auto border-l border-zinc-800 bg-zinc-800 pl-4 pr-3 py-4 rounded-xl shadow-inner custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(110,110,130,0.55) transparent"
            }}
          >
            {sessions.length === 0 ? (
              <span className="text-xs text-zinc-400 mt-2">No previous chats.</span>
            ) : (
              sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className="block w-full text-left text-base font-semibold text-zinc-50 bg-zinc-900 rounded-lg hover:bg-blue-900 focus:bg-blue-800 px-5 py-3 shadow transition-all duration-100 border border-zinc-700"
                  title={session.title}
                  style={{
                    letterSpacing: ".02em",
                    marginBottom: "2px",
                  }}
                >
                  <div className="truncate mb-1">{session.title}</div>
                  <div className="text-xs text-zinc-400 truncate">{new Date(session.last_updated).toLocaleString()}</div>
                </button>
              ))
            )}
            {/* Sticky scroll-to-bottom button */}
            <div className="sticky bottom-2 right-2 flex justify-end">
              <button
                type="button"
                tabIndex={-1}
                aria-label="Scroll to bottom"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-700 hover:bg-blue-700 transition-colors shadow text-zinc-100 border border-zinc-600"
                style={{ opacity: 0.88 }}
                onClick={e => {
                  const el = (e.target as HTMLElement).closest('.custom-scrollbar');
                  if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16.5q-.2 0-.387-.075t-.338-.225l-4.3-4.3q-.275-.275-.288-.688T6.973 10.5q.275-.275.7-.275t.7.275l2.875 2.9V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v7.4l2.9-2.9q.3-.275.713-.275t.687.275q.275.3.288.713t-.288.712l-4.3 4.3q-.15.15-.338.225T12 16.5Z"/></svg>
              </button>
            </div>
          </div>
        )}
        <Link to="/studio" tabIndex={0}>
          <Button
            variant={location.pathname === "/studio" ? "default" : "ghost"}
            className={`flex items-center gap-3 my-2 w-full justify-${open ? "start" : "center"}`}
          >
            <Pencil className="w-5 h-5" />
            {open && <span>Creation Studio</span>}
          </Button>
        </Link>
      </div>
      <div className="flex-1" />
      <div className="w-full mb-2 px-1">
        <div className={`flex items-center gap-2 ${open ? "justify-start" : "justify-center"}`}>
          <Switch
            checked={incognito}
            onCheckedChange={handleIncognitoToggle}
            id="incognito-toggle"
          />
          {open && (
            <label htmlFor="incognito-toggle" className="text-sm">
              Incognito
            </label>
          )}
        </div>
      </div>
      <div className={`flex flex-col gap-0.5 w-full mb-2`}>
        <Link to="/account" tabIndex={0}>
          <Button
            variant={location.pathname === "/account" ? "default" : "ghost"}
            className={`flex items-center gap-3 w-full justify-${open ? "start" : "center"}`}
          >
            <User className="w-5 h-5" />
            {open && <span>Account</span>}
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full text-red-500 hover:text-red-400 justify-${open ? "start" : "center"}`}
        >
          <LogOut className="w-5 h-5" />
          {open && <span>Log Out</span>}
        </Button>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(124,124,138,0.7);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </nav>
  );
};

export default Sidebar;
