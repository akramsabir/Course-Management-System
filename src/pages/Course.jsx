import React, { useContext } from 'react'
import { Auth } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'
import { CartData } from '../context/CartContext'

const Course = (props) => {
  const { title, description, instructor, duration, image, price, category, id } = props
  const { user } = useContext(Auth)
  const { addToCart } = useContext(CartData)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <p className="text-sm text-gray-600">
          By <span className="font-medium">{instructor}</span>
        </p>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{category}</span>
          <span>{duration}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <p className="text-lg font-bold text-blue-600">
          ₹{price}
        </p>

        {/* ACTIONS */}
        {user?.role === 'admin' ? (
          <div className="flex gap-3 pt-3">
            <NavLink
              to={`/update/${id}`}
              className="px-3 py-1 rounded-md text-sm bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Update
            </NavLink>

            <button className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600">
              Delete
            </button>
          </div>
        ) : (
          <div className="flex gap-3 pt-3">
            <button className="px-3 py-1 rounded-md text-sm bg-gray-200 hover:bg-gray-300">
              View
            </button>

            <button
              onClick={() => addToCart(props)}
              className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Course
