import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { loginUser } from "@/lib/api";

// Official accessible Google logo SVG
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" aria-hidden="true">
    <g>
      <path fill="#4285F4" d="M44.5 20H24v8.5h11.9C34.7 33.9 29.7 38 24 38c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.9 7.2 29.7 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19c9.5 0 17.2-7.3 18.7-16.8H44.5z"/>
      <path fill="#34A853" d="M6.3 14.7l6.7 4.8C15.1 16.2 19.1 13.5 24 13.5c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.9 7.2 29.7 5 24 5 13.5 5 5 13.5 5 24c0 3.5 1.1 6.8 3 9.5l7-8.4z"/>
      <path fill="#FBBC05" d="M24 44c5.7 0 10.9-1.8 14.9-4.9l-7-6c-2 1.4-4.6 2.3-7.7 2.3-5.7 0-10.5-3.9-12.2-9l-7.1 5.5C9.1 38.5 16 44 24 44z"/>
      <path fill="#EA4335" d="M44.5 20H24v8.5h11.9c-1.7 4.1-6.3 7.5-11.9 7.5-5.7 0-10.5-3.9-12.2-9l-7.1 5.5C9.1 38.5 16 44 24 44c9.5 0 17.2-7.3 18.7-16.8H44.5z"/>
    </g>
  </svg>
);

const GOOGLE_AUTH_URL = "http://127.0.0.1:8000/auth/google/login"; // Update for production!

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    try {
      const data = await loginUser(formData.email, formData.password);
      localStorage.setItem("token", data.access_token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      const errorMsg =
        typeof error === "object" && error !== null && "message" in error
          ? error.message
          : "An error occurred during login";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // Only one endpoint, always redirect from backend!
      const response = await fetch(GOOGLE_AUTH_URL);
      if (!response.ok) throw new Error("Could not get Google login URL from server.");
      const data = await response.json();
      // Accept any backend key for the URL, fallback guarantee:
      window.location.href = data.authorization_url || data.authorizationurl || data.url;
    } catch (error) {
      toast.error("Could not start Google login.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111]">
      <div className="fixed top-0 left-0 w-full flex px-6 py-5 items-center z-40">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/10 hover:bg-white transition border border-emerald-500/10 shadow text-emerald-300 font-bold text-lg hover:text-black"
          onClick={() => navigate("/")}
        >
          404 AI
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        <Card
          className="
            w-full max-w-[360px] min-h-[480px] bg-[rgba(14,22,18,0.93)]
            border-none rounded-[1.4rem]
            px-8 py-10
            shadow-[0_4px_48px_6px_#00ffc262,0_0_2px_#03eb8c,0_2px_32px_#0b43252e]
            flex flex-col justify-center
          "
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
              404 Society
            </h2>
            <h1 className="text-2xl font-semibold text-white mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-base mt-1">
              Sign in to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 flex flex-col mt-2">
            <div className="text-left">
              <Label htmlFor="email" className="text-white mb-1 block">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="h-12 rounded-lg border border-[#252] bg-[#181e17] text-white px-5 focus:border-emerald-400 shadow-inner"
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div className="text-left">
              <Label htmlFor="password" className="text-white mb-1 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 rounded-lg border border-[#252] bg-[#181e17] text-white px-5 pr-12 focus:border-emerald-400 shadow-inner"
                  disabled={isLoading || isGoogleLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-green-300 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs text-emerald-200 mt-2 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base rounded-lg bg-gradient-to-r from-emerald-400 to-green-400 shadow-[0_2px_18px_#19efb688] text-black font-semibold hover:from-emerald-300 hover:to-green-500 transition"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isLoading}
              variant="outline"
              className="w-full justify-center mt-1 bg-white text-black py-2 rounded-lg border border-emerald-300/30 flex items-center font-medium transition-colors hover:bg-[#f3f3f3] hover:text-black active:bg-[#e0e0e0]"
              aria-busy={isGoogleLoading}
              aria-label="Sign in with Google"
            >
              <GoogleIcon />
              {isGoogleLoading ? "Redirecting..." : "Sign in with Google"}
            </Button>
          </form>
          <div className="mt-10 text-center text-base">
            <span className="text-gray-400">Don't have an account? </span>
            <Link to="/signup" className="text-emerald-300 font-bold hover:underline ml-1">
              Sign Up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
