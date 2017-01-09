const express = require('express');
const router  =  new express.Router();

function getRoot(req, res) {
  res.status(200).json({ status: 'API is running OK...' });
}

router.get('/', getRoot);

module.exports = router;
