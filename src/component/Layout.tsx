import React from 'react'
import { MdHome } from 'react-icons/md'
import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout: React.FC = () => {
  const location = useLocation()
  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      <header className="bg-white h-[78px] p-2 border-b border-t border-black">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="../public/image/canteen.png"
              alt="Canteen Logo"
              className="h-[50px] w-auto"
            />
          </div>
          {location.pathname !== '/' && (
            <div className="flex items-center border hover:bg-[#c1f001] border-black rounded-[11px] py-1.5 px-2">
              <Link to="/" className=" text-black hover:text-[#005599] flex items-center">
                <MdHome className="text-[24px] bg-[#4D4D4D] p-[2px] rounded-full text-white" />
                <span className="text-[12.5px] font-[700] text-[#4D4D4D] ml-2" style={{ textShadow: '0 0 0 #000' }}>
                Home
              </span>
              </Link>
             
            </div>
          )}

        </div>
      </header>

      {/* Route-specific Content */}
      <main className="flex-grow bg-[#4D4D4D] text-white">
        <Outlet />
      </main>
      {/* Common Footer */}
      {/* <footer className="mt-0 bg-[#4D4D4D] p-2 border-t border-black">
        <div className="container mx-1">
          <div className="text-[16px] font-[400] text-white underline">
            <Link to="/" className="hover:underline">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/" className="hover:underline">
              Terms of Use
            </Link>{" "}
            |{" "}
            <Link to="/" className="hover:underline">
              Privacy Request
            </Link>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

export default Layout