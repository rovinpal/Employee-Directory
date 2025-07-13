<#include "data.ftl">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Employee Directory</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <header>
    <div class="nav-left">Employee Directory</div>
    <div class="nav-center">
      <input type="text" id="searchInput" placeholder="Search by name/email">
    </div>
    <div class="nav-right">
      <button id="filterToggleBtn">Filter</button>
    </div>
  </header>

  <div class="filter-form" id="filterForm">
    <input type="text" id="filterFirstName" placeholder="First Name">
    <input type="text" id="filterDepartment" placeholder="Department">
    <input type="text" id="filterRole" placeholder="Role">
    <button id="applyFilterBtn">Apply</button>
    <button id="resetFilterBtn">Reset</button>
  </div>

  <div class="controls">
    <div class="controls-left">
      <label>Sort:
        <select id="sortSelect">
          <option value="firstName">First Name</option>
          <option value="department">Department</option>
        </select>
      </label>
      <label>Show:
        <select id="showSelect">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </label>
    </div>
    <div class="controls-right">
      <button id="addEmployeeBtn">Add Employee</button>
    </div>
  </div>

  <main id="employeeCards">
    <#list employees as emp>
      <div class="employee-card" data-id="${emp.id}">
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p>Email: ${emp.email}</p>
        <p>Department: ${emp.department}</p>
        <p>Role: ${emp.role}</p>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
    </#list>
  </main>

  <div class="form-container" id="employeeFormContainer">
    <h2 id="formTitle">Add Employee</h2>
    <form id="employeeForm">
      <input type="hidden" id="employeeId" />
      <input type="text" id="firstName" placeholder="First Name" required />
      <input type="text" id="lastName" placeholder="Last Name" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="text" id="department" placeholder="Department" required />
      <input type="text" id="role" placeholder="Role" required />
      <button type="submit">Add</button>
      <button type="button" id="cancelFormBtn">Cancel</button>
    </form>
  </div>

  <footer>
    © 2025 Employee Directory App. All rights reserved.
  </footer>

  <script src="js/app.js"></script>
</body>
</html>
