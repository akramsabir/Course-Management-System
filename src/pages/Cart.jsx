import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Cart = () => {
  const { user } = useContext(Auth)
  const [allCart, setAllCart] = useState([])

  const getCart = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/cart?userId=${user.id}`)
      setAllCart(res.data)
    } catch (err) {
      toast.error('Failed to fetch cart items')
    }
  }

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`)
      toast.success('Item removed from cart')
      getCart() // refresh cart
    } catch (err) {
      toast.error('Failed to remove item')
    }
  }

  useEffect(() => {
    if (user) getCart()
  }, [user])

  if (!allCart.length)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    )

  return (
    <div className="min-h-[60vh] p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {allCart.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover rounded-md mb-2"
            />
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="mt-1 font-bold">₹{item.price}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="mt-2 bg-red-500 text-white py-1 rounded-md hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
