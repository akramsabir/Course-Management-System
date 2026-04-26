import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { v4 as randomId } from 'uuid'

const AddCourse = () => {
  const navigate = useNavigate()

  const [courseData, setCourseData] = useState({
    id: randomId(),
    title: '',
    image: '',
    price: '',
    duration: '',
    instructor: '',
    category: ''
  })

  const { title, image, price, duration, instructor, category } = courseData

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !image) {
      toast.error('Please provide course title and image')
      return
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/courses',
        courseData
      )

      if (response.status === 201) {
        toast.success('Course added successfully')
        navigate('/')
      }

      setCourseData({
        id: randomId(),
        title: '',
        image: '',
        price: '',
        duration: '',
        instructor: '',
        category: ''
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Add New Course
        </h2>

        <Input label="Course Title" name="title" value={title} onChange={handleChange} />
        <Input label="Image URL" name="image" value={image} onChange={handleChange} />
        <Input label="Price" name="price" type="number" value={price} onChange={handleChange} />
        <Input label="Duration" name="duration" value={duration} onChange={handleChange} />
        <Input label="Instructor" name="instructor" value={instructor} onChange={handleChange} />
        <Input label="Category" name="category" value={category} onChange={handleChange} />

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  )
}

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)

export default AddCourse
