import { Link } from "react-router-dom";
import { Brain, Shield, Sparkles, Code, Palette, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Persistent Memory",
      description: "A personal project notebook that tracks every idea, never losing context across sessions.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Privacy-First",
      description: "An incognito mode for complete data privacy. Your work stays yours, always.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Sparkles,
      title: "Unified Studio",
      description: "Code, design, and create in one seamless space. No switching between tools.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const capabilities = [
    { icon: Code, label: "Code Editor" },
    { icon: Palette, label: "Image Generation" },
    { icon: MessageSquare, label: "AI Assistant" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 gradient-hero opacity-90" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Your Private AI Workspace
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Create, learn, and build with a memory that never forgets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 gradient-accent shadow-glow hover:scale-105 transition-transform"
                >
                  Sign Up for Free
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                >
                  Log In
                </Button>
              </Link>
            </div>

            <div className="flex gap-6 justify-center pt-8">
              {capabilities.map((cap) => (
                <div key={cap.label} className="flex items-center gap-2 text-white/80">
                  <cap.icon className="w-5 h-5" />
                  <span className="text-sm hidden sm:inline">{cap.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Built for Creators
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three core pillars that make 404 the most powerful private AI workspace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Card 
                key={feature.title}
                className="p-8 gradient-card border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center gradient-hero border-0 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join students and professionals who are building the future with 404.
            </p>
            <Link to="/signup">
              <Button 
                size="lg"
                className="text-lg px-12 py-6 bg-white text-primary hover:bg-white/90 shadow-glow hover:scale-105 transition-transform"
              >
                Get Started Free
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 404. Your private AI workspace.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
