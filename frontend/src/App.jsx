import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import EmployeeProfile from "./pages/EmployeeProfile.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import "./App.css";

// Simple state-based navigation (no router library needed)
function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedId, setSelectedId] = useState(null);

  const navigate = (nextPage, id = null) => {
    setPage(nextPage);
    setSelectedId(id);
  };

  return (
    <div className="layout">
      <Sidebar currentPage={page} onNavigate={navigate} />

      <main className="content">
        {page === "dashboard" && <Dashboard onNavigate={navigate} />}
        {page === "employees" && <Employees onNavigate={navigate} />}
        {page === "profile" && (
          <EmployeeProfile employeeId={selectedId} onNavigate={navigate} />
        )}
        {page === "add" && <EmployeeForm onNavigate={navigate} />}
        {page === "edit" && (
          <EmployeeForm key={selectedId} employeeId={selectedId} onNavigate={navigate} />
        )}
      </main>
    </div>
  );
}

export default App;
