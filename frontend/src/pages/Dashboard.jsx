import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, formatSalary } from "../api";

function Dashboard({ onNavigate }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setEmployees(response.data))
      .catch(() => setError("Could not load data. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  const salaries = employees.map((e) => Number(e.salary) || 0);
  const totalEmployees = employees.length;
  const totalDepartments = new Set(
    employees.map((e) => e.department.trim().toLowerCase())
  ).size;
  const averageSalary = totalEmployees
    ? salaries.reduce((sum, s) => sum + s, 0) / totalEmployees
    : 0;
  const highestSalary = totalEmployees ? Math.max(...salaries) : 0;

  // Newest employees = highest IDs
  const recent = [...employees].sort((a, b) => b.id - a.id).slice(0, 5);

  const stats = [
    { label: "Total Employees", value: totalEmployees },
    { label: "Departments", value: totalDepartments },
    { label: "Average Salary", value: formatSalary(Math.round(averageSalary)) },
    { label: "Highest Salary", value: formatSalary(highestSalary) },
  ];

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="card stat-card" key={stat.label}>
            <p className="stat-label">{stat.label}</p>
            <h3 className="stat-value">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Recent Employees</h2>
          <button className="btn-secondary" onClick={() => onNavigate("employees")}>
            View All
          </button>
        </div>

        {recent.length === 0 ? (
          <p className="empty">No employees yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.department}</td>
                    <td>{formatSalary(e.salary)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
