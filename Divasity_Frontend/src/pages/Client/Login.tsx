import { FormField } from "../../components/Form/Form";
import { images } from "../../constants";
import { useState } from "react";
import { CustomButton } from "../../components/Button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    api: '' // Added for API errors
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state for API call
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
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

  const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setErrors({ ...errors, api: errorData.message || "Login failed. Please try again." });
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    
    // Store user data and token in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(data.data)); // Store user details
    sessionStorage.setItem("token", data.token); // Store JWT token

    console.log("Login successful:", data);
    navigate("/updates"); // Redirect after successful login
  } catch (error) {
    setErrors({ ...errors, api: "An error occurred. Please try again later." });
    setIsLoading(false);
  }
};

  return (
    <div>
      <div className="flex justify-center pt-2">
        <img src={images.Logo} alt="Logo" className="h-[20vh]" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-poppins font-[700] text-[26px] text-center text-gray-800">Welcome Back👋</h2>
        <p className="font-opensans text-[16px] text-center text-gray-600">Log in to see what's waiting for you</p>
      </div>
      <div className="pt-6 pb-6 px-6">
        {errors.api && (
          <p className="text-red-500 text-center mb-4">{errors.api}</p>
        )}

        {/* Email Field */}
        <FormField
          name="email"
          type="email"
          value={form.email}
          placeholder="Email*"
          errorMessage={errors.email}
          handleChange={(value) => handleChange('email', value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        {/* Password Field */}
        <FormField
          name="password"
          type="password"
          value={form.password}
          placeholder="Password*"
          errorMessage={errors.password}
          handleChange={(value) => handleChange('password', value)}
          containerStyles="pb-2"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        <div className="flex items-end justify-end">
          <Link to="/forgot-password" className="text-sm font-opensans text-end hover:underline py-4">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <CustomButton
          name={isLoading ? "Logging In..." : "Login"}
          containerStyle="w-full text-white mt-6"
          handlePress={handleSubmit}
          icon={isLoading && <Loader className={`${isLoading ? "animate-spin block" : ""}`} />}
          
        />

        <div className="text-center pt-2">
          <span className="text-gray-600 font-opensans">Don't have an account? </span>
          <Link to="/register" className="text-dpurple hover:underline">Sign Up</Link>
        </div>

        <div className="flex items-center py-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 font-opensans">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button className="w-full border cursor-pointer border-gray-300 rounded-lg h-[7vh] gap-4 flex items-center justify-center hover:bg-gray-50">
          <img src={images.GoogleIcon} alt="Google" className="w-5 h-5 mr-2" />
          <span className="font-opensans">Sign In with Google</span>
        </button>
      </div>
    </div>
  );
}