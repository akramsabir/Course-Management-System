import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(Auth)

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors
     ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'}`

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        
        {/* Left - Logo & Links */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            Courses
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink to="/add" className={linkClass}>
              Add Courses
            </NavLink>
          )}

          <NavLink to="/cart" className={linkClass}>
            Cart
          </NavLink>
        </div>

        {/* Right - Auth / User */}
        <div className="flex items-center gap-4">
          {!user && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={linkClass}>
                Sign Up
              </NavLink>
            </>
          )}

          {user && (
            <>
              <button
                onClick={logout}
                className="px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                Logout
              </button>

              {/* User Avatar */}
              <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg shadow-md">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
