import { useContext, useState } from 'react'
import { Auth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {
  const { login } = useContext(Auth)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  })

  const { email, password, role } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password || !role) {
      toast.error('Please fill all fields')
      return
    }

    const res = await axios.get(
      `http://localhost:3000/users?email=${email}&password=${password}&role=${role}`
    )

    if (res.data.length) {
      login(res.data[0])
      toast.success('Login successful')
      navigate('/')
    } else {
      toast.error('Invalid credentials')
    }

    setFormData({ email: '', password: '', role: '' })
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={handleChange}
            />
            User
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={handleChange}
            />
            Admin
          </label>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
