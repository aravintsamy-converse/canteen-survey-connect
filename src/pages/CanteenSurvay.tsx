import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocationModal from '../component/LocationModal';
import { FaChevronCircleRight } from 'react-icons/fa';
import { useEqpId } from '../EquipmentIdContext';
import Loader from '../component/Loader';
import { fetchEquipmentDetails } from '../services/equipmentService';

export interface EquipmentDetails {
  name: string;
  address1_line1: string;
  address1_city: string;
  address1_stateorprovince: string;
  address1_postalcode: string;
}

const CanteenSurvay: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [equipmentDetails, setEquipmentDetails] = useState<EquipmentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { eqpId } = useEqpId();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEquipmentDetails = async () => {
      setIsLoading(true);
      setError(null); // Reset error state before fetching
      const details = await fetchEquipmentDetails(eqpId);
      setEquipmentDetails(details);
      if (!details) {
        setError('Failed to load equipment details');
      }
      setIsLoading(false);
    };

    if (eqpId) {
      loadEquipmentDetails();
    }
  }, [eqpId]);

  const handleNavigation = (to: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(to);
      setIsLoading(false);
    }, 100);
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
  };

  return (
    <div className="w-full xl:w-[96%] p-4">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : equipmentDetails ? (
        <div className="mb-6">
          <h1 className="text-[16px] font-[700]">{equipmentDetails.name}</h1>
          <p className="text-[16px] font-[700]">{equipmentDetails.address1_line1}</p>
          <p>
            {equipmentDetails.address1_city}, {equipmentDetails.address1_stateorprovince}{' '}
          </p>
          <p className="text-[16px] font-[700]">
            {equipmentDetails.address1_postalcode}
          </p>
          <p className="text-[16px] font-[700]">Snacks</p>
          <Link
            to={`/survey/home/${eqpId}`}
            onClick={handleOpenModal}
            className="text-[#c1f001] text-[16px] font-[700] underline hover:text-[#005599]"
          >
            Not at this location?
          </Link>
        </div>
      ) : null}

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
            to="/survey/need-refund"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/survey/need-refund');
            }}
            className="w-full px-3 py-3 text-left flex justify-between items-center link-item"
          >
            <span className="font-[700] text-[16px]">Need a Refund?</span>
            <FaChevronCircleRight className="text-[22px] text-[#4D4D4D]" />
          </Link>
          <div className="border-t border-black"></div>
          <Link
            to="/survey/nutrition"
            className="w-full px-3 py-3 text-left flex justify-between items-center link-item"
          >
            <span className="font-[700] text-[16px]">Nutrition Information</span>
            <FaChevronCircleRight className="text-[22px] text-[#4D4D4D]" />
          </Link>
        </div>
      </div>

      <LocationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitLocation}
      />
    </div>
  );
};

export default CanteenSurvay;