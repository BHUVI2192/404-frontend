import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { loginUser } from "@/lib/api";

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.92C34.553 6.08 29.658 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.92C34.553 6.08 29.658 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.225 0-9.652-3.512-11.303-8H6.306C9.656 35.663 16.318 40 24 40z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303A12.04 12.04 0 0 1 31.697 34.81l6.19-5.238C41.333 26.6 44 23.4 44 20c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (error: unknown) {
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/google/login');
      if (!response.ok) {
        throw new Error("Could not get Google login URL from server.");
      }
      const data = await response.json();
      
      window.location.href = data.authorization_url;

    } catch (error: unknown) {
        const errorMessage = typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : "An error occurred during Google login";
        toast.error(errorMessage);
        setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* --- THE FIX: Use h-full to fill remaining space --- */}
      <div className="flex-1 h-full flex items-center justify-center px-4 py-8">
        {/* --- THE FIX: Slightly reduce padding from p-8 to p-6 --- */}
        <Card className="w-full max-w-md p-6 gradient-card shadow-2xl border-0">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-accent shadow-glow mb-4">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Log in to continue your work
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              type="button"
              className="w-full h-12 text-base"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isLoading}
            >
              <GoogleIcon />
              {isGoogleLoading ? "Redirecting..." : "Sign in with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="h-12"
                disabled={isLoading || isGoogleLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="h-12 pr-12"
                  disabled={isLoading || isGoogleLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg gradient-accent shadow-glow"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="text-accent font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
