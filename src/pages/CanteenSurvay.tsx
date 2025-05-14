import { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import LocationModal from '../component/LocationModal'
import { FaChevronCircleRight } from 'react-icons/fa'

const CanteenSurvay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent Link navigation
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitLocation = (location: string) => {
    console.log('New location submitted:', location)
    // Add logic to handle the new location (e.g., update state, make API call)
  }
  return (
    <div className="w-full  xl:w-[96%] mx-1 p-4">
    {/* Location Information */}
    <div className="mb-6">
      <h1 className="text-[16px] font-[700]">ENCOMPASS BRKSVILL 941562</h1>
      <p>16680 BALANCE COVE</p>
      <p>16680 BALANCE COVE</p>
      <p>Land O Lakes, FL 34638</p>
      <p >Snacks</p>
      <Link
          to="/"
          onClick={handleOpenModal}
          className="text-[#c1f001] underline hover:text-[#005599]"
        >
          Not at this location?
        </Link>
    </div>

    <div className="mt-8">
      <div className="bg-white rounded-[11px] overflow-hidden border border-black">
        <Link
          to="/machine-problems"
          className="w-full px-3 py-2 text-left flex justify-between items-center link-item"
        >
          <span className="font-[700] text-[16px]">Machine Problem?</span>
          <FaChevronCircleRight className='text-[22px] text-[#4D4D4D] '/>
        </Link>
        <div className="border-t border-black"></div>
        <Link
          to="/refunds"
          className="w-full px-3 py-2 text-left flex justify-between items-center link-item"
        >
          <span className="font-[700] text-[16px]">Need a Refund?</span>
          <FaChevronCircleRight className='text-[22px] text-[#4D4D4D] '/>
        </Link>
        <div className="border-t border-black"></div>
        <Link
          to="/nutrition"
          className="w-full px-3 py-2 text-left flex justify-between items-center link-item"
        >
          <span className="font-[700] text-[16px]">Nutrition Information</span>
          <FaChevronCircleRight className='text-[22px] text-[#4D4D4D] '/>
        </Link>
      </div>
    </div>

    <footer className="mt-8 ">
        <div className="container mx-1">
          <div className="text-[16px] font-[400] text-white underline">
            <Link to="/" className="hover:underline">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/" className="hover:underline">
              Terms of Use
            </Link>{" "}
            |{" "}
            <Link to="/" className="hover:underline">
              Privacy Request
            </Link>
          </div>
        </div>
      </footer>
      <LocationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitLocation}
      />
  </div>

  )
}

export default CanteenSurvay
