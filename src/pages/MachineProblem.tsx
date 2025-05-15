import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MachineProblem = () => {
  const { guid } = useParams<{ guid: string }>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: '',
    issues: {
      needsToBeFilled: false,
      machineIsNotWorking: false,
      wontAcceptCreditCard: false,
      machineIsDamaged: false,
      needsCleaning: false,
      notAcceptingMoney: false,
    }
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    issues: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false
  });

  const [commentCharsRemaining, setCommentCharsRemaining] = useState(1000);
  const [nameCharsRemaining, setNameCharsRemaining] = useState(50);

  const handleIssueChange = (issue: keyof typeof formData.issues) => {
    setFormData({
      ...formData,
      issues: {
        ...formData.issues,
        [issue]: !formData.issues[issue]
      }
    });
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

    validateField(name, value);
  };

  useEffect(() => {
    setCommentCharsRemaining(1000 - formData.comments.length);
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
      name: '',
      email: '',
      issues: ''
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

    const hasSelectedIssue = Object.values(formData.issues).some(value => value);
    if (!hasSelectedIssue) {
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
      alert('Form submitted successfully!');
    }
  };
  return (
    <div className="w-full xl:w-[96%] mx-1 px-3 py-5 min-h-screen">
      <h1 className="text-[22px] font-[700] text-white">Machine Problem? </h1>
      <div className="pt-[58px] mx-auto">
        <div className="mb-6">
          <p className="font-[400] text-[16px] mb-0" style={{ textShadow: '0 0 0 #444444' }}>Choose all issues that apply:</p>
          <div className="border border-[#000] bg-white rounded-[12px] w-full md:w-[78%]">
            {Object.entries(formData.issues).map(([key, value], index) => {
              const issueText = (() => {
                switch (key) {
                  case 'needsToBeFilled':
                    return 'Needs to be filled';
                  case 'machineIsNotWorking':
                    return 'Machine is not working';
                  case 'wontAcceptCreditCard':
                    return 'Won\'t accept credit card';
                  case 'machineIsDamaged':
                    return 'Machine is damaged';
                  case 'needsCleaning':
                    return 'Needs cleaning';
                  case 'notAcceptingMoney':
                    return 'Not Accepting Money';
                  default:
                    return '';
                };
              })();
              return (
                <div
                  key={key}
                  className={`p-3 flex items-center   link-item border-[#000] h-11 ${index !== Object.entries(formData.issues).length - 1 ? 'border-b' : ''
                    }`}
                  onClick={() => handleIssueChange(key as keyof typeof formData.issues)}
                >
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => handleIssueChange(key as keyof typeof formData.issues)}
                    className="mr-3 h-5 w-5 custom-checkbox"
                  />
                  <label
                    htmlFor={key}
                    onClick={(e) => e.stopPropagation()}
                    className="select-none text-black text-[16px] font-[700]"
                    style={{ textShadow: '0 0 0 #444444' }}
                  >
                    {issueText}
                  </label>
                </div>
              );
            })}
          </div>
          {errors.issues && (
            <p className="text-red-500 mt-1">{errors.issues}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="comments" className="block   text-[16px] font-[400] mb-4" style={{ textShadow: '0 0 0 #444444' }}>Comments:</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows={6}
            maxLength={1000}
            className="w-full p-3 ml-[2px] h-[166px] border  border-[#464646] rounded-[12px] bg-[#808080] focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
          />
          <div className="text-left text-[16px]" style={{ textShadow: '0 0 0 #444444' }}>
            {commentCharsRemaining} Characters Remaining
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-[16px] font-[700]" style={{ textShadow: '0 0 0 #444444' }}>If you would like to receive a confirmation email please provide contact information below:</p>

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
              type="text"
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
            className="bg-[#FFFFFF] text-black  hover:bg-[#c1f001] font-[700] rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
          >
            Submit
          </button>
        </div>


      </div>
    </div>
  )
}

export default MachineProblem