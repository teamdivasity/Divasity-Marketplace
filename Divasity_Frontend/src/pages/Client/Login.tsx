import { FormField } from "../../components/Form/Form";
import { images } from "../../constants";
import { useState, useEffect } from "react";
import { CustomButton } from "../../components/Button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Mail, Lock, Eye, EyeOff, Shield, AlertCircle, CheckCircle, Smartphone, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

export function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    api: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [biometricSupported, setBiometricSupported] = useState(false);
  const navigate = useNavigate();
  const { login, setLoading, setError } = useAuthStore();

  useEffect(() => {
    // Check if biometric authentication is supported
    if ('credentials' in navigator && 'create' in navigator.credentials) {
      setBiometricSupported(true);
    }

    // Check for blocked status
    const blockedUntil = localStorage.getItem('loginBlockedUntil');
    if (blockedUntil && new Date(blockedUntil) > new Date()) {
      setIsBlocked(true);
      const timeLeft = Math.ceil((new Date(blockedUntil).getTime() - new Date().getTime()) / 1000);
      setBlockTimeLeft(timeLeft);
      
      const timer = setInterval(() => {
        setBlockTimeLeft(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            localStorage.removeItem('loginBlockedUntil');
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '', api: '' };

    if (!form.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleBiometricLogin = async () => {
    try {
      if (!biometricSupported) {
        toast.error('Biometric authentication not supported');
        return;
      }

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          userVerification: 'required'
        }
      });

      if (credential) {
        toast.success('Biometric authentication successful');
        // Handle biometric login success
      }
    } catch (error) {
      toast.error('Biometric authentication failed');
    }
  };

  const handleTwoFactorSubmit = async () => {
    if (twoFactorCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users/verify-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          code: twoFactorCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid verification code');
      }

      const data = await response.json();
      login(data.data, data.token);
      toast.success('Login successful!');
      navigate("/updates");
    } catch (error) {
      toast.error('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (isBlocked) {
      toast.error(`Too many failed attempts. Try again in ${Math.ceil(blockTimeLeft / 60)} minutes.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          rememberMe: rememberMe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle failed login attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 5) {
          const blockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
          localStorage.setItem('loginBlockedUntil', blockUntil.toISOString());
          setIsBlocked(true);
          setBlockTimeLeft(15 * 60);
          toast.error('Too many failed attempts. Account temporarily blocked.');
        } else {
          toast.error(`${errorData.message || "Login failed"}. ${5 - newAttempts} attempts remaining.`);
        }
        
        setErrors({ ...errors, api: errorData.message || "Login failed. Please try again." });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      
      // Check if 2FA is required
      if (data.requiresTwoFactor) {
        setShowTwoFactor(true);
        toast.success('Verification code sent to your device');
        setIsLoading(false);
        return;
      }

      // Reset login attempts on successful login
      setLoginAttempts(0);
      localStorage.removeItem('loginBlockedUntil');
      
      // Store user data and token
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("user", JSON.stringify(data.data));
        sessionStorage.setItem("token", data.token);
      }

      login(data.data, data.token);
      toast.success('Welcome back!');
      navigate("/updates");
    } catch (error) {
      setErrors({ ...errors, api: "An error occurred. Please try again later." });
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      window.location.href = `http://localhost:3000/api/auth/${provider}`;
    } catch (error) {
      toast.error(`${provider} login failed`);
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

  const slideVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5 z-0"></div>
      
      <div className="grid md:grid-cols-2 gap-0 w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl z-10 relative border border-white/20">
        {/* Left Side - Decorative */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547945413-497e1b99dac0')] bg-cover bg-center opacity-20"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-40 right-20 w-6 h-6 bg-white/20 rounded-full"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-40 left-20 w-3 h-3 bg-white/40 rounded-full"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
          
          <div className="relative h-full flex flex-col justify-center items-center p-12 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="mb-8"
              >
                <img src={images.Logo} alt="Logo" className="h-32 w-auto mx-auto filter drop-shadow-lg" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Welcome Back to Divasity
              </h2>
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                Your gateway to innovative investment opportunities and groundbreaking projects that shape the future.
              </p>
              <div className="flex items-center justify-center space-x-4 text-white/80">
                <div className="flex items-center space-x-2">
                  <Shield size={20} />
                  <span className="text-sm">Secure Login</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span className="text-sm">Verified Platform</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <motion.div 
          className="p-8 md:p-12 flex flex-col justify-center relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:hidden flex justify-center mb-6">
            <img src={images.Logo} alt="Logo" className="h-16 w-auto" />
          </div>
          
          <AnimatePresence mode="wait">
            {!showTwoFactor ? (
              <motion.div
                key="login-form"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back 👋</h2>
                  <p className="text-gray-600 mb-8">Sign in to continue your investment journey</p>
                </motion.div>

                {/* Security Alert */}
                {isBlocked && (
                  <motion.div 
                    variants={itemVariants}
                    className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-center space-x-3"
                  >
                    <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-red-700 font-medium">Account Temporarily Blocked</p>
                      <p className="text-xs text-red-600">
                        Too many failed attempts. Try again in {Math.floor(blockTimeLeft / 60)}:{(blockTimeLeft % 60).toString().padStart(2, '0')}
                      </p>
                    </div>
                  </motion.div>
                )}

                {errors.api && (
                  <motion.div 
                    variants={itemVariants}
                    className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-center space-x-3"
                  >
                    <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                    <p className="text-sm text-red-600">{errors.api}</p>
                  </motion.div>
                )}

                <motion.div className="space-y-6" variants={itemVariants}>
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                          errors.email ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-300 focus:border-purple-500'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                        placeholder="Enter your email address"
                        disabled={isBlocked}
                      />
                    </div>
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center space-x-1"
                      >
                        <AlertCircle size={14} />
                        <span>{errors.email}</span>
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={form.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className={`block w-full pl-10 pr-12 py-3 border ${
                          errors.password ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-300 focus:border-purple-500'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                        placeholder="Enter your password"
                        disabled={isBlocked}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                          disabled={isBlocked}
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
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center space-x-1"
                      >
                        <AlertCircle size={14} />
                        <span>{errors.password}</span>
                      </motion.p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors"
                        disabled={isBlocked}
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading || isBlocked}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <Loader size={18} className="animate-spin mr-2" />
                          Signing In...
                        </span>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>

                  {/* Biometric Login */}
                  {biometricSupported && (
                    <div>
                      <button
                        type="button"
                        onClick={handleBiometricLogin}
                        disabled={isBlocked}
                        className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200"
                      >
                        <Fingerprint size={18} className="mr-2" />
                        Sign in with Biometrics
                      </button>
                    </div>
                  )}

                  {/* Social Login Options */}
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        disabled={isBlocked}
                        className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="ml-2">Google</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSocialLogin('facebook')}
                        disabled={isBlocked}
                        className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="ml-2">Facebook</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="mt-8 text-center" variants={itemVariants}>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                      Sign Up
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="two-factor"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
                  <p className="text-gray-600 mb-8">Enter the 6-digit code sent to your device</p>
                </motion.div>

                <motion.div className="space-y-6" variants={itemVariants}>
                  <div>
                    <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Smartphone size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="twoFactorCode"
                        name="twoFactorCode"
                        type="text"
                        maxLength={6}
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-center text-lg tracking-widest"
                        placeholder="000000"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowTwoFactor(false)}
                      className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleTwoFactorSubmit}
                      disabled={isLoading || twoFactorCode.length !== 6}
                      className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <Loader size={18} className="animate-spin mr-2" />
                          Verifying...
                        </span>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}