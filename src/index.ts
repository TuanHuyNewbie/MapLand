import dotenv from 'dotenv'
dotenv.config()
//import bodyParser from "body-parser"
import app from "./app";
import connectDB from './config/db/index'
import cors from 'cors'
import route from "./routes/route" 
let port1 = process.env["PORT"]
connectDB();
app.use(cors())
route();
app.listen(Number(port1), () => {
  console.log("Example app listening on port");
});
