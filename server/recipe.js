const express = require('express');
const router = express.Router();

// this route is to /apit/recipe
router.get('/', (req, res) => {
  res.send('/api/recipe route');
});

module.exports = router;
