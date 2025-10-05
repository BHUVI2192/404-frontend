import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, TrendingUp, CloudSun, Sun, Search, Mic, Paperclip, ArrowUp, User, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Define the structure of a message
interface Message {
  sender: 'user' | 'ai';
  text: string;
  model_used?: string;
}

// Widget data
const widgets = [
  { icon: Clock, title: "Shimoga", value: "1:51 AM" }, // Updated time
  { icon: Sun, title: "Incognito Mode", description: "Your activity won’t be saved." },
  { icon: TrendingUp, title: "NVDA", value: "$187.62", change: "-0.97%", changeColor: "text-red-500" },
  { icon: CloudSun, title: "Shimoga, India", value: "21°C", description: "Partly cloudy" },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setPrompt("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ prompt: userMessage.text })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Something went wrong");
      }

      const data = await response.json();
      const aiMessage: Message = { sender: 'ai', text: data.response, model_used: data.model_used };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      setMessages(prev => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen w-full flex bg-zinc-900 text-zinc-300 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
          
          {/* Top Input Area */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              placeholder="Ask anything..."
              className="w-full h-14 bg-zinc-800 border-zinc-700 rounded-2xl pl-12 pr-28 text-base focus-visible:ring-1 focus-visible:ring-blue-500"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-zinc-700 text-zinc-400" disabled={isLoading}><Paperclip className="w-5 h-5" /></Button>
              <Button onClick={handleSendMessage} disabled={!prompt.trim() || isLoading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-9 w-9 p-0"><ArrowUp className="w-5 h-5" /></Button>
            </div>
          </div>

          {/* Dynamic Content: Widgets or Chat */}
          <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
            {messages.length === 0 && !isLoading ? (
              // Show widgets when there are no messages
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {widgets.map((widget, index) => (
                  <Card key={index} className="bg-zinc-800 border-zinc-700 rounded-2xl p-4 flex flex-col justify-between">
                    <CardContent className="p-0">
                      <div className="flex justify-between items-start mb-4"><widget.icon className="w-5 h-5 text-zinc-400" />{widget.change && <span className={`text-sm font-semibold ${widget.changeColor}`}>{widget.change}</span>}</div>
                      <div>
                        <p className="text-sm text-zinc-400">{widget.title}</p>
                        {widget.value && <p className="text-2xl font-semibold text-zinc-100">{widget.value}</p>}
                        {widget.description && <p className="text-xs text-zinc-500 mt-1">{widget.description}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Show chat history once a conversation starts
              <div className="space-y-6 pr-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0"><Bot size={20} /></div>}
                    <div className={`max-w-xl p-4 rounded-2xl ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-zinc-800 text-zinc-300 rounded-bl-none'}`}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      {message.sender === 'ai' && message.model_used && <p className="text-xs text-zinc-500 mt-2 opacity-70">Answered by: {message.model_used}</p>}
                    </div>
                    {message.sender === 'user' && <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0"><User size={20} /></div>}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-4 justify-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 animate-pulse"><Bot size={20} /></div>
                    <div className="max-w-xl p-4 rounded-2xl bg-zinc-800 text-zinc-300 rounded-bl-none">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-75"></div><div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></div></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

