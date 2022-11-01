require('dotenv').config();
import bodyParser from "body-parser"
import app from "./app";
const db = require("./config/db");
const cors = require('cors')
const route = require("./routes/route");
let port1 = process.env["PORT"]

db.connectDB();


app.use(cors())

//app
  //.use(bodyParser.json())
  //.use(morgan("combined"))



route(app);
app.listen(Number(port1), cors(), () => {
  console.log("Example app listening on port");
});
