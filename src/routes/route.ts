const cors = require('cors')
require('dotenv').config();
const landRouter = require('./land')
const userRouter = require('./user')
import app from "../app";



function route(){
    //app.use('/hash', cors(), newsRouter);
    app.use('/land', cors(), landRouter);
    app.use('/user', cors(), userRouter);
}

module.exports = route;