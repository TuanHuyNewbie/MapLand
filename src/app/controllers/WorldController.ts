import { Request, Response, NextFunction } from "express";
const worlds =require('../models/world');
//const lands = require('../models/infoland');

class World{
    async get_all(req: Request, res: Response, next: NextFunction): Promise<void>{
        const allWorld = await  worlds.find().exec();
        //console.log(allWorld);
        res.send(allWorld)
    }

    create(req: Request, res: Response, next: NextFunction): void{
        const _name: String = req.body.name;
        if( _name == null){
            console.log("body is empty");
        }
        else{
            const world = new worlds({
                name: _name,
            });
            world.save();
        }

    }

    async delete_from_objId(req: Request, res: Response, next: NextFunction): Promise<void>{
        const _ObjId = req.body._id;
        if(_ObjId == null){
            console.log("body is empty");
        }
        else{
            await worlds.findOneAndRemove({_id: _ObjId}).exec();
        }
    }

    async update_by_id(req: Request, res: Request, next: NextFunction): Promise<void>{
        
        if(req.body == null){
            console.log("body is empty");
        }
        else{
            const _ObjId = req.body._id;
            const _name = req.body.name;
            await worlds.findOneAndUpdate({_id: _ObjId}, { $set: { name: _name }}).exec();
        }
    }    


}
module.exports = new World();