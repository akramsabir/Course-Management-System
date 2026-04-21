import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { v4 as randomId } from 'uuid'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    id: randomId(),
    role: 'user'
  })

  const { username, email, password, confirmPassword } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill all fields')
      return
    }

    if (!email.includes('@')) {
      toast.error('Enter a valid email')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const alreadyExist = await axios.get(
        `http://localhost:3000/users?email=${email}`
      )

      if (alreadyExist.data.length > 0) {
        toast.error('User already exists')
        return
      }

      const res = await axios.post('http://localhost:3000/users', formData)
      if (res.status === 201) {
        toast.success('Signup successful')
        navigate('/login')
      }

      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        id: randomId(),
        role: 'user'
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Sign Up</h2>

        <input
          type="text"
          name="username"
          value={username}
          placeholder="Enter name"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
