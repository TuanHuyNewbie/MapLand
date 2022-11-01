import bodyParser from "body-parser"
import express from 'express'
//const morgan = require("morgan");
class App{
    public app: express.Application;

    constructor() {
        this.app = express();
        
        this.config();        
    }

    private config(): void{
        // Giúp chúng ta tiếp nhận dữ liệu từ body của request
        this.app.use(bodyParser.json())
        ///this.app.use(bodyParser.urlencoded({ extended: false }));
        //this.app.use(queryParser.urlencoded({ extended: false }));
    }
}


export default new App().app;