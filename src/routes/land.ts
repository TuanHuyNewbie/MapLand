const cors = require('cors')

const LandController = require('../app/controllers/LandController')
const express = require('express');
const router = express.Router();

router
    .post('/add', cors(), LandController.add)
    .post('/get', cors(), LandController.get)
    .get('/delete', cors(), LandController.delete)

module.exports = router