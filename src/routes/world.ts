let cors = require('cors')

const WorldController = require('../app/controllers/WorldController')
let express = require('express');
let router = express.Router();

router
    .get('/getall', cors(), WorldController.get_all)
    .post('/create', cors(), WorldController.create)
    .delete('/deletefromobjid', cors(), WorldController.delete_from_objId)
    .put('/updatebyid', cors(), WorldController.update_by_id)

module.exports = router