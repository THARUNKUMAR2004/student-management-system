import { useEffect, useState } from 'react'
import axios from 'axios'

const demoUsers = [
  { id: 1, username: 'admin', role: 'Admin' },
  { id: 2, username: 'faculty', role: 'Faculty' },
  { id: 3, username: 'viewer', role: 'Viewer' }
]

function AdminPanel() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h3 className="page-title mb-4">Admin Panel</h3>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-3" style={{ borderRadius: 12 }}>
            <h5 className="mb-3">User Management</h5>
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {demoUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-3" style={{ borderRadius: 12 }}>
            <h5 className="mb-3">Student Records</h5>
            {loading ? (
              <p className="mb-0">Loading students...</p>
            ) : students.length === 0 ? (
              <p className="mb-0">No students in the system yet.</p>
            ) : (
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
