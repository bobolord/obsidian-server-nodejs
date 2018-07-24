const express = require('express');
const router = new express.Router();
const dataService = require('../services/dataService');
const pingService = require('../services/pingService.js');
var csrf = require('csurf')

router.get('/', (req, res) => {
  res.send('api works');
});
var csrfProtection = csrf({ cookie: true })

router.get('/gettoken', (req, res) => {
  res.send('api works');
});

module.exports = router;
