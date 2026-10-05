import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, formatSalary } from "../api";

function Employees({ onNavigate }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const [reload, setReload] = useState(0);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setEmployees(response.data);
        setError("");
      })
      .catch(() => setError("Could not load employees. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [reload]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setReload((n) => n + 1);
    } catch {
      setError("Could not delete the employee.");
    }
  };

  const departments = [...new Set(employees.map((e) => e.department))].sort();

  const filtered = employees.filter((e) => {
    const text = search.toLowerCase();
    const matchesSearch =
      e.name.toLowerCase().includes(text) ||
      e.email.toLowerCase().includes(text);
    const matchesDepartment = !department || e.department === department;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Employees</h1>
        <button onClick={() => onNavigate("add")}>+ Add Employee</button>
      </div>

      <div className="card">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.department}</td>
                    <td>{formatSalary(e.salary)}</td>
                    <td className="actions">
                      <button className="view" onClick={() => onNavigate("profile", e.id)}>
                        View
                      </button>
                      <button className="edit" onClick={() => onNavigate("edit", e.id)}>
                        Edit
                      </button>
                      <button className="delete" onClick={() => handleDelete(e.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="empty">No employees found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Employees;
