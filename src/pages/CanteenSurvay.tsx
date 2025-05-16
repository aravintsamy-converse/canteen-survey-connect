import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocationModal from '../component/LocationModal';
import { FaChevronCircleRight } from 'react-icons/fa';
import { useEqpId } from '../EquipmentIdContext';
import Loader from '../component/Loader';

const CanteenSurvay: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false)
  const { eqpId } = useEqpId();
  const navigate = useNavigate();

  const handleNavigation = (to: string) => {
    setIsloading(true);

    setTimeout(() => {
      console.log('Navigating to:', to);
      navigate(to);
      setIsloading(false);
    }, 500); // Tiny delay to ensure loader renders
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitLocation = (location: string) => {
    console.log('New location submitted:', location);
    // Add logic to handle the new location
  };

  return (
    <div className="w-full xl:w-[96%] p-4">
      <div className="mb-6">
        <h1 className="text-[16px] font-[700]">ENCOMPASS BRKSVILL 941562</h1>
        <p className="text-[16px] font-[700]">16680 BALANCE COVE</p>
        <p>16680 BALANCE COVE</p>
        <p>Land O Lakes, FL 34638</p>
        <p className="text-[16px] font-[700]">Snacks</p>
        <Link
          to={`/survey/home/${eqpId}`}
          onClick={handleOpenModal}
          className="text-[#c1f001] text-[16px] font-[700] underline hover:text-[#005599]"
        >
          Not at this location?
        </Link>
      </div>

      <div className="mt-6">
        <div className="bg-white rounded-[11px] overflow-hidden border border-black">
          <Link
            to="/survey/machine-problem"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/survey/machine-problem');
            }}
            className="w-full px-3 py-3 text-left flex justify-between items-center link-item"
          >
            <span className="font-[700] text-[16px]">Machine Problem?</span>
            <FaChevronCircleRight className="text-[22px] text-[#4D4D4D]" />
          </Link>
          <div className="border-t border-black"></div>
          <Link
            to={`/survey/need-refund`}
            className="w-full px-3 py-3 text-left flex justify-between items-center link-item"
          >
            <span className="font-[700] text-[16px]">Need a Refund?</span>
            <FaChevronCircleRight className="text-[22px] text-[#4D4D4D]" />
          </Link>
          <div className="border-t border-black"></div>
          <Link
            to={`/survey/nutrition`}
            className="w-full px-3 py-3 text-left flex justify-between items-center link-item"
          >
            <span className="font-[700] text-[16px]">Nutrition Information</span>
            <FaChevronCircleRight className="text-[22px] text-[#4D4D4D]" />
          </Link>
        </div>
      </div>
      {isLoading && <Loader />}

      <LocationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitLocation}
      />
    </div>
  );
};

export default CanteenSurvay;