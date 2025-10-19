import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { registerUser } from "@/lib/api";

// Simple Google icon (SVG)
const GoogleIcon = (
  <svg viewBox="0 0 32 32" className="w-5 h-5 mr-2" aria-hidden="true">
    <g>
      <path fill="#4285F4" d="M31.96 16.251c0-1.153-.1-2.007-.314-2.751H16.253v5.016h8.651c-.177 1.356-1.13 3.384-3.25 4.757l-.03.2 4.727 3.667.328.033c3.01-2.774 4.749-6.853 4.749-10.922"/>
      <path fill="#34A853" d="M16.253 31c4.054 0 7.448-1.34 9.927-3.646l-4.735-3.67c-1.273.889-2.993 1.507-5.192 1.507-3.991 0-7.373-2.689-8.583-6.408l-.179.018-4.635 3.618-.062.168C3.85 28.143 9.683 31 16.253 31"/>
      <path fill="#FBBC05" d="M7.67 19.785a8.887 8.887 0 0 1-.491-2.828c0-.983.178-1.935.481-2.828l-.008-.189L3.018 10.271l-.154.073A14.756 14.756 0 0 0 1.253 16c0 2.407.581 4.695 1.611 6.812l6.028-3.027"/>
      <path fill="#EA4335" d="M16.253 7.35c2.438 0 4.081 1.055 5.021 1.937l3.663-3.581C23.692 3.744 20.307 2 16.253 2 9.683 2 3.85 4.857 1.253 9.188l6.029 3.027c1.211-3.719 4.592-6.408 8.971-6.408"/>
    </g>
  </svg>
);

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 25, label: "Weak" };
    if (password.length < 10) return { strength: 50, label: "Fair" };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
      return { strength: 65, label: "Good" };
    return { strength: 100, label: "Strong" };
  };
  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    try {
      const data = await registerUser(formData.email, formData.password);
      localStorage.setItem("token", data.access_token);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? error.message
          : String(error)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth handler
  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/google/login");
      if (!response.ok) throw new Error("Unable to redirect to Google.");
      const data = await response.json();
      window.location.href = data.authorizationurl;
    } catch (error) {
      toast.error("Failed to start Google signup.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111]">
      {/* Extreme left top 404 AI button */}
      <div className="fixed top-0 left-0 w-full flex px-6 py-5 items-center z-40">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/10 hover:bg-emerald-950/40 transition border border-emerald-500/10 shadow text-emerald-300 font-bold text-lg"
          onClick={() => navigate("/")}
        >
          404 AI
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        <Card
          className="
            w-full max-w-[360px] min-h-[510px] bg-[rgba(14,22,18,0.98)]
            border-none rounded-2xl px-7 py-8
            shadow-[0_6px_32px_0_#00ffc244,0_0px_1px_#009e5b]
            flex flex-col justify-center
          "
        >
          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold tracking-tight text-emerald-300 mb-1">
              404 Society
            </h2>
            <h1 className="text-xl font-semibold text-white mb-1">
              Join The Society
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Create an account to get started
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-white font-medium mb-1 block">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="h-10 rounded-md border border-emerald-400/25 bg-[#181d19] text-white px-4 focus:border-emerald-400"
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white font-medium mb-1 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="h-10 rounded-md border border-emerald-400/25 bg-[#181d19] text-white px-4 focus:border-emerald-400"
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white font-medium mb-1 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="h-10 rounded-md border border-emerald-400/25 bg-[#181d19] text-white px-4 pr-11 focus:border-emerald-400"
                  disabled={isLoading || isGoogleLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="space-y-1 pt-2">
                  <div className="h-2 rounded-full bg-[#182617] overflow-hidden">
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
                  <p className="text-xs text-gray-400">
                    Strength: {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-white font-medium mb-1 block">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="h-10 rounded-md border border-emerald-400/25 bg-[#181d19] text-white px-4 pr-11 focus:border-emerald-400"
                  disabled={isLoading || isGoogleLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-11 rounded-md bg-gradient-to-r from-emerald-400 to-green-400 text-black font-semibold shadow hover:from-emerald-300 hover:to-green-500 transition mt-3"
              disabled={isLoading || isGoogleLoading}
              aria-busy={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          {/* Google Sign Up Button below */}
          <Button
            variant="outline"
            type="button"
            className="w-full h-11 rounded-md !bg-white text-black font-semibold shadow flex items-center justify-center hover:shadow-lg hover:brightness-95 transition mt-4"
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading || isLoading}
            aria-busy={isGoogleLoading}
          >
            {GoogleIcon}
            {isGoogleLoading ? "Redirecting..." : "Sign Up with Google"}
          </Button>
          <div className="mt-7 text-center text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/login" className="text-emerald-300 font-bold hover:underline ml-1">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
