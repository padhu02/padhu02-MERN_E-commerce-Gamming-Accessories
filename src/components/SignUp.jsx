import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Converted styles to Tailwind CSS classes; original Sign-up.css not required
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

const SignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowBackdrop(true);
    return () => setShowBackdrop(false);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value) && value !== "") return;
      if (value.length > 10) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 5)
      newErrors.address = "Please enter a valid address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms & conditions";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      console.log("Registering user:", formData.email);
      
      // Send registration data to backend API
      const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "");
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
        }),
      });

      console.log("Registration response status:", response.status);
      
      const data = await response.json();
      console.log("Registration response:", data);

      if (!response.ok) {
        const errorMsg = data.message || "Registration failed";
        console.error("Registration error:", errorMsg);
        setErrors({ submit: errorMsg });
        setIsLoading(false);
        return;
      }

      console.log("✅ Registration successful!");
      
      // Save token to localStorage
      localStorage.setItem("authToken", data.token || "auth-token");
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userData", JSON.stringify(data.user));

      setSuccessMessage("Registration successful! Redirecting to login...");
      alert("Registration Successful...");

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
      });

      setTimeout(() => {
        console.log("Redirecting to login...");
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration Error:", error);
      setErrors({ submit: "Network error: " + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={onClose ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" : "h-[70vh] flex items-center justify-center p-4"} onClick={onClose ? onClose : undefined}>
      {showBackdrop && (
        <div className="fixed inset-0 z-10 bg-black/10 backdrop-blur-sm"></div>
      )}
      <div className="relative z-20 w-full max-w-md bg-white rounded-lg shadow-md p-4 max-h-[90vh] overflow-y-auto" onClick={onClose ? (e) => e.stopPropagation() : undefined}>
        <div className="text-center mb-2 relative">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">All fields are required</p>
          {onClose && (
            <button
              type="button"
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={onClose || (() => navigate(-1))}
            >
              ×
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-2" autoComplete="on">
          {/* Hidden dummy inputs for browser auto-fill */}
          <input type="text" name="fakeUsername" style={{ display: "none" }} />
          <input
            type="password"
            name="fakePassword"
            style={{ display: "none" }}
          />

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded">
              {errors.submit}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded">
              {successMessage}
            </div>
          )}

          {/* Full Name */}
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              autoComplete="name"
            />
            {errors.name && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-sm text-gray-700">
                +91
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit number"
                className={`w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoading}
                maxLength="10"
                autoComplete="tel"
              />
            </div>
            {errors.phone && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Address */}
          <div className="mb-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              autoComplete="street-address"
            />
            {errors.address && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.address}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min 8 characters)"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-600"
              >
                {showPassword ? <BiSolidShow /> : <BiSolidHide />}
              </span>
            </div>
            {errors.password && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-600"
              >
                {showPassword ? <BiSolidShow /> : <BiSolidHide />}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="termsAccepted" className="text-sm text-gray-700 pl-2">
              I accept the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                Terms & Conditions
              </a>{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.termsAccepted && (
            <span className="text-sm text-red-600 mt-1 block">
              {errors.termsAccepted}
            </span>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            disabled={isLoading || !formData.termsAccepted}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center text-sm mt-4 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-indigo-600 font-medium ml-1">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
