document.addEventListener('DOMContentLoaded', function() {
    const employeeForm = document.getElementById('employeeForm');
    const employeeTable = document.getElementById('employeeTable');

    // Load all employees when the page loads
    fetchEmployees();

    // Add employee form submit event
    employeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const employeeId = document.getElementById('employeeId').value; // Get employeeId
        const name = document.getElementById('name').value;
        const salary = document.getElementById('salary').value;
        const city = document.getElementById('city').value;

        fetch('/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employeeId, name, salary, city }) // Include employeeId in the request
        }).then(res => res.json())
        .then(() => {
            fetchEmployees();  // Reload employees after adding
            employeeForm.reset();
        });
    });

    // Fetch all employees
    function fetchEmployees() {
        fetch('/employees')
        .then(res => res.json())
        .then(data => {
            employeeTable.innerHTML = '';
            data.forEach(employee => {
                employeeTable.innerHTML += `
                    <tr>
                        <td>${employee.employeeId}</td> <!-- Display employeeId -->
                        <td>${employee.name}</td>
                        <td>${employee.salary}</td>
                        <td>${employee.city}</td>
                        <td>
                            <button onclick="deleteEmployee('${employee.employeeId}')">Delete</button>
                            <button onclick="editEmployee('${employee.employeeId}', '${employee.name}', ${employee.salary}, '${employee.city}')">Edit</button>
                        </td>
                    </tr>
                `;
            });
        });
    }

    // Delete an employee
    window.deleteEmployee = function(id) {
        fetch(`/employees/${id}`, {
            method: 'DELETE'
        }).then(() => fetchEmployees());
    }

    // Edit an employee (populate the form for editing)
    window.editEmployee = function(id, name, salary, city) {
        document.getElementById('employeeId').value = id; // Populate employeeId
        document.getElementById('name').value = name;
        document.getElementById('salary').value = salary;
        document.getElementById('city').value = city;

        employeeForm.addEventListener('submit', function updateEmployee(event) {
            event.preventDefault();

            fetch(`/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employeeId: document.getElementById('employeeId').value,
                    name: document.getElementById('name').value,
                    salary: document.getElementById('salary').value,
                    city: document.getElementById('city').value
                })
            }).then(() => {
                fetchEmployees();
                employeeForm.removeEventListener('submit', updateEmployee);  // Remove event listener to avoid multiple edits
                employeeForm.reset();
            });
        });
    }
});
