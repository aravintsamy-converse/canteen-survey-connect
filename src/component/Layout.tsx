import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      <header className="bg-white h-[75px] p-4 border-b">
        <div className="container mx-1">
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="text-lime-500 text-3xl font-bold">C</span>
              <span className="text-gray-600 text-sm ml-1">anteen</span>
            </div>
          </div>
        </div>
      </header>

      {/* Route-specific Content */}
      <main className="flex-grow bg-[#4D4D4D] text-white">
        <Outlet />
      </main>

      {/* Common Footer */}
      <footer className="mt-auto p-4">
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
      </footer>
    </div>
  )
}

export default Layout