import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Otp() {
  const { email } = useParams();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.message);
        setMessage('');
      } else {
        setMessage(data.message);
        navigate('/signin')
        setError('');
      }
    } catch (err) {
      setError('Failed to verify OTP');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">📧</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
          <p className="text-white/80 text-sm">We've sent a verification code to your email</p>
        </div>
        
        {/* Form */}
        <div className="p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">Email Address</label>
            <input
              type="email"
              value={email || ''}
              readOnly
              className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 font-medium"
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Verification Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-mono tracking-widest"
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Verify Code
          </button>
          
          {/* Messages */}
          {message && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 text-center font-medium">{message}</p>
            </div>
          )}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-center font-medium">{error}</p>
            </div>
          )}
          
          {/* Resend */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}