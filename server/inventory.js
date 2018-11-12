const express = require('express');
const router = express.Router();

// this route is to /api/inventory
router.get('/', (req, res) => {
  res.send('/api/invetory route');
});

module.exports = router;
