import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: ''
  })

  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch students when page loads
  useEffect(() => {
    fetchStudents()
  }, [])

  // GET all students
  const fetchStudents = () => {
    setLoading(true)

    axios
      .get('http://localhost:8080/students')
      .then((response) => {
        setStudents(response.data)
      })
      .catch((error) => {
        console.error('Error fetching students:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    // Remove error when user starts correcting the field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must contain at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email'
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must contain exactly 10 digits'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      department: '',
      phone: ''
    })

    setErrors({})
    setEditingId(null)
  }

  // POST - Add student
  const handleAddStudent = () => {
    if (!validateForm()) {
      return
    }

    axios
      .post('http://localhost:8080/students', formData)
      .then(() => {
        fetchStudents()
        resetForm()
      })
      .catch((error) => {
        console.error('Error adding student:', error)
      })
  }

  // DELETE - Delete student
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return
    }

    axios
      .delete(`http://localhost:8080/students/${id}`)
      .then(() => {
        fetchStudents()
      })
      .catch((error) => {
        console.error('Error deleting student:', error)
      })
  }

  // Edit button
  const handleEditClick = (student) => {
    setEditingId(student.id)

    setFormData({
      name: student.name,
      email: student.email,
      department: student.department,
      phone: student.phone
    })

    setErrors({})

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // PUT - Update student
  const handleUpdateStudent = () => {
    if (!validateForm()) {
      return
    }

    axios
      .put(`http://localhost:8080/students/${editingId}`, formData)
      .then(() => {
        fetchStudents()
        resetForm()
      })
      .catch((error) => {
        console.error('Error updating student:', error)
      })
  }

  // Search students
  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase()

    return (
      student.name?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.department?.toLowerCase().includes(search) ||
      student.phone?.toLowerCase().includes(search)
    )
  })

  return (
    <div
      style={{
        backgroundColor: '#f4f5f7',
        minHeight: '100vh'
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-dark mb-4"
        style={{
          backgroundColor: '#312e81'
        }}
      >
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            🎓 Student Management System
          </span>
        </div>
      </nav>

      <div className="container">

        {/* Form Card */}
        <div
          className="card p-4 mb-4 shadow-sm border-0"
          style={{
            borderRadius: '10px'
          }}
        >
          <h4
            className="mb-3"
            style={{
              color: '#312e81'
            }}
          >
            {editingId ? 'Edit Student' : 'Add New Student'}
          </h4>

          <div className="row">

            {/* Name */}
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`form-control ${
                  errors.name ? 'is-invalid' : ''
                }`}
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`form-control ${
                  errors.email ? 'is-invalid' : ''
                }`}
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Department */}
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="department"
                placeholder="Department"
                className={`form-control ${
                  errors.department ? 'is-invalid' : ''
                }`}
                value={formData.department}
                onChange={handleChange}
              />

              {errors.department && (
                <div className="invalid-feedback">
                  {errors.department}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                maxLength="10"
                className={`form-control ${
                  errors.phone ? 'is-invalid' : ''
                }`}
                value={formData.phone}
                onChange={handleChange}
              />

              {errors.phone && (
                <div className="invalid-feedback">
                  {errors.phone}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          {editingId ? (
            <div className="d-flex gap-2">
              <button
                className="btn flex-grow-1"
                style={{
                  backgroundColor: '#16a34a',
                  color: 'white'
                }}
                onClick={handleUpdateStudent}
              >
                Update Student
              </button>

              <button
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="btn w-100"
              style={{
                backgroundColor: '#312e81',
                color: 'white'
              }}
              onClick={handleAddStudent}
            >
              Add Student
            </button>
          )}
        </div>

        {/* Search */}
        <div
          className="card shadow-sm border-0 p-3 mb-4"
          style={{
            borderRadius: '10px'
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="🔎 Search by name, email, department or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Student List */}
        {loading ? (
          <p>Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <div
            className="card shadow-sm border-0 p-4"
            style={{
              borderRadius: '10px'
            }}
          >
            {searchTerm
              ? 'No students match your search.'
              : 'No students found. Add one using the form above!'}
          </div>
        ) : (
          <div
            className="card shadow-sm border-0 p-3"
            style={{
              borderRadius: '10px'
            }}
          >
            <div className="table-responsive">

              <table className="table table-hover mb-0">

                <thead>
                  <tr
                    style={{
                      backgroundColor: '#312e81'
                    }}
                  >
                    <th style={{ color: 'white' }}>ID</th>
                    <th style={{ color: 'white' }}>Name</th>
                    <th style={{ color: 'white' }}>Email</th>
                    <th style={{ color: 'white' }}>Department</th>
                    <th style={{ color: 'white' }}>Phone</th>
                    <th style={{ color: 'white' }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>

                      <td>{student.id}</td>

                      <td>{student.name}</td>

                      <td>{student.email}</td>

                      <td>{student.department}</td>

                      <td>{student.phone}</td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            handleEditClick(student)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(student.id)
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App