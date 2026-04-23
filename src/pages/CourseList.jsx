import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Course from './Course'

const CourseList = () => {
  const [courses, setCourses] = useState([])

  const getCourses = async () => {
    const res = await axios.get('http://localhost:3000/courses')
    setCourses(res.data)
  }

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:3000/courses/${id}`)
    getCourses() // re-fetch after delete
  }

  useEffect(() => {
    getCourses()
  }, []) // ✅ run once

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map(course => (
        <Course
          key={course.id}
          {...course}
          onDelete={deleteCourse}
        />
      ))}
    </div>
  )
}

export default CourseList
