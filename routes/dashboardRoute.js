const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const technicianOnly = require('../middleware/technicianOnly');
const {adminDashboard, technicianDashboard } = require('../controllers/dashboardController');

// Admin dashboard
router.get('/dashboard/admin', auth, adminOnly, adminDashboard);

// Technician dashboard
router.get('/dashboard/technician', auth, technicianOnly, technicianDashboard);

module.exports = router;
