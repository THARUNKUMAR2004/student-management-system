import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, formatSalary } from "../api";

function EmployeeProfile({ employeeId, onNavigate }) {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/${employeeId}`)
      .then((response) => setEmployee(response.data))
      .catch(() => setError("Employee not found."));
  }, [employeeId]);

  const details = employee
    ? [
        { label: "Employee ID", value: employee.id },
        { label: "Name", value: employee.name },
        { label: "Email", value: employee.email },
        { label: "Department", value: employee.department },
        { label: "Salary", value: formatSalary(employee.salary) },
      ]
    : [];

  return (
    <div>
      <h1 className="page-title">Employee Profile</h1>

      <div className="card">
        {error && <p className="error">{error}</p>}
        {!employee && !error && <p>Loading profile...</p>}

        {employee && (
          <>
            <div className="profile-header">
              <div className="avatar">{employee.name.charAt(0).toUpperCase()}</div>
              <div>
                <h2 className="profile-name">{employee.name}</h2>
                <p className="muted">{employee.department}</p>
              </div>
            </div>

            <div className="profile-grid">
              {details.map((item) => (
                <div key={item.label}>
                  <p className="stat-label">{item.label}</p>
                  <p className="profile-value">{item.value}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="form-actions">
          {employee && (
            <button onClick={() => onNavigate("edit", employee.id)}>
              Edit Employee
            </button>
          )}
          <button className="cancel" onClick={() => onNavigate("employees")}>
            Back to Employees
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
