import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEqpId } from '../EquipmentIdContext';
import { Navigate } from "react-router-dom";
import { usePrompt } from '../hooks/usePrompt';
import { fetchCaseSubtypes } from '../services/issueService';
import Loader from "../component/Loader";

interface Issue {
  value: string;
  label: string;
}

const MachineProblem = () => {
  const { eqpId } = useEqpId();
  const navigate = useNavigate();

  // Check if eqpId is null, undefined, or empty
  if (!eqpId || eqpId === '') {
    return <Navigate to="/survey/not-found" replace />;
  }

  const [formData, setFormData] = useState({
    eqpId: eqpId,
    name: '',
    email: '',
    phone: '',
    comments: '',
    issues: [] as string[], // Store selected issue values
  });

  const [issuesList, setIssuesList] = useState<Issue[]>([]);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    issues: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
  });
  const [commentCharsRemaining, setCommentCharsRemaining] = useState(1000);
  const [nameCharsRemaining, setNameCharsRemaining] = useState(50);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  usePrompt(isFormDirty, 'This survey must be completed or all your results will be lost.\n Do you still wish to exit?');

  // Fetch issues from API
  useEffect(() => {
    const loadIssues = async () => {
      setIsLoading(true);
      setApiError(null);
      const issues = await fetchCaseSubtypes('machine-problem'); // Assuming 'equipment_issue' is the issue type
      if (issues.length > 0) {
        setIssuesList(issues);
      } else {
        setApiError('Failed to load issues');
      }
      setIsLoading(false);
    };
    loadIssues();
  }, []);

  // Check if form is dirty
  const checkFormDirty = () => {
    return (
      formData.name !== '' ||
      formData.email !== '' ||
      formData.phone !== '' ||
      formData.comments !== '' ||
      formData.issues.length > 0
    );
  };

  // Update isFormDirty whenever formData changes
  useEffect(() => {
    setIsFormDirty(checkFormDirty());
  }, [formData]);

  // Update character counts
  useEffect(() => {
    setCommentCharsRemaining(1000 - formData.comments.length);
    setNameCharsRemaining(50 - formData.name.length);
  }, [formData.comments, formData.name]);

  const handleIssueChange = (issueValue: string) => {
    setFormData((prev) => {
      const newIssues = prev.issues.includes(issueValue)
        ? prev.issues.filter((id) => id !== issueValue)
        : [...prev.issues, issueValue];
      return { ...prev, issues: newIssues };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name as keyof typeof touched] && errors[name as keyof typeof errors]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    validateField(name, value);
  };

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
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));

    return !errorMessage;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      issues: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = '* Required';
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

    if (formData.issues.length === 0) {
      newErrors.issues = 'Please select at least one issue';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      console.log('Selected issue values:', formData.issues); // Log selected issue values
      alert('Form submitted successfully!');
      setIsFormDirty(false);
      navigate("/survey/success"); // Navigate to a success page after submission
    }
  };

  return (
    <div className="w-full xl:w-[96%] px-3 py-5 min-h-screen">
      {isLoading ? <Loader /> : (
        <div className="mx-auto">
          <h1 className="text-[22px] font-[700] text-white">Machine Problem?</h1>
          {isLoading ? (
            <p>Loading issues...</p>
          ) : apiError ? (
            <p className="text-red-500">{apiError}</p>
          ) : (
            <div className="pt-[58px]  mb-6">
              <p className="font-[400] text-[16px] mb-0" style={{ textShadow: '0 0 0 #444444' }}>
                Choose all issues that apply:
              </p>
              <div className="border border-[#000] bg-white overflow-hidden rounded-[12px] w-full md:w-[78%]">
                {issuesList.map((issue, index) => (
                  <div
                    key={issue.value}
                    className={`p-3 flex items-center cursor-pointer link-item border-[#000] h-11 ${index !== issuesList.length - 1 ? 'border-b' : ''
                      }`}
                    onClick={() => handleIssueChange(issue.value)}
                  >
                    <input
                      type="checkbox"
                      id={issue.value}
                      checked={formData.issues.includes(issue.value)}
                      className="mr-3 h-5 w-5 custom-checkbox"
                    />
                    <label
                      htmlFor={issue.value}
                      onClick={() => handleIssueChange(issue.value)}
                      className="select-none cursor-pointer text-black text-[16px] font-[700]"
                      style={{ textShadow: '0 0 0 #444444' }}
                    >
                      {issue.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.issues && <p className="text-red-500 mt-1">{errors.issues}</p>}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="comments" className="block text-[16px] font-[400] mb-4" style={{ textShadow: '0 0 0 #444444' }}>
              Comments:
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows={6}
              maxLength={1000}
              className="w-full p-3 ml-[2px] h-[166px] border border-[#464646] rounded-[12px] bg-[#808080] focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
            />
            <div className="text-left text-[16px]" style={{ textShadow: '0 0 0 #444444' }}>
              {commentCharsRemaining} Characters Remaining
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-[16px] font-[700]" style={{ textShadow: '0 0 0 #444444' }}>
              If you would like to receive a confirmation email please provide contact information below:
            </p>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 text-[16px] font-[400]" style={{ textShadow: '0 0 0 #444444' }}>
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
              <div className="text-left text-[16px] mt-1 font-[400]" style={{ textShadow: '0 0 0 #444444' }}>
                {nameCharsRemaining} Characters Remaining
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-[16px] font-[400]" style={{ textShadow: '0 0 0 #444444' }}>
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
              <label htmlFor="phone" className="block mb-1 text-[16px] font-[400]" style={{ textShadow: '0 0 0 #444444' }}>
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
          </div>
          <div className="mt-8 text-sm text-white text-[14px] font-[400] pl-8" style={{ textShadow: '0 0 0 #444444' }}>
            SIID: 11900606 - JDEID: 0
          </div>
          <div className="mt-4 mb-4 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-[#FFFFFF] cursor-pointer text-black hover:bg-[#c1f001] font-[700] rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
            >
              Submit
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MachineProblem;