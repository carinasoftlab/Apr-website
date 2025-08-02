"use client"

import { useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email ID is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Handle successful login here
      console.log("Login successful:", formData)
    } catch (error) {
      console.error("Login failed:", error)
      setErrors({ submit: "Login failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/login/login-bg.jpg" 
          alt="Mountain landscape background" 
          fill 
          className="object-cover" 
          priority 
        />
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:grid lg:grid-cols-2 px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        {/* Left Side - Logo and Welcome Text */}
        <div className="flex flex-col items-center justify-center text-center lg:text-left mb-8 lg:mb-0 max-w-md mx-auto lg:mx-0 lg:ml-8 xl:ml-16">
          {/* Logo */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto lg:mx-0 relative flex items-center justify-center ">
            <Image 
              src="/images/login/PanchayatiRajLogo.svg" 
              alt="Panchayati Raj Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Welcome Text */}
          <div className="text-black px-4 lg:px-0">
            <h2 className="text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold opacity-90 mb-1">
              Welcome to
            </h2>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
              PANCHAYATI RAJ
            </h1>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center lg:justify-start">
          <div className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Form Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                  Sign in with Email
                </h3>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 border-0 rounded-lg sm:rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 text-sm sm:text-base ${
                      errors.email ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 border-0 rounded-lg sm:rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 text-sm sm:text-base ${
                      errors.password ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-prime hover:bg-green-800 disabled:bg-green-400 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="text-xs sm:text-sm">Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              {/* Additional Links */}
              {/* <div className="mt-4 sm:mt-6 text-center">
                <a href="#" className="text-xs sm:text-sm text-green-700 hover:text-green-800 transition-colors duration-200">
                  Forgot your password?
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
