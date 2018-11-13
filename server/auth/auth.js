const express = require('express');
const router = express.Router();

// This route is to /api/auth
router.get('/', (req, res) => {
  res.send('/api/auth route');
});

module.exports = router;
