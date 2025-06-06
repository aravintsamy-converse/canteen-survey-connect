import React, { useState, useEffect } from 'react'
import { CheckCircle, X, AlertCircle } from 'lucide-react'
import type { SuccessModalProps } from '../type/issue'

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message, errorMessage }) => {
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

  if (!shouldRender) return null

  // Determine if the modal is in error state
  const isError = !!errorMessage

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient background, red for error, green for success */}
        <div
          className={`absolute inset-0 rounded-2xl ${
            isError ? 'bg-gradient-to-br from-red-50 to-rose-50' : 'bg-gradient-to-br from-green-50 to-emerald-50'
          }`}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-lg"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Icon with animation */}
          <div className="mb-6">
            <div
              className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center shadow-lg animate-pulse ${
                isError
                  ? 'bg-gradient-to-br from-red-400 to-rose-500'
                  : 'bg-gradient-to-br from-green-400 to-emerald-500'
              }`}
            >
              {isError ? (
                <AlertCircle className="w-10 h-10 text-white" />
              ) : (
                <CheckCircle className="w-10 h-10 text-white" />
              )}
            </div>
            {/* Ripple effect */}
            <div
              className={`mx-auto mt-[-80px] w-20 h-20 rounded-full border-4 animate-ping opacity-30 ${
                isError ? 'border-red-200' : 'border-green-200'
              }`}
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {isError ? 'Error' : 'Success!'}
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            {isError ? errorMessage : message}
          </p>

        </div>

        {/* Floating particles */}
        <div
          className={`absolute top-6 left-6 w-2 h-2 rounded-full animate-bounce opacity-60 ${
            isError ? 'bg-red-300' : 'bg-green-300'
          }`}
        />
        <div
          className={`absolute top-12 right-8 w-1.5 h-1.5 rounded-full animate-bounce opacity-40 ${
            isError ? 'bg-rose-400' : 'bg-emerald-400'
          }`}
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className={`absolute bottom-8 left-8 w-1 h-1 rounded-full animate-bounce opacity-50 ${
            isError ? 'bg-red-400' : 'bg-green-400'
          }`}
          style={{ animationDelay: '1s' }}
        />
      </div>
    </div>
  )
}

export default SuccessModal