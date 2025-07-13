let employees = [];

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".employee-card");
  employees = Array.from(cards).map(card => ({
    id: card.dataset.id,
    firstName: card.querySelector("h3").textContent.split(" ")[0],
    lastName: card.querySelector("h3").textContent.split(" ")[1],
    email: card.querySelector("p:nth-of-type(1)").textContent.replace("Email: ", ""),
    department: card.querySelector("p:nth-of-type(2)").textContent.replace("Department: ", ""),
    role: card.querySelector("p:nth-of-type(3)").textContent.replace("Role: ", "")
  }));
  bindEvents();
  updateShowCount();
});

function render(data) {
  const container = document.getElementById("employeeCards");
  container.innerHTML = "";
  data.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.dataset.id = emp.id;
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `;
    container.appendChild(card);
  });
  bindRowEvents();
  updateShowCount();
}

function bindEvents() {
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("filterToggleBtn").addEventListener("click", toggleFilterForm);
  document.getElementById("applyFilterBtn").addEventListener("click", applyFilters);
  document.getElementById("resetFilterBtn").addEventListener("click", resetFilters);
  document.getElementById("sortSelect").addEventListener("change", applyFilters);
  document.getElementById("showSelect").addEventListener("change", applyFilters);
  document.getElementById("addEmployeeBtn").addEventListener("click", showForm);
  document.getElementById("employeeForm").addEventListener("submit", handleFormSubmit);
  document.getElementById("cancelFormBtn").addEventListener("click", hideForm);
  bindRowEvents();
}

function bindRowEvents() {
  document.querySelectorAll(".editBtn").forEach(btn => {
    btn.onclick = e => {
      const id = e.target.closest(".employee-card").dataset.id;
      const emp = employees.find(e => e.id === id);
      showForm(true, emp);
    };
  });

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.onclick = e => {
      const id = e.target.closest(".employee-card").dataset.id;
      employees = employees.filter(emp => emp.id !== id);
      applyFilters();
    };
  });
}

function toggleFilterForm() {
  const form = document.getElementById("filterForm");
  form.style.display = form.style.display === "block" ? "none" : "block";
}

function showForm(isEdit = false, emp = null) {
  const formContainer = document.getElementById("employeeFormContainer");
  formContainer.style.display = "block";
  document.getElementById("formTitle").textContent = isEdit ? "Edit Employee" : "Add Employee";
  if (emp) {
    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
  } else {
    document.getElementById("employeeForm").reset();
    document.getElementById("employeeId").value = "";
  }
}

function hideForm() {
  document.getElementById("employeeFormContainer").style.display = "none";
}

function handleFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("employeeId").value.trim();
  const newEmp = {
    id: id || "E" + Date.now(),
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    role: document.getElementById("role").value.trim()
  };
  if (!newEmp.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    alert("Invalid email format");
    return;
  }
  if (id) {
    employees = employees.map(emp => emp.id === id ? newEmp : emp);
  } else {
    employees.push(newEmp);
  }
  hideForm();
  applyFilters();
}

function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const firstName = document.getElementById("filterFirstName").value.toLowerCase();
  const dept = document.getElementById("filterDepartment").value.toLowerCase();
  const role = document.getElementById("filterRole").value.toLowerCase();
  const sortBy = document.getElementById("sortSelect").value;

  const showLimit = parseInt(document.getElementById("showSelect").value);
  const sliced = filtered.slice(0, showLimit);
  render(sliced);


  let filtered = employees.filter(emp => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const nameEmailMatch = fullName.includes(search) || emp.email.toLowerCase().includes(search);
    const firstNameMatch = firstName ? emp.firstName.toLowerCase().includes(firstName) : true;
    const deptMatch = dept ? emp.department.toLowerCase().includes(dept) : true;
    const roleMatch = role ? emp.role.toLowerCase().includes(role) : true;
    return nameEmailMatch && firstNameMatch && deptMatch && roleMatch;
  });

  filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  render(filtered);
}

function resetFilters() {
  document.getElementById("filterFirstName").value = "";
  document.getElementById("filterDepartment").value = "";
  document.getElementById("filterRole").value = "";
  applyFilters();
}

function updateShowCount() {
  document.getElementById("showCount").textContent = `Showing ${employees.length} Employees`;
}
