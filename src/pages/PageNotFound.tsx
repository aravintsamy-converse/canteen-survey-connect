import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="w-full xl:w-[96%] mx-1 p-4 text-white">
      <h1 className="text-[24px] font-[700]">404 - Page Not Found</h1>
      <p className="text-[16px] mt-2">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;