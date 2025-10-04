import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Play,
  Save,
  Settings,
  MessageSquare,
  Image as ImageIcon,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Studio = () => {
  const [code, setCode] = useState(`# Welcome to 404 Studio
print("Hello, World!")

# Your AI assistant is ready to help
# Switch to the AI Chat tab to start a conversation
`);

  const handleSave = () => {
    toast.success("Project saved!");
  };

  const handleRun = () => {
    toast.info("Running code...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              404
            </span>
          </Link>
          <div className="h-8 w-px bg-border" />
          <span className="text-sm font-medium text-muted-foreground">
            My First AI Project
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button onClick={handleSave} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleRun} className="gradient-accent">
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-r">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-semibold">Code Editor</h2>
          </div>
          <div className="flex-1 p-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full font-mono text-sm resize-none bg-muted/30 border-0 focus-visible:ring-0"
              placeholder="Start coding..."
            />
          </div>
        </div>

        {/* Right Panel - AI & Image Gen */}
        <div className="w-[480px] flex flex-col bg-card/30">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="chat" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="image" className="flex-1">
                <ImageIcon className="w-4 h-4 mr-2" />
                Image Gen
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col m-0">
              <div className="flex-1 p-6 overflow-auto space-y-4">
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow shrink-0">
                      <Brain className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">
                        Hello! I'm your AI assistant. I'm here to help you code,
                        debug, and create. What would you like to work on today?
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="p-4 border-t">
                <Textarea
                  placeholder="Ask me anything..."
                  className="min-h-[80px] resize-none"
                />
                <Button className="w-full mt-2 gradient-accent">
                  Send Message
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="image" className="flex-1 flex flex-col m-0">
              <div className="flex-1 p-6 overflow-auto">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Image Prompt
                    </label>
                    <Textarea
                      placeholder="Describe the image you want to generate..."
                      className="min-h-[120px] resize-none"
                    />
                  </div>
                  <Button className="w-full gradient-accent">
                    Generate Image
                  </Button>
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">Generated Images</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center"
                        >
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Studio;
