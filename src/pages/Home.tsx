import { Link } from "react-router-dom";
import { Brain, Shield, Sparkles, Code, Palette, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const glass =
  "backdrop-blur-xl bg-black/60 dark:bg-black/80 border border-white/10 shadow-xl";

const features = [
  {
    icon: Brain,
    title: "Persistent Memory",
    description: "A personal project notebook that tracks every idea, never losing context across sessions.",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description: "An incognito mode for complete data privacy. Your work stays yours, always.",
    gradient: "from-teal-400 to-green-600",
  },
  {
    icon: Sparkles,
    title: "Unified Studio",
    description: "Code, design, and create in one seamless space. No switching between tools.",
    gradient: "from-emerald-400 to-lime-500",
  },
];

const capabilities = [
  { icon: Code, label: "Code Editor" },
  { icon: Palette, label: "Image Generation" },
  { icon: MessageSquare, label: "AI Assistant" },
];

const Home = () => (
  <div className="min-h-screen bg-black relative overflow-hidden text-white flex flex-col">
    <Navbar />
    {/* Background Glow and Stars */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Starfield */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        {[...Array(88)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * 1.2 + 0.4}
            fill="#fff"
            opacity={Math.random() * 0.14 + 0.10}
          />
        ))}
      </svg>
      {/* Top green glow rays */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[340px]" aria-hidden="true">
        <defs>
          <radialGradient id="greenRay" cx="50%" cy="6%" r="85%">
            <stop offset="0%" stopColor="#49ffcb" stopOpacity="0.18" />
            <stop offset="65%" stopColor="#1ff997" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#020" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="50%" cy="20%"
          rx="760" ry="120"
          fill="url(#greenRay)"
          filter="blur(38px)"
        />
      </svg>
    </div>
    {/* GLASS Content */}
    <main className="relative z-10 flex-1">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center min-h-[72vh] pt-36 pb-28">
        <div className={`max-w-3xl w-full px-8 py-16 mx-auto flex flex-col items-center text-center rounded-3xl ${glass}`}>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_4px_26px_#33ffbc]">
            Your Private AI Workspace
          </h1>
          <p className="text-lg md:text-2xl text-emerald-100/90 mb-8">
            Create, learn, and build with a memory that never forgets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/signup" aria-label="Sign up for free">
              <Button
                type="button"
                size="lg"
                className="text-lg px-8 py-6 gradient-accent shadow-glow hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
              >
                Sign Up for Free
              </Button>
            </Link>
            <Link to="/login" aria-label="Log in">
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
              >
                Log In
              </Button>
            </Link>
          </div>
          <div className="flex gap-4 justify-center mt-2">
            {capabilities.map((cap) => (
              <span key={cap.label} className="flex items-center gap-2 text-emerald-200/80">
                <cap.icon className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm hidden sm:inline">{cap.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_32px_#22fb9377]">
              Built for Creators
            </h2>
            <p className="text-xl text-emerald-200/80 max-w-2xl mx-auto">
              Three core pillars that make 404 the most powerful private AI workspace
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className={`p-8 rounded-3xl border-0 group shadow-xl hover:shadow-emerald-400/30 hover:-translate-y-2 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-all ${glass}`}
                tabIndex={0}
                aria-label={feature.title}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform drop-shadow-[0_2px_24px_#14fa8699]`}
                >
                  <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-emerald-100/90 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className={`max-w-3xl mx-auto px-8 py-16 rounded-3xl text-center border-0 shadow-2xl ${glass}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_4px_32px_#2fffca99]">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-emerald-100/90 mb-8 max-w-2xl mx-auto">
            Join students and professionals who are building the future with 404.
          </p>
          <Link to="/signup" aria-label="Get started free">
            <Button
              type="button"
              size="lg"
              className="text-lg px-12 py-6 bg-emerald-400/90 text-black hover:bg-emerald-300 shadow-glow hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </main>
    {/* --- GLOWING SEMICIRCLE FOREGROUND: BOTTOM HALF ONLY --- */}
    <svg
      className="fixed left-1/2 bottom-[-70px] -translate-x-1/2 z-30 pointer-events-none w-[900px] h-[260px] md:w-[1100px] md:h-[340px]"
      viewBox="0 0 24 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: 350 }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="greenGlow" cx="50%" cy="80%" r="80%">
          <stop offset="0%" stopColor="#39ffa9" stopOpacity="0.83" />
          <stop offset="55%" stopColor="#00FF99" stopOpacity="0.28" />
          <stop offset="85%" stopColor="#08f276" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-glow" x="-24" y="-12" width="72" height="36" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
      </defs>
      {/* Only bottom semicircle with strong green glow */}
      <path
        d="M12 12m-9 0a9 9 0 1 0 18 0"
        fill="url(#greenGlow)"
        filter="url(#blur-glow)"
        opacity="0.95"
      />
      {/* Optionally, a subtle brighter stroke for top edge */}
      <path
        d="M3 12a9 9 0 1 0 18 0"
        stroke="#55FFBB"
        strokeWidth="0.38"
        opacity="0.19"
      />
    </svg>
    <footer className="border-t border-white/10 py-12 bg-transparent relative z-20">
      <div className="container mx-auto px-4 text-center text-emerald-200/70">
        <p>&copy; 2024 404. Your private AI workspace.</p>
      </div>
    </footer>
  </div>
);

export default Home;
