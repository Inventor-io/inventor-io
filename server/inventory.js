const express = require('express');
const router = express.Router();

// this route is to /api/inventory
router.get('/', (req, res) => {
  const data = [
    {
      Item: 'apple',
      Quantity: 3,
      Selected: false,
    },
    {
      Item: 'orange',
      Quantity: 4,
      Selected: true,
    },
  ];
  res.send(data);
});

module.exports = router;
