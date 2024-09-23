const mongoose = require('mongoose');

// Employee schema
const EmployeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true // Ensure employee IDs are unique
    },
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, { versionKey: false });  // Disable __v

module.exports = mongoose.model('Employee', EmployeeSchema);
