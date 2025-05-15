import React from 'react';
import { MdHome } from 'react-icons/md';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEqpId } from '../EquipmentIdContext';

interface LayoutProps {
  setIsNavigating: (isNavigating: boolean) => void;
}

const Layout: React.FC<LayoutProps>  = ({setIsNavigating}) => {
  const location = useLocation();
  const { eqpId } = useEqpId();
  const navigate = useNavigate();


  const handleNavigation = (to: string) => {
    setIsNavigating(true);
    navigate(to);
    
    // Simulate loading delay (remove this in production or adjust as needed)
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      <header className="bg-white h-[78px] p-2 border-b border-t border-black">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/canteen.png"
              alt="Canteen Logo"
              className="h-[50px] w-auto"
            />
          </div>
          {location.pathname !== `/survey/home/${eqpId}` && (
            <div className="flex items-center border hover:bg-[#c1f001] border-black rounded-[11px] py-1.5 px-2">
              <button
                onClick={() => handleNavigation(`/survey/home/${eqpId}`)}
                className="text-black hover:text-[#005599] flex items-center"
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
            <Link to={`/survey/home`} className="hover:underline">
              Privacy Policy
            </Link>
            <div className="border-l border-white h-4"></div>
            <Link to={`/survey/home`} className="hover:underline">
              Terms of Use
            </Link>
            <div className="border-l border-white h-4"></div>
            <Link to={`/survey/home`} className="hover:underline">
              Privacy Request
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;