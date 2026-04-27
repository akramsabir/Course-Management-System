import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateCourse = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    price: '',
    category: '',
    image: ''
  })

  const { title, description, instructor, duration, price, category, image } = courseData

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!title || !description || !instructor || !duration || !price || !category || !image) {
      toast.error('Please fill all fields')
      return
    }

    try {
      const res = await axios.put(`http://localhost:3000/courses/${id}`, courseData)
      if (res.status === 200) {
        toast.success('Course updated successfully')
        navigate('/')
      }
    } catch (err) {
      toast.error('Failed to update course')
    }
  }

  const getCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/courses/${id}`)
      setCourseData(res.data)
    } catch (err) {
      toast.error('Failed to fetch course data')
    }
  }

  useEffect(() => {
    getCourse()
  }, [])

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Update Course</h2>

        <input
          type="text"
          name="title"
          value={title}
          placeholder="Course Name"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="url"
          name="image"
          value={image}
          placeholder="https://example.com/image.jpg"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="description"
          value={description}
          placeholder="Course Description"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="instructor"
          value={instructor}
          placeholder="Instructor Name"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="price"
          value={price}
          placeholder="Course Price"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="category"
          value={category}
          placeholder="Course Category"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="duration"
          value={duration}
          placeholder="Course Duration"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
          Update Course
        </button>
      </form>
    </div>
  )
}

export default UpdateCourse
