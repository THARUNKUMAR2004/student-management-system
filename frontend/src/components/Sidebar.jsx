function Sidebar({ currentPage, onNavigate }) {
  const links = [
    { id: "dashboard", label: "Dashboard" },
    { id: "employees", label: "Employees" },
    { id: "add", label: "Add Employee" },
  ];

  // Profile page highlights "Employees"; edit page highlights nothing special
  const activeId = currentPage === "profile" ? "employees" : currentPage;

  return (
    <aside className="sidebar">
      <h2 className="brand">EMS</h2>
      <p className="brand-sub">Employee Management</p>

      <nav>
        {links.map((link) => (
          <button
            key={link.id}
            className={`nav-link ${activeId === link.id ? "active" : ""}`}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
