'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password, rememberMe });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#534FEB' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6667 35V31.6667H25V35H21.6667ZM18.3333 31.6667V23.3333H21.6667V31.6667H18.3333ZM31.6667 26.6667V20H35V26.6667H31.6667ZM28.3333 20V16.6667H31.6667V20H28.3333ZM8.33333 23.3333V20H11.6667V23.3333H8.33333ZM5 20V16.6667H8.33333V20H5ZM20 8.33333V5H23.3333V8.33333H20ZM7.5 12.5H12.5V7.5H7.5V12.5ZM5 15V5H15V15H5ZM7.5 32.5H12.5V27.5H7.5V32.5ZM5 35V25H15V35H5ZM27.5 12.5H32.5V7.5H27.5V12.5ZM25 15V5H35V15H25ZM28.3333 35V30H25V26.6667H31.6667V31.6667H35V35H28.3333ZM21.6667 23.3333V20H28.3333V23.3333H21.6667ZM15 23.3333V20H11.6667V16.6667H21.6667V20H18.3333V23.3333H15ZM16.6667 15V8.33333H20V11.6667H23.3333V15H16.6667ZM8.75 11.25V8.75H11.25V11.25H8.75ZM8.75 31.25V28.75H11.25V31.25H8.75ZM28.75 11.25V8.75H31.25V11.25H28.75Z" fill="white"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium"
              style={{ color: '#534FEB' }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all hover:opacity-90 shadow-md"
            style={{ backgroundColor: '#534FEB' }}
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium"
              style={{ color: '#534FEB' }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

