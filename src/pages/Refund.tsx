import { useEffect, useRef, useState } from "react";
import { useEqpId } from '../EquipmentIdContext';
import { Navigate } from "react-router-dom";
import { usePrompt } from '../hooks/usePrompt';
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { fetchCaseSubtypes, submitIssue } from "../services/issueService";
import Loader from "../component/Loader";
import SuccessModal from "../component/SuccessModal";

const Refund = () => {
  const { eqpId } = useEqpId();

  // Check if eqpId is null, undefined, or empty
  if (!eqpId || eqpId === '') {
    return <Navigate to="/survey/not-found" replace />;
  }

  const [formData, setFormData] = useState({
    eqpId: eqpId,
    refund_amount: '',
    name: '',
    email: '',
    phone: '',
    comments: '',
    selectedReason: ''
  });

  const [errors, setErrors] = useState({
    refund_amount: '',
    name: '',
    email: '',
    selectedReason: '',
    comments: ''
  });

  const [touched, setTouched] = useState({
    refund_amount: false,
    name: false,
    email: false,
    comments: false,
    selectedReason: false
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [commentCharsRemaining, setCommentCharsRemaining] = useState(500);
  const [nameCharsRemaining, setNameCharsRemaining] = useState(50);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [refundReasonOptions, setRefundReasonOptions] = useState<{ value: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };


  usePrompt(isFormDirty, 'This survey must be completed or all your results will be lost.\nDo you still wish to exit?');

  // Check if form is dirty (i.e., has been modified)
  const checkFormDirty = () => {
    return (
      formData.refund_amount !== '' ||
      formData.name !== '' ||
      formData.email !== '' ||
      formData.phone !== '' ||
      formData.comments !== '' ||
      formData.selectedReason !== ''
    );
  };

  useEffect(() => {
    const loadIssues = async () => {
      setIsLoading(true);
      setApiError(null);
      const issues = await fetchCaseSubtypes('refund'); // Assuming 'equipment_issue' is the issue type
      if (issues.length > 0) {
        setRefundReasonOptions(issues);
      } else {
        setApiError('Failed to load issues');
      }
      setIsLoading(false);
    };
    loadIssues();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update isFormDirty whenever formData changes
  useEffect(() => {
    setIsFormDirty(checkFormDirty());
  }, [formData]);

  const handleSelecReason = (value: string) => {
    setFormData({
      ...formData,
      selectedReason: value
    });

    setTouched(prev => ({
      ...prev,
      selectedReason: true
    }));

    validateField('selectedReason', value);
    setDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (touched[name as keyof typeof touched] && errors[name as keyof typeof errors]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    validateField(name as keyof typeof errors, value as string);;
  };

  useEffect(() => {
    setCommentCharsRemaining(500 - formData.comments.length);
    setNameCharsRemaining(50 - formData.name.length);
  }, [formData.comments, formData.name]);

  const validateField = (name: string, value: string) => {
    let errorMessage = '';

    if (name === 'name') {
      if (!value.trim()) {
        errorMessage = '* Required';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        errorMessage = '* Required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Please check your input';
        }
      }
    } else if (name === 'comments') {
      if (!value.trim()) {
        errorMessage = '* Required';
      }
    } else if (name === 'refund_amount') {
      if (!value.trim()) {
        errorMessage = '* Required';
      }
    } else if (name === 'selectedReason') {
      if (!value) {
        errorMessage = '* Required';
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));

    return !errorMessage;
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      refund_amount: '',
      name: '',
      email: '',
      selectedReason: '',
      comments: ''
    };

    if (!formData.refund_amount.trim()) {
      newErrors.refund_amount = '* Required';
      isValid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = '* Required';
      isValid = false;
    }

    if (!formData.comments.trim()) {
      newErrors.comments = '* Required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please check your input';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please check your input';
        isValid = false;
      }
    }

    if (!formData.selectedReason) {
      newErrors.selectedReason = 'Please select an reason';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (validateForm()) {
       // Construct the payload in the desired format
       const payload = {
         ProblemType: {
           POSProblem: false, 
           Refund: true,
         },
         ConnectLocationNumber: eqpId, // Assuming eqpId is the ConnectLocationNumber
         ProblemDescription: formData.comments || null, // Use comments or fallback
         RequesterDetails: {
           Name: formData.name.trim(),
           Email: formData.email.trim(),
           Phone: formData.phone || '', // Phone is optional
         },
         Incidents: [
          {
            CaseType: {
              guid: formData.selectedReason, // Use selectedReason as the guid
            },
            RefundAmount: parseFloat(formData.refund_amount) || null, // Convert refund_amount to number
          },
        ],
       };
 
       setIsLoading(true);
       setApiError(null);
 
       try {
         // Call the API to submit the issue
         await submitIssue(payload);
         setIsFormDirty(false);
         setIsModalOpen(true);
        //  navigate("/survey/success");
       } catch (error) {
         setApiError('Failed to submit the form. Please try again.');
       } finally {
         setIsLoading(false);
       }
     }
   };

  const getSelectedLabel = () => {
    const selected = refundReasonOptions.find(option => option.value === formData.selectedReason);
    return selected ? selected.label : "Choose one";
  };

  return (

    <div className="w-full lg:w-[97%] px-4 py-5 min-h-screen">
      {isLoading ? <Loader /> : (
        <div className=" mx-auto">
          <h1 className="text-[22px] font-bold text-white">Need a Refund?</h1>
          {apiError && (
            <div className="text-red-500 mb-4">
              {apiError}
            </div>
          )}
          <div className="pt-10 mb-6">
            <label htmlFor="refund_amount" className="block mb-2 text-base font-normal" style={{ textShadow: '0 0 0 #444444' }}>
              Please select a reason for a refund:{errors.selectedReason && <span className="text-red-500">{errors.selectedReason}</span>}
            </label>
            <div ref={dropdownRef} className="relative">
              <div
                className="flex justify-between items-center px-2 hover:bg-[#c1f001] bg-white py-3 rounded-[12px] cursor-pointer focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
                onClick={() => setDropdownOpen(!dropdownOpen)} style={{ textShadow: '0 0 0 #444444' }}
              >
                <div className="font-[700] text-[16px] text-[#000]" style={{ textShadow: '0 0 0 #444444' }}>{getSelectedLabel()}</div>
                {dropdownOpen ? <FaChevronCircleUp className="text-[22px] text-[#4D4D4D]" /> : <FaChevronCircleDown className="text-[22px] text-[#4D4D4D]" />}
              </div>

              {dropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-800 rounded-t-[0px] rounded-[12px] overflow-hidden">
                  {refundReasonOptions.map((option) => (
                    option.value && (
                      <div
                        key={option.value}
                        className={`p-3 hover:bg-[#c1f001] cursor-pointer font-[700] text-[16px] text-[#000] border-t border-gray-800 ${formData.selectedReason === option.value ? 'bg-blue-100' : ''
                          }`}
                        onClick={() => handleSelecReason(option.value)} style={{ textShadow: '0 0 0 #444444' }}
                      >
                        <span className={`${formData.selectedReason === option.value ? 'font-bold' : ''}`}>
                          {option.label}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
            {errors.selectedReason && touched.selectedReason && (
              <p className="text-red-500 mt-1">{errors.selectedReason}</p>
            )}
          </div>
          <div className="mb-6">
            <div className="mb-4">
              <label htmlFor="refund_amount" className="block mb-1 text-base font-normal" style={{ textShadow: '0 0 0 #444444' }}>
                Refund amount: {errors.refund_amount && <span className="text-red-500">{errors.refund_amount}</span>}
              </label>
              <input
                type="number"
                id="refund_amount"
                name="refund_amount"
                value={formData.refund_amount}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-[#464646] rounded-[12px] bg-[#808080] focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 text-base font-normal" style={{ textShadow: '0 0 0 #444444' }}>
                Name: {errors.name && <span className="text-red-500">{errors.name}</span>}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                maxLength={50}
                className="w-full p-2 border border-[#464646] rounded-[12px] bg-[#808080] focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
              />
              <div className="text-left text-base mt-1 font-normal" style={{ textShadow: '0 0 0 #444444' }}>
                {nameCharsRemaining} Characters Remaining
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-base font-normal" style={{ textShadow: '0 0 0 #444444' }}>
                Email Address: {errors.email && <span className="text-red-500">{errors.email}</span>}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-[#464646] rounded-[12px] bg-[#808080] focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block mb-1 text-base font-normal" style={{ textShadow: '0 0 0 #444444' }}>
                Phone (e.g. 9998887777 or 19998887777):
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#464646] rounded-[12px] bg-[#808080] focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="comments" className="block text-base font-normal mb-4" style={{ textShadow: '0 0 0 #444444' }}>
                Please provide us with your mailing address and any other relevant information:
                {errors.comments && <span className="text-red-500">{errors.comments}</span>}
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows={6}
                maxLength={500}
                className="w-full p-3 ml-[2px] h-[166px] border border-[#464646] rounded-[12px] bg-[#808080] focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
              />
              <div className="text-left text-base" style={{ textShadow: '0 0 0 #444444' }}>
                {commentCharsRemaining} Characters Remaining
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-white pl-8" style={{ textShadow: '0 0 0 #444444' }}>
            SIID: 11918194 - JDEID: 0
          </div>

          <div className="mt-4 mb-4 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-white cursor-pointer text-black hover:bg-lime-300 font-bold rounded-2xl px-3 py-2 text-lg border border-black transition duration-300 ease-in-out bg-[#808080]focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Refund;

