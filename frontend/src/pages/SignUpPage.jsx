import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md space-y-10">
          {/* Logo */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-3 group">
              <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                <MessageSquare className="size-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-base-content/70">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="flex items-center border border-base-300 rounded-xl overflow-hidden bg-base-100 focus-within:ring-2 focus-within:ring-primary transition">
                <span className="px-4 text-base-content/40">
                  <User className="size-5" />
                </span>
                <input
                  type="text"
                  className="flex-1 bg-transparent p-3 focus:outline-none"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="flex items-center border border-base-300 rounded-xl overflow-hidden bg-base-100 focus-within:ring-2 focus-within:ring-primary transition">
                <span className="px-4 text-base-content/40">
                  <Mail className="size-5" />
                </span>
                <input
                  type="email"
                  className="flex-1 bg-transparent p-3 focus:outline-none"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative flex items-center border border-base-300 rounded-xl overflow-hidden bg-base-100 focus-within:ring-2 focus-within:ring-primary transition">
                <span className="px-4 text-base-content/40">
                  <Lock className="size-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="flex-1 bg-transparent p-3 focus:outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Sign in Link */}
          <div className="text-center text-base-content/70">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
