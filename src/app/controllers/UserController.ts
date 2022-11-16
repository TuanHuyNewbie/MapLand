import {Request, Response, NextFunction} from 'express'
const users = require('../models/user')
const owned = require("../models/owned");

class User{
    add(req: Request, res: Response){
        const laddress = req.body.address
        const user = new users({
            address: laddress
        })
        try{
            user.save()
        } catch(e){
            res.status(400).json({ message: (e as Error).message });
        }
    }
    //get(req: Request, res: Response, next: NextFunction)
}
module.exports = new User()