const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Create a new employee
router.post('/', async (req, res) => {
    const { employeeId, name, salary, city } = req.body;
    try {
        const employee = new Employee({ employeeId, name, salary, city });
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().select('-__v');  // Exclude __v
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an employee
router.put('/:id', async (req, res) => {
    const { employeeId, name, salary, city } = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, { employeeId, name, salary, city }, { new: true }).select('-__v');  // Exclude __v
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
