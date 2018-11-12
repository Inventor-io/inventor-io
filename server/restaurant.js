const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.body);
  res.status(200).send('/api/restaurant route');
});

router.post('/', (req, res) => {
  console.log('SERVER', req.body);
  res.status(201).send('Success');
});

module.exports = router;
