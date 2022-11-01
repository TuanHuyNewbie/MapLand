"use strict";
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./config/db");
const cors = require('cors');
const route = require("./routes/route");
const PORT = process.env.PORT;
db.connectDB();
app.use(cors());
app
    .use(bodyParser.json())
    .use(morgan("combined"));
route(app);
app.listen(PORT, cors(), () => {
    console.log("Example app listening on port");
});
