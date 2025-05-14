import { useEffect, useState } from "react";

const MachineProblem = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: '',
    issues: {
      needsToBeFilled: false,
      notAcceptingMoney: false,
      needsCleaning: false,
      wontAcceptCreditCard: false,
      machineIsNotWorking: false,
      machineIsDamaged: false
    }
  });
  console.log("🚀 ~ MachineProblem ~ formData:", formData)

  // Validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    issues: ''
  });

  // Characters remaining counters
  const [commentCharsRemaining, setCommentCharsRemaining] = useState(1000);
  const [nameCharsRemaining, setNameCharsRemaining] = useState(50);

  // Handle checkbox changes
  const handleIssueChange = (issue: keyof typeof formData.issues) => {
    setFormData({
      ...formData,
      issues: {
        ...formData.issues,
        [issue]: !formData.issues[issue]
      }
    });
  };

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log("🚀 ~ handleInputChange ~ e.target:", e.target)
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Track remaining characters
  useEffect(() => {
    setCommentCharsRemaining(1000 - formData.comments.length);
    setNameCharsRemaining(50 - formData.name.length);
  }, [formData.comments, formData.name]);

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      issues: ''
    };

    // Check if name is provided
    if (!formData.name.trim()) {
      newErrors.name = '* Required';
      isValid = false;
    }

    // Validate email format
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

    // Check if at least one issue is selected
    const hasSelectedIssue = Object.values(formData.issues).some(value => value);
    if (!hasSelectedIssue) {
      newErrors.issues = 'Please select at least one issue';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission logic here
      alert('Form submitted successfully!');
    }
  };
  return (
    <div className="w-full xl:w-[96%] mx-1 p-3 min-h-screen">
     <h1 className="text-[22px] font-[700] text-white">Machine Problem? </h1>
     <div className=" mx-auto">
        <div className="mb-6">
          <p className="font-semibold mb-2">Choose all issues that apply:</p>
          <div className="border rounded">
            {Object.entries(formData.issues).map(([key, value], index) => {
              // Convert camelCase to display text
              const issueText = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .replace(/Wont/g, 'Won\'t')
              .replace(/To Be/g, 'to be')
              .replace(/Is Not /g, 'is not ')
              .replace(/Is /g, 'is ');

              return (
                <div 
                  key={key}
                  className={`p-3 flex items-center text-white text-shadow-lg ${
                    index !== Object.entries(formData.issues).length - 1 ? 'border-b' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => handleIssueChange(key as keyof typeof formData.issues)}
                    className="mr-3 h-5 w-5"
                  />
                  <label htmlFor={key} className="select-none">{issueText}</label>
                </div>
              );
            })}
          </div>
          {errors.issues && (
            <p className="text-red-500 mt-1">{errors.issues}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="comments" className="block mb-1">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows={6}
            maxLength={1000}
            className="w-full p-3 bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-right text-sm mt-1">
            {commentCharsRemaining} Characters Remaining
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2">If you would like to receive a confirmation email please provide contact information below:</p>
          
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name: {errors.name && <span className="text-red-500">{errors.name}</span>}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={50}
              className="w-full p-2 bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-right text-sm mt-1">
              {nameCharsRemaining} Characters Remaining
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email Address: {errors.email && <span className="text-red-500">{errors.email}</span>}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">
              Phone (e.g. 9998887777 or 19998887777):
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleSubmit} 
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          SIID: 11900606 - JDEID: 0
        </div>
      </div>
  </div>
  )
}

export default MachineProblem