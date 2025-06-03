import React, { useState, useEffect } from 'react'
import { CheckCircle, X, Home, ArrowRight } from 'lucide-react'
import type { SuccessModalProps } from '../type/issue'

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  const handleRedirectHome = () => {
    // Add your navigation logic here
    onClose()
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
        }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute hidden top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-lg"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Success Icon with animation */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            {/* Ripple effect */}
            <div className="mx-auto mt-[-80px] w-20 h-20 rounded-full border-4 border-green-200 animate-ping opacity-30" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Success!
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your issue has been submitted successfully. We'll get back to you soon with an update.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled={true} // Replace with actual condition if needed
              onClick={handleRedirectHome}
              className="flex-1 bg-gradient-to-r cursor-pointer from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go to Home
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              disabled={true} // Replace with actual condition if needed
              className="flex-1 bg-gray-100 text-gray-700 cursor-pointer px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              Stay Here
            </button>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-6 left-6 w-2 h-2 bg-green-300 rounded-full animate-bounce opacity-60" />
        <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  )
}

export default SuccessModal