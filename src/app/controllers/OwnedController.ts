import {Request, Response, NextFunction } from "express"
const infoland = require("../models/infoland");
const users = require("../models/user");
const erc = require("../../../landabi.json");
import ethers = require("ethers");
const untils = require("../../config/db/untils");
import fs = require('fs');
const owned = require("../models/owned");
const { json } = require("express");

class Owned {
  async getInfo(req:Request, res:Response, next:NextFunction): Promise<void> {
    const worldId = req.body.world_id;
    const _x = req.body.x;
    const _y = req.body.y;
  
    let land = await infoland.findOne({x: _x, y: _y, world: worldId}).exec();
    let landid = land._id;

    let findOwned = await owned.findOne({land_id: landid}).exec();
    let userid = findOwned?.user_id
    console.log(userid)
    let user = await users.findOne({_id: userid}).exec();
    let data_res = {
      owner_address: user.address,
      x: _x,
      y: _y,

    }
    //res.render("", data_res);
    console.log(data_res);
    
}

  async updateAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sk =
      "wss://frosty-evocative-mound.bsc-testnet.discover.quiknode.pro/f54fe8b5929be089e24dda43f9d8f7c0ddff920f/";
    const prov = new ethers.providers.WebSocketProvider(sk);
    const contract = new ethers.Contract(erc["address"], erc["abi"], prov);
    
    const allLand = await infoland.find().exec();
    for (let i = 0; i < allLand.length; i++){
      let land = allLand[i];
      const x = land["x"];
      const y = land["y"];
    
      const getLandId = await contract.functions.encodeLandId(21, x, y);
      let landid = getLandId[0].toNumber();
      const getowner = await contract.functions.ownerOf(landid);
      console.log(getowner);

      let user = await users.findOne({address: getowner[0]}).exec();
      
      const owning = new owned({
          user_id: user._id,
          land_id: land["_id"]
      })
      owning.save();
    }
    
  }

  
}

module.exports = new Owned();
