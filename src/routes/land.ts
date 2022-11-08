const cors2 = require('cors')

const LandController = require('../app/controllers/LandController')
const express2 = require('express');
const router2 = express2.Router();

router2
    .post('/add', cors2(), LandController.add)
    .post('/get', cors2(), LandController.get)
    .get('/delete', cors2(), LandController.delete)
    .get('/getall', cors2(), LandController.getall)

module.exports = router2