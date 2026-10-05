import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard({ onNavigate }) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error))
      .finally(() => setLoading(false))
  }, [])

  const totalStudents = students.length
  const attendanceRate = totalStudents > 0 ? '92%' : '—'
  const averageMarks = totalStudents > 0 ? '78' : '—'

  return (
    <div>
      <h3 className="page-title mb-4">Dashboard</h3>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card stat-card shadow-sm p-3">
                <p className="text-muted mb-1">Total Students</p>
                <h2 className="page-title mb-0">{totalStudents}</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card stat-card shadow-sm p-3">
                <p className="text-muted mb-1">Attendance</p>
                <h2 className="page-title mb-0">{attendanceRate}</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card stat-card shadow-sm p-3">
                <p className="text-muted mb-1">Average Marks</p>
                <h2 className="page-title mb-0">{averageMarks}</h2>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 p-4" style={{ borderRadius: 12 }}>
            <h5 className="mb-3">Quick Actions</h5>
            <div className="d-flex flex-wrap gap-2">
              <button className="btn brand-btn" onClick={() => onNavigate('students')}>
                Manage Students
              </button>
              <button className="btn btn-outline-secondary" onClick={() => onNavigate('attendance')}>
                View Attendance
              </button>
              <button className="btn btn-outline-secondary" onClick={() => onNavigate('marks')}>
                View Marks
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
