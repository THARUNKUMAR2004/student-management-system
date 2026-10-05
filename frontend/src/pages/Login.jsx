import { useState } from 'react'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password')
      return
    }

    onLogin(username.trim())
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', background: '#f4f5f7' }}
    >
      <div className="card shadow-sm border-0 p-4" style={{ width: '100%', maxWidth: 420, borderRadius: 12 }}>
        <h3 className="page-title mb-1">Student Management</h3>
        <p className="text-muted mb-4">Sign in to continue (demo login)</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="any password"
            />
          </div>

          <button type="submit" className="btn brand-btn w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
