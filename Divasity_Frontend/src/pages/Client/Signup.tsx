import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader, User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { images } from "../../constants";

export function Signup() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

  // Error state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Loading state for API call
  const [isLoading, setIsLoading] = useState(false);
  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Current form step
  const [step, setStep] = useState(1);

  // Handle input change
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on change
  };

  // Basic validation for current step
  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (!form.address.trim()) newErrors.address = "Address is required";
    } else if (step === 2) {
      if (!form.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Email is invalid";
      }
      
      if (!form.password) {
        newErrors.password = "Password is required";
      } else if (form.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      
      if (!form.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      setStep(2);
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    setIsLoading(true);

    // Generate username from firstName and lastName in lowercase
    const userName = `${form.firstName.trim().toLowerCase()}_${form.lastName.trim().toLowerCase()}`;

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          userName: userName,
          address: form.address,
          lastName: form.lastName,
          telephone: form.phone,
          role: form.role,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ api: errorData.message || "Signup failed. Please try again." });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      navigate(`/verify/${form.email}`); // Redirect to OTP route with email as param
    } catch (error) {
      setErrors({ api: "An error occurred. Please try again later." });
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5 z-0"></div>
      
      <div className="grid md:grid-cols-2 gap-0 w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 relative">
        {/* Left Side - Decorative */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500"></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: `url(${images.SignupBg})`}}></div>
          <div className="relative h-full flex flex-col justify-center items-center p-16 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-8">Join Divasity Today</h2>
              <p className="text-white/80 mb-12 text-lg leading-relaxed">
                Create an account to start investing in innovative projects or launch your own fundraising campaign.
              </p>
              <div className="flex justify-center">
                <img src={images.Logo} alt="Logo" className="h-32 w-auto" />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <motion.div 
          className="p-10 md:p-16 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:hidden flex justify-center mb-8">
            <img src={images.Logo} alt="Logo" className="h-20 w-auto" />
          </div>
          
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Create Account</h2>
            <p className="text-gray-600 mb-8 text-lg">Join our community of innovators and investors</p>
            
            {/* Progress Steps */}
            <div className="flex items-center mb-10">
              <div className="flex-1">
                <div className={`h-2 rounded-full ${step >= 1 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                <p className={`text-xs mt-1 ${step >= 1 ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>Personal Info</p>
              </div>
              <div className="w-10 flex justify-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
              </div>
              <div className="flex-1">
                <div className={`h-2 rounded-full ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                <p className={`text-xs mt-1 text-right ${step >= 2 ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>Account Setup</p>
              </div>
            </div>
          </motion.div>

          {errors.api && (
            <motion.div 
              variants={itemVariants}
              className="mb-8 bg-red-50 p-6 rounded-xl border border-red-100"
            >
              <p className="text-sm text-red-600">{errors.api}</p>
            </motion.div>
          )}

          {step === 1 ? (
            <motion.div className="space-y-6" variants={itemVariants}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.firstName ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200`}
                      placeholder="First Name"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.lastName ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200`}
                      placeholder="Last Name"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.phone ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200`}
                    placeholder="Phone Number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.address ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200`}
                    placeholder="Address"
                  />
                </div>
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div className="space-y-6" variants={itemVariants}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200`}
                    placeholder="Email Address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200`}
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff size={18} aria-hidden="true" />
                      ) : (
                        <Eye size={18} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.confirmPassword ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200`}
                    placeholder="Confirm Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} aria-hidden="true" />
                      ) : (
                        <Eye size={18} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex gap-4 pt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 px-6 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-75 transition-all duration-200"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader size={18} className="animate-spin mr-2" />
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </motion.div>
          )}

          <motion.div className="mt-12 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                Sign In
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}