import { useEffect, useState } from 'react'
import axios from 'axios'

function StudentProfile() {
  const [students, setStudents] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/students')
      .then((response) => {
        setStudents(response.data)
        if (response.data.length > 0) {
          setSelectedId(String(response.data[0].id))
        }
      })
      .catch((error) => console.error('Error fetching students:', error))
      .finally(() => setLoading(false))
  }, [])

  const student = students.find((item) => String(item.id) === selectedId)

  return (
    <div>
      <h3 className="page-title mb-4">Student Profile</h3>

      {loading ? (
        <p>Loading profile...</p>
      ) : students.length === 0 ? (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: 12 }}>
          No students found. Add a student from the Students page first.
        </div>
      ) : (
        <>
          <div className="card shadow-sm border-0 p-3 mb-4" style={{ borderRadius: 12 }}>
            <label className="form-label mb-2">Select student</label>
            <select
              className="form-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {students.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.department})
                </option>
              ))}
            </select>
          </div>

          {student && (
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: 12 }}>
              <h4 className="page-title mb-3">{student.name}</h4>
              <div className="row">
                <div className="col-md-6 mb-2"><strong>ID:</strong> {student.id}</div>
                <div className="col-md-6 mb-2"><strong>Email:</strong> {student.email}</div>
                <div className="col-md-6 mb-2"><strong>Department:</strong> {student.department}</div>
                <div className="col-md-6 mb-2"><strong>Phone:</strong> {student.phone}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StudentProfile
