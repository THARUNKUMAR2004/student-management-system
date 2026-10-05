import { useState } from 'react'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Students from './pages/Students.jsx'
import StudentProfile from './pages/StudentProfile.jsx'
import Attendance from './pages/Attendance.jsx'
import Marks from './pages/Marks.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('sms_logged_in') === 'true'
  )
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem('sms_page') || 'dashboard'
  )

  const handleLogin = () => {
    sessionStorage.setItem('sms_logged_in', 'true')
    sessionStorage.setItem('sms_page', 'dashboard')
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('sms_logged_in')
    sessionStorage.removeItem('sms_page')
    setIsLoggedIn(false)
    setCurrentPage('dashboard')
  }

  const handleNavigate = (page) => {
    sessionStorage.setItem('sms_page', page)
    setCurrentPage(page)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === 'students' && <Students />}
      {currentPage === 'profile' && <StudentProfile />}
      {currentPage === 'attendance' && <Attendance />}
      {currentPage === 'marks' && <Marks />}
      {currentPage === 'admin' && <AdminPanel />}
    </Layout>
  )
}

export default App
