import {Request, Response, NextFunction} from 'express'
//import { Schema, model } from 'mongoose';
const owned = require("../models/owned");
import ethers = require("ethers");
const erc = require("../../../landabi.json");
const infoland = require('../models/infoland')
const users = require('../models/user')



class Land{
    add(req: Request, res: Response, next: NextFunction){
        const lname = req.body.name;
        const ldescription = req.body.description;
        const limage = req.body.image;
        const lx = req.body.x;
        const ly = req.body.y;
        const lworld = req.body.world;
        const lowner = req.body.owner;
    
        const land = new infoland({
          name: lname,
          description: ldescription,
          image: limage,
          x: lx,
          y: ly,
          world: lworld,
        });
        const user1 = new users({
          address: lowner
        }) 

        const lowned = new owned({
          land_id: land._id,
          user_id: user1._id,
        });
        try {
          land.save();
          user1.save();
          lowned.save();
          res.send("Success");
        } catch (e) {
          res.status(400).json({ message: (e as Error).message });
        }
    }
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        //const infoland1 = model('Project',infoland)
        //async getInfo(req:Request, res:Response, next:NextFunction): Promise<void> {
            //const worldId = req.body.world_id;
            const sk =
            "wss://frosty-evocative-mound.bsc-testnet.discover.quiknode.pro/f54fe8b5929be089e24dda43f9d8f7c0ddff920f/";
            const prov = new ethers.providers.WebSocketProvider(sk);
            const contract = new ethers.Contract(erc["address"], erc["abi"], prov);
            //const array = new Array();
            const _x = req.body.x;
            const _y = req.body.y;
          
            let land = await infoland.findOne({x: _x, y: _y}).exec();
            const landid = land.__v.toString();
            const getowner = await contract.functions.ownerOf(landid);
            let s = await {landid: land.__v.toString(),name: land.name, description: land.description,image: land.image,x: land.x,y: land.y,world: land.world,owner: getowner.toString()};
            //await array.push(s)
            //console.log(landid)
            //const findLand = await infoland.findOne({_id: landid}).exec();
            //console.log(findLand.name)

            res.send(s)
            //const findOwned = await owned.findOne({land_id: landid}).exec();
            //console.log(findOwned)
            //let userid = findOwned.user_id
            //console.log(userid)
            //let user = await users.findOne({_id: userid}).exec();
            //res.send(findLand)
            // let data_res = {
            //   owner_address: user.address,
            //   x: _x,
            //   y: _y,
        
            // }
            // //res.render("", data_res);
            // console.log(data_res);
    }


    async update(req: Request, res: Response, next: NextFunction){
        
    }

    async delete(req: Request, res: Response, next: NextFunction){
            let usersArr = await users.find().exec();
            let num = usersArr.length;
            for(let i = 1; i< num; i++){
                users.deleteOne({_id: usersArr[i]._id}).exec();
            }
            //res.send("ss")
    }
    
    async getall(req: Request, res: Response, next: NextFunction){
      let land = await infoland.find({}).exec();
      const sk =
      "wss://frosty-evocative-mound.bsc-testnet.discover.quiknode.pro/f54fe8b5929be089e24dda43f9d8f7c0ddff920f/";
      const prov = new ethers.providers.WebSocketProvider(sk);
      const contract = new ethers.Contract(erc["address"], erc["abi"], prov);
      
      const array = new Array();
      for(let i=0; i < land.length; i++){
        //let getLandId = await contract.functions.encodeLandId(21,land[i].x,land[i].y);
        //let landid = await getLandId[0].toNumber();
        // await infoland.updateOne({
        //   x: land[i].x,
        //   y: land[i].y
        // },{
        //   $set: {__v: landid}
        // })
        //land[i].push(landid);
        let s = {};
        const getowner = await contract.functions.ownerOf(land[i].__v);
        s = await {landid: land[i].__v.toString(),name: land[i].name, description: land[i].description,image: land[i].image,x: land[i].x,y: land[i].y,world: land[i].world,owner: getowner.toString()};
        //land.owner = getowner;
        console.log(s); 
        await array.push(s)
        //sawait Object.assign({}, getowner);
        //await land[i].push(getowner);
        //let get = await getowner.reduce((a,v) => ({...a, [v]:v}), {});
    
      }
      //console.log(array);
      await res.send(array);
    }
    
    




}
module.exports = new Land()