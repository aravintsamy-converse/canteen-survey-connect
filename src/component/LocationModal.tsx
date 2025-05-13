import React, { useState } from 'react'

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (location: string) => void
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [location, setLocation] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(location)
    setLocation('')
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-invert-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-sm">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-sm font-medium text-gray-700">
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
              className="w-full p-2 border border-gray-300 text-black rounded-md"
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