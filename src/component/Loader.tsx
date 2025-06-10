import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 backdrop-brightness-60 flex items-center justify-center z-50 bg-opacity-50">
      <div className="bg-[#7a7777] h-[130px] w-[300px] gap-y-3 bg-opacity-90 rounded-lg flex flex-col items-center justify-center px-6">
        <div className="relative bg-black w-13 p-1.5 h-13 rounded-full">
          <div
            className="w-10 h-10  rounded-full animate-spin-custom"
            style={{
              background: 'conic-gradient(from 0deg, rgba(156, 163, 175, 1) 0%, rgba(156, 163, 175, 0.1) 100%)',
              clipPath: 'circle(50% at 50% 50%)',
              WebkitMask: 'radial-gradient(circle at 50% 50%, transparent 50%, black 60%)',
            }}
          ></div>
        </div>
        <div className="text-white text-lg font-semibold">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;