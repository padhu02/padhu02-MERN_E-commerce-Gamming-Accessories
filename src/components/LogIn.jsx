import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// Converted styles to Tailwind CSS classes; removed separate stylesheet

const LogIn = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setShowSignUp } = useModal();

  useEffect(() => {
    // Cleanup when component unmounts
    return () => setShowBackdrop(false);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("📝 Form submitted!");
    console.log("📋 Form data:", formData);
    
    // Validation
    if (!formData.email || !formData.password) {
      const newErrors = { 
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : ""
      };
      console.log("❌ Validation failed:", newErrors);
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const emailValue = formData.email.trim();
      const passwordValue = formData.password;
      
      console.log("🔍 Attempting login with:", { 
        email: emailValue, 
        passwordLength: passwordValue.length 
      });
      
      const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "");
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      console.log("📊 Response status:", response.status);
      console.log("📊 Response ok:", response.ok);
      
      const data = await response.json();
      console.log("📥 Response data:", data);

      if (!response.ok) {
        const errorMsg = data.message || "Login failed";
        console.error("❌ Login failed:", errorMsg);
        setErrors({ submit: errorMsg });
        setIsLoading(false);
        return;
      }

      console.log("✅ Login successful!");
      console.log("🔑 Token:", data.token);
      console.log("👤 User:", data.user);

      // Save authentication data
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userData", JSON.stringify(data.user));

      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      console.log("💾 Auth data saved to localStorage");
      setErrors({ submit: "✅ Login successful! Redirecting..." });

      // Redirect after 300ms
      setTimeout(() => {
        console.log("🚀 Navigating to /products...");
        navigate("/products", { replace: true });
      }, 300);
      
    } catch (error) {
      console.error("💥 Login error:", error);
      console.error("💥 Error message:", error.message);
      console.error("💥 Error stack:", error.stack);
      setErrors({ submit: "Network error: " + error.message });
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // In a real app, this would redirect to OAuth endpoint
    window.location.href = `https://your-api.com/auth/${provider.toLowerCase()}`;
  };

 return (
  <div className={onClose ? "fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4"} onClick={onClose ? onClose : undefined}>
    {(showBackdrop || isLoading) && (
      <div className={isLoading ? "fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center" : "fixed inset-0 z-10 bg-black/20 backdrop-blur-md"}>
        {isLoading && <div className="text-white bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full shadow-lg animate-pulse">Signing in...</div>}
      </div>
    )}
    <div className={`relative z-20 w-full max-w-md ${onClose ? "h-[80vh]" : "h-auto"} bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-5 transform transition-all duration-300 overflow-y-auto`} onClick={onClose ? (e) => e.stopPropagation() : undefined}>

      {/* Header */}
      <div className="text-center mb-3 relative">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-0.5">Welcome Back</h2>
        <p className="text-gray-600 text-xs font-medium">Sign in to continue shopping</p>
        {onClose && (
          <button
            type="button"
            className="absolute top-0 right-0 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={onClose || (() => navigate(-1))}
          >
            ×
          </button>
        )}
      </div>

      {/* Success / Error */}
      {errors.submit && (
        <div
          className={
            errors.submit.includes("✅")
              ? "bg-green-50 border border-green-200 text-green-800 px-2 py-1.5 rounded mb-2 text-xs"
              : "bg-red-50 border border-red-200 text-red-800 px-2 py-1.5 rounded mb-2 text-xs"
          }
        >
          {errors.submit}
        </div>
      )}

      {/* Debug Info */}
      <div className="text-xs text-gray-400 mb-2 p-2 bg-gray-50 rounded">
        <p>🔧 Backend: http://localhost:4000</p>
        <p>✓ API Status: {isLoading ? "Connecting..." : "Ready"}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2">

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400 text-sm" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
              className={`w-full pl-9 pr-3 py-2 text-sm border-2 rounded-lg bg-gray-50 focus:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'}`}
            />
          </div>
          {errors.email && <span className="text-xs text-red-600 mt-0.5 block font-medium">{errors.email}</span>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <FaLock className="text-gray-400 text-sm" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={isLoading}
              className={`w-full pl-9 pr-10 py-2 text-sm border-2 rounded-lg bg-gray-50 focus:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'}`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-600 mt-0.5 block font-medium">{errors.password}</span>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center space-x-1">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-3 w-3 text-indigo-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">Remember Me</span>
          </label>

          <Link to="/forgot-password" className="text-xs text-indigo-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1.5 px-4 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Social Login */}
      <div className="mt-2 text-center text-xs text-gray-500">
        <p className="text-xs">or continue with</p>

        <div className="mt-1.5 flex items-center justify-center gap-2">
          <button onClick={() => handleSocialLogin("Google")} className="px-2 py-0.5 text-xs border rounded hover:bg-gray-100">Google</button>
          <button onClick={() => handleSocialLogin("Facebook")} className="px-2 py-0.5 text-xs border rounded hover:bg-gray-100">Facebook</button>
        </div>
      </div>

      {/* Signup */}
      <div className="text-center mt-2 pt-2 border-t border-gray-200">
        <p className="text-gray-600 mb-0.5 text-xs">Don't have an account?</p>
        <button 
          onClick={() => setShowSignUp(true)} 
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-blue-700 text-xs"
        >
          Create Account
        </button>
      </div>

    </div>
  </div>
);

};

export default LogIn;
