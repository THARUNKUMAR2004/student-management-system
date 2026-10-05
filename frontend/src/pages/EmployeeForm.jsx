import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

const emptyForm = { name: "", email: "", department: "", salary: "" };

// Used for both "Add Employee" (no employeeId) and "Edit Employee"
function EmployeeForm({ employeeId, onNavigate }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(employeeId));

  useEffect(() => {
    if (!employeeId) return;

    axios
      .get(`${API_URL}/${employeeId}`)
      .then((response) => {
        const e = response.data;
        setForm({
          name: e.name,
          email: e.email,
          department: e.department,
          salary: e.salary ?? "",
        });
      })
      .catch(() => setError("Employee not found."))
      .finally(() => setLoading(false));
  }, [employeeId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = { ...form, salary: Number(form.salary) };

    try {
      if (employeeId) {
        await axios.put(`${API_URL}/${employeeId}`, payload);
        onNavigate("profile", employeeId);
      } else {
        await axios.post(API_URL, payload);
        onNavigate("employees");
      }
    } catch (err) {
      const messages = err.response?.data?.messages;
      setError(
        messages
          ? Object.values(messages).join(", ")
          : "Could not save employee. The email may already exist."
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="page-title">{employeeId ? "Edit Employee" : "Add Employee"}</h1>

      <div className="card">
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Employee Name"
            value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email"
            value={form.email} onChange={handleChange} required />
          <input type="text" name="department" placeholder="Department"
            value={form.department} onChange={handleChange} required />
          <input type="number" name="salary" placeholder="Salary" min="0"
            value={form.salary} onChange={handleChange} required />

          <div className="form-actions full-width">
            <button type="submit">
              {employeeId ? "Update Employee" : "Add Employee"}
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() =>
                employeeId ? onNavigate("profile", employeeId) : onNavigate("employees")
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
