import React from 'react';
import { MdHome } from 'react-icons/md';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEqpId } from '../EquipmentIdContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { eqpId } = useEqpId();
  const navigate = useNavigate();

  const handleNavigation = (to: string) => {
    navigate(to);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      <header className="bg-white h-[78px] p-2 border-b border-t border-black">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigation(`/survey/home/${eqpId}`)}>
            <img
              src="/canteenlogo.png"
              alt="Canteen Logo"
              className="h-[50px] w-auto"
            />
          </div>
          {location.pathname !== `/survey/home/${eqpId}` && (
            <div className="flex items-center border cursor-pointer hover:bg-[#c1f001] border-black rounded-[11px] py-1.5 px-2">
              <button
                onClick={() => handleNavigation(`/survey/home/${eqpId}`)}
                className="text-black hover:text-[#005599] cursor-pointer flex items-center"
              >
                <MdHome className="text-[24px] bg-[#4D4D4D] p-[2px] rounded-full text-white" />
                <span
                  className="text-[12.5px] font-[700] text-[#4D4D4D] ml-2"
                  style={{ textShadow: '0 0 0 #000' }}
                >
                  Home
                </span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow bg-[#4D4D4D] text-white">
        <Outlet />
      </main>
      {/* Common Footer */}
      <footer className="mt-0 bg-[#4D4D4D] p-2">
        <div className="container mx-1">
          <div className="flex gap-x-1.5 items-center text-[13px] font-[700] text-white underline">
            <a href="https://www.compass-usa.com/privacy/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Privacy Policy
            </a>
            <div className="border-l border-white h-4"></div>
            <a href="https://www.compass-usa.com/terms-of-use/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Terms of Use
            </a>
            <div className="border-l border-white h-4"></div>
            <a href="https://privacyportal-eu-cdn.onetrust.com/dsarwebform/8394ad8c-2b46-4837-8771-cbc69779a644/31bea1f4-92c3-440b-be0e-468af4f4b1f3.html?Source=Compass" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Privacy Request
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Layout;