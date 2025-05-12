const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Admin Schema
const adminSchema = new mongoose.Schema({
  adminid: { type: String, required: true },
  pass: { type: String, required: true },
});
// Admin Model
const Admin = mongoose.model('Admin', adminSchema);

// Admin Login Route
router.post('/login', async (req, res) => {
  const { adminid, pass } = req.body;
  try {
    // Validate admin credentials
    const admin = await Admin.findOne({ adminid, pass });
    if (admin) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid admin ID or password' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});
module.exports = router;