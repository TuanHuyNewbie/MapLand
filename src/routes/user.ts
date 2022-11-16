const cors1 = require('cors')
const UserController = require('../app/controllers/UserController')
const express1 = require('express');
const router1 = express1.Router();
router1
    .post('/add', cors1(), UserController.add)
export default router1