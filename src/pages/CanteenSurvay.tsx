import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';
import { useEqpId } from '../EquipmentIdContext';
import Loader from '../component/Loader';
import { fetchEquipmentDetails } from '../services/equipmentService';
import type { EquipmentDetails } from '../type/equipment';

const CanteenSurvay: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [equipmentDetails, setEquipmentDetails] = useState<EquipmentDetails | null>(null);
  const { eqpId } = useEqpId();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEquipmentDetails = async () => {
      setIsLoading(true);
      try {
        const details = await fetchEquipmentDetails(eqpId);
        if (!details) {
          navigate('/survey/not-found', { replace: true });
        } else {
          setEquipmentDetails(details);
        }
      } catch (error) {
        console.error("Error in loadEquipmentDetails:", error);
        navigate('/survey/not-found', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    if (eqpId) {
      loadEquipmentDetails();
    }
  }, [eqpId, navigate]);

  const handleNavigation = (to: string) => {
    setIsLoading(true);
    navigate(to);
  };

  return (
    <div className="w-full xl:w-[96%] p-4">
      {isLoading ? (
        <Loader />
      ) : equipmentDetails ? (
        <div className="mb-6">
          <h1 className="text-[16px] font-[700]">{equipmentDetails.name}</h1>
          <p className="text-[16px] font-[700]">{equipmentDetails.address1_line1}</p>
          <p>
            {equipmentDetails.address1_city}, {equipmentDetails.address1_stateorprovince}{' '}
            {equipmentDetails.address1_postalcode}
          </p>
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
        </div>
      </div>
    </div>
  );
};

export default CanteenSurvay;