import React, { useState, useEffect } from 'react'
import type { LocationModalProps } from '../type/issue'
const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [location, setLocation] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setIsAnimating(true)
    } else if (shouldRender) {
      setIsAnimating(false)
    }
  }, [isOpen])

  const handleAnimationEnd = () => {
    if (!isAnimating) {
      setShouldRender(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(location)
    setLocation('')
    onClose()
  }

  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 backdrop-brightness-60 flex items-center justify-center z-50">
      <div
        className={`bg-[#808080] rounded-lg p-4 w-full max-w-sm ${
          isAnimating ? 'animate-slide-in-zoom' : 'animate-slide-out-zoom'
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex justify-between items-center  pb-2">
          <h2 className="text-[16px] font-medium text-white">
            Please provide correct location details.
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <textarea
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 bg-white text-black rounded-md"
              placeholder="Enter location"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LocationModal