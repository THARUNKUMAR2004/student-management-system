export const API_URL = "http://localhost:8080/api/employees";

export const formatSalary = (value) =>
  value === null || value === undefined || value === ""
    ? "-"
    : "₹" + Number(value).toLocaleString("en-IN");
