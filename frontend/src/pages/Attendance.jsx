const demoAttendance = [
  { id: 1, name: 'Anita Sharma', date: '2026-10-03', status: 'Present' },
  { id: 2, name: 'Rahul Verma', date: '2026-10-03', status: 'Absent' },
  { id: 3, name: 'Priya Nair', date: '2026-10-03', status: 'Present' },
  { id: 4, name: 'Anita Sharma', date: '2026-10-04', status: 'Present' },
  { id: 5, name: 'Rahul Verma', date: '2026-10-04', status: 'Present' },
  { id: 6, name: 'Priya Nair', date: '2026-10-04', status: 'Late' }
]

function Attendance() {
  return (
    <div>
      <h3 className="page-title mb-2">Attendance</h3>
      <p className="text-muted mb-4">Sample data for presentation</p>

      <div className="card shadow-sm border-0 p-3" style={{ borderRadius: 12 }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr style={{ backgroundColor: '#312e81' }}>
                <th style={{ color: 'white' }}>Student</th>
                <th style={{ color: 'white' }}>Date</th>
                <th style={{ color: 'white' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {demoAttendance.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        row.status === 'Present'
                          ? 'bg-success'
                          : row.status === 'Late'
                            ? 'bg-warning text-dark'
                            : 'bg-danger'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Attendance
