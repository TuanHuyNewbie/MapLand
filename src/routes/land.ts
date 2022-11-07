let cors2 = require('cors')

const LandController = require('../app/controllers/LandController')
let express2 = require('express');
let router2 = express2.Router();

router2
    .post('/add', cors2(), LandController.add)
    .get('/get', cors2(), LandController.get)
    .get('/delete', cors2(), LandController.delete)
    .get('/getall', cors2(),LandController.getAll)

module.exports = router2