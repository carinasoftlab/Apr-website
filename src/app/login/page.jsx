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
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center gap-8 sm:gap-10 lg:gap-14 lg:grid lg:grid-cols-2 px-2 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-0">
        {/* Left Side - Logo and Welcome Text */}
        <div className="flex flex-col items-center justify-center text-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none md:w-auto mx-auto">
          {/* Logo */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto lg:mx-0 relative flex items-center justify-center ">
            <Image 
              src="/images/login/PanchayatiRajLogo.svg" 
              alt="Panchayati Raj Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Welcome Text */}
          <div className="text-[#2B2B2B] px-2 sm:px-4 lg:px-0">
            <h2 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold opacity-90 mb-1">
              Welcome to
            </h2>
            <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
              PANCHAYATI RAJ
            </h1>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center w-[80%] h-full  md:w-auto">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Form Header */}
              <div className="text-center mb-4 sm:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                  Sign in with Email
                </h3>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Enter Email ID / number
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 bg-[#EBEBEB] border-0 rounded-md sm:rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 text-xs sm:text-sm md:text-base ${
                      errors.email ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 bg-[#EBEBEB] border-0 rounded-md sm:rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 text-xs sm:text-sm md:text-base ${
                      errors.password ? "ring-2 ring-red-500" : ""
                    }`}
                    disabled={isLoading}
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
                  className="w-full bg-prime hover:bg-green-800 disabled:bg-green-400 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-md sm:rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base"
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
