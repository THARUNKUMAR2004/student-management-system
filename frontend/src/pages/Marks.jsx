const demoMarks = [
  { id: 1, name: 'Anita Sharma', subject: 'Mathematics', marks: 88 },
  { id: 2, name: 'Anita Sharma', subject: 'Science', marks: 81 },
  { id: 3, name: 'Rahul Verma', subject: 'Mathematics', marks: 74 },
  { id: 4, name: 'Rahul Verma', subject: 'Science', marks: 69 },
  { id: 5, name: 'Priya Nair', subject: 'Mathematics', marks: 91 },
  { id: 6, name: 'Priya Nair', subject: 'Science', marks: 85 }
]

function Marks() {
  const average = Math.round(
    demoMarks.reduce((sum, row) => sum + row.marks, 0) / demoMarks.length
  )

  return (
    <div>
      <h3 className="page-title mb-2">Marks</h3>
      <p className="text-muted mb-4">Sample data for presentation</p>

      <div className="card stat-card shadow-sm p-3 mb-4" style={{ maxWidth: 280 }}>
        <p className="text-muted mb-1">Class Average</p>
        <h2 className="page-title mb-0">{average}</h2>
      </div>

      <div className="card shadow-sm border-0 p-3" style={{ borderRadius: 12 }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr style={{ backgroundColor: '#312e81' }}>
                <th style={{ color: 'white' }}>Student</th>
                <th style={{ color: 'white' }}>Subject</th>
                <th style={{ color: 'white' }}>Marks</th>
              </tr>
            </thead>
            <tbody>
              {demoMarks.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.subject}</td>
                  <td>{row.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Marks
