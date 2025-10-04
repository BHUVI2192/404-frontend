import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { registerUser } from "@/lib/api"; // Step 1: Import the API function

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 25, label: "Weak" };
    if (password.length < 10) return { strength: 50, label: "Fair" };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
      return { strength: 65, label: "Good" };
    return { strength: 100, label: "Strong" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Step 2: Update the handleSubmit function to be async and call the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    // --- Frontend validation remains the same ---
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    // --- Backend API call ---
    try {
      // Call the registerUser function from our api.ts file
      const data = await registerUser(formData.email, formData.password);

      // Store the token and show success message
      localStorage.setItem("token", data.access_token);
      toast.success("Account created successfully!");
      
      // Redirect the user to the dashboard
      navigate("/dashboard");

    } catch (error: unknown) {
      // If the API call fails, show the error message from the backend
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : String(error)
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
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              Start building with 404 today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="h-12"
                disabled={isLoading} // Disable input when loading
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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

              {formData.password && (
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        passwordStrength.strength === 100
                          ? "bg-green-500"
                          : passwordStrength.strength >= 65
                          ? "bg-blue-500"
                          : passwordStrength.strength >= 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Strength: {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="h-12 pr-12"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
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
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-accent font-medium hover:underline">
              Log In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;