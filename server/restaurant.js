const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.body);
  res.status(200).send('/api/restaurant route');
});

module.exports = router;
