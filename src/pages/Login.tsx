import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { loginUser } from "@/lib/api"; // Step 1: Import the API function

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Step 2: Update the handleSubmit function to be async and call the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    // --- Frontend validation ---
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // --- Backend API call ---
    try {
      // Call the loginUser function from our api.ts file
      const data = await loginUser(formData.email, formData.password);

      // Store the token and show success message
      localStorage.setItem("token", data.access_token);
      toast.success("Welcome back!");
      
      // Redirect the user to the dashboard
      navigate("/dashboard");

    } catch (error: unknown) {
      // If the API call fails, show the error message from the backend
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "An error occurred during login"
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <Card className="w-full max-w-md p-8 gradient-card shadow-2xl border-0">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-accent shadow-glow mb-4">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Log in to continue your work
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                disabled={isLoading}
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
                  disabled={isLoading}
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
              disabled={isLoading} // Step 3: Disable button while loading
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
