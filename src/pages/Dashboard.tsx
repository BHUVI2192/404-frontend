import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clock,
  TrendingUp,
  CloudSun,
  Sun,
  Paperclip,
  ArrowUp,
  User,
  Bot,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import "tailwindcss/tailwind.css";

const CARD_W = 144;
const GAP = 16;
const CHAT_WIDTH = 4 * CARD_W + 3 * GAP;

const widgets = [
  { icon: Clock, title: "Shimoga", value: "1:51 AM" },
  { icon: Sun, title: "Incognito Mode", description: "Your activity won’t be saved." },
  { icon: TrendingUp, title: "NVDA", value: "$187.62", change: "-0.97%", changeColor: "text-red-500" },
  { icon: CloudSun, title: "Shimoga, India", value: "21°C", description: "Partly cloudy" }
];

async function fetchSessions(token) {
  const res = await fetch("http://127.0.0.1:8000/api/v1/sessions/", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch sessions");
  return res.json();
}
async function fetchMemory(token, sessionId) {
  const url = sessionId
    ? `http://127.0.0.1:8000/api/v1/memory/?session_id=${sessionId}`
    : "http://127.0.0.1:8000/api/v1/memory/";
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Couldn't load persistent memory");
  return res.json();
}

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchSessions(token)
        .then((s) => setSessions(s ?? []))
        .catch(() => setSessions([]));
      setCurrentSessionId(null);
      setMessages([]);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && currentSessionId !== null) {
      fetchMemory(token, currentSessionId)
        .then(history =>
          setMessages(
            history.reverse().flatMap((mem) => [
              { sender: "user", text: mem.prompt },
              { sender: "ai", text: mem.response, model_used: mem.model_used },
            ])
          )
        )
        .catch(() => setMessages([]));
    }
    if (currentSessionId === null) setMessages([]);
  }, [currentSessionId]);
  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);
  const handleSendMessage = async () => {
    if (!prompt.trim() || isLoading) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }
    const userMessage = { sender: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setPrompt("");
    try {
      const incognito = localStorage.getItem("incognitoMode") === "true";
      const body = { prompt: userMessage.text, incognito };
      const response = await fetch("http://127.0.0.1:8000/api/v1/chat/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Something went wrong");
      }
      const data = await response.json();
      const aiMessage = {
        sender: "ai",
        text: data.response,
        model_used: data.model_used,
      };
      setMessages((prev) => [...prev, aiMessage]);
      const updatedSessions = await fetchSessions(token);
      setSessions(updatedSessions ?? []);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      setMessages((prev) => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setPrompt("");
  };
  const handleSelectSession = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  return (
    <div className="h-screen w-full flex bg-zinc-900 text-zinc-300 font-sans overflow-hidden relative">
      {/* Subtle top light/rays effect */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-40 z-10"
           style={{
             background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.11) 0%, rgba(34,197,94,0.03) 70%, transparent 100%)"
           }}/>
      {/* Sidebar fixed */}
      <div className="h-screen fixed top-0 left-0 z-20 bg-zinc-900">
        <Sidebar
          sessions={sessions ?? []}
          onNewChat={handleNewChat}
          onSelectSession={handleSelectSession}
        />
      </div>
      {/* Main content scrollable */}
      <main className="flex-1 flex flex-col items-center bg-zinc-900 relative h-screen ml-[80px] overflow-y-auto">
        {messages.length === 0 && !isLoading ? (
          <div className="w-full flex flex-col items-center justify-center h-full">
            <form
              className={`
                max-w-full flex flex-col items-center bg-zinc-900/80 rounded-2xl
                border border-emerald-400/80
                shadow-[0_0_28px_4px_rgba(16,185,129,0.15)]
                focus-within:border-emerald-200
                transition duration-150
                `}
              style={{
                width: `${CHAT_WIDTH}px`,
                boxShadow: "0 0 34px 0 rgba(16,185,129,0.19), 0 0 4px 0 rgba(16,185,129,0.21)"
              }}
              tabIndex={-1}
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <div className="w-full flex flex-col gap-1 items-center p-6 pb-3">
                <div className="w-full flex gap-1 items-center bg-zinc-900 rounded-2xl px-4 py-3 border-none shadow-none">
                  <Input
                    placeholder="Ask anything. Type @ for mentions and / for shortcuts."
                    className="w-full bg-transparent border-none shadow-none outline-none text-base"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    style={{ boxShadow: "none" }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex items-center justify-center text-emerald-400 border-0 shadow-none hover:bg-emerald-950/30 h-9 w-9"
                    tabIndex={0}
                    aria-label="Enhance"
                  >
                    <Sparkles className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!prompt.trim() || isLoading}
                    className="bg-emerald-500/80 hover:bg-emerald-400 text-black rounded-xl h-9 w-9 flex items-center justify-center"
                    type="submit"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                </div>
                <div className="mt-2 flex gap-1 w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-zinc-800 text-zinc-400"
                    disabled={isLoading}
                    type="button"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </form>
            {/* Widgets as in your original, no glow */}
            <div
              className="mt-4 grid grid-cols-4 gap-4"
              style={{ width: `${CHAT_WIDTH}px`, maxWidth: "100%" }}
            >
              {widgets.map((widget, idx) => (
                <Card
                  key={idx}
                  className="bg-zinc-800 border-zinc-700 rounded-2xl flex flex-col items-center justify-center shadow hover:shadow-lg transition-all"
                  style={{
                    width: `${CARD_W}px`,
                    height: `${CARD_W}px`,
                  }}
                >
                  <CardContent className="flex flex-col items-center justify-between h-full w-full p-0 pt-5 pb-5">
                    <widget.icon className="w-6 h-6 text-zinc-400 mb-2" />
                    <span className="text-sm text-zinc-400">{widget.title}</span>
                    {widget.value && (
                      <span className="text-xl mt-2 mb-1 font-semibold text-zinc-100">{widget.value}</span>
                    )}
                    {widget.description && (
                      <span className="text-xs mt-1 mb-1 text-zinc-400">{widget.description}</span>
                    )}
                    {widget.change && (
                      <span className={`text-xs font-semibold mt-1 ${widget.changeColor}`}>{widget.change}</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* --- Chat/Message history rendering --- */}
            <div className="w-full flex flex-col items-center pt-10" style={{ minHeight: "63vh" }}>
              <div className="w-full max-w-2xl px-6" ref={chatContainerRef}>
                <div className="space-y-12 w-full">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex flex-col items-start w-full">
                      {msg.sender === "user" && (
                        <div className="flex items-center gap-2 font-bold text-lg text-zinc-200 w-full mb-2">
                          <span className="">{msg.text}</span>
                          <User className="w-5 h-5 text-emerald-400" />
                        </div>
                      )}
                      {msg.sender === "ai" && (
                        <div className="w-full flex flex-col items-start px-2">
                          <span className="font-medium text-sm text-emerald-300 flex items-center gap-2 mb-1">
                            <Bot className="w-4 h-4" />
                            Assistant
                          </span>
                          <div className="w-full border-t border-zinc-700 mb-2"></div>
                          <div className="text-zinc-200 pb-2 prose prose-zinc dark:prose-invert max-w-none">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                          {msg.model_used && (
                            <span className="text-xs text-zinc-400">
                              Answered by: {msg.model_used}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex flex-row items-center gap-2 self-center mt-6">
                      <Bot size={24} className="text-emerald-400 animate-pulse" />
                      <span className="text-emerald-300">Thinking...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="fixed left-0 right-0 bottom-0 flex justify-center pointer-events-none z-50 bg-zinc-900">
              <form
                className={`
                  w-full max-w-2xl mb-6 flex gap-2 items-center pointer-events-auto
                  border-2 border-emerald-400/80 rounded-2xl
                  shadow-[0_0_34px_0_rgba(16,185,129,0.17)]
                  `}
                style={{
                  boxShadow: "0 0 34px 0 rgba(16,185,129,0.17), 0 0 8px 0 rgba(16,185,129,0.13)"
                }}
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input
                  placeholder="Ask anything..."
                  className="w-full h-12 bg-zinc-800 border-none rounded-2xl pl-4 pr-24 text-base"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-zinc-800 text-zinc-400"
                  disabled={isLoading}
                  type="button"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!prompt.trim() || isLoading}
                  className="bg-emerald-500/80 hover:bg-emerald-400 text-black rounded-lg h-10 w-10 flex items-center justify-center"
                  type="submit"
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
