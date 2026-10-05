function Layout({ currentPage, onNavigate, onLogout, children }) {
  const links = [
    { id: 'login', label: 'Login' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'students', label: 'Students' },
    { id: 'profile', label: 'Student Profile' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'marks', label: 'Marks' },
    { id: 'admin', label: 'Admin Panel' }
  ]

  return (
    <div className="app-shell d-flex">
      <aside className="sidebar d-flex flex-column p-3">
        <h5 className="text-white mb-4">Student Portal</h5>

        <nav className="nav flex-column flex-grow-1">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`nav-link text-start btn ${
                currentPage === link.id ? 'active' : ''
              }`}
              onClick={() =>
                link.id === 'login' ? onLogout() : onNavigate(link.id)
              }
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="btn btn-outline-light btn-sm mt-3"
          onClick={onLogout}
        >
          Logout
        </button>
      </aside>

      <div className="flex-grow-1">
        <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
          <strong className="page-title">Student Management System</strong>
          <span className="text-muted small">Presentation Demo</span>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}

export default Layout
