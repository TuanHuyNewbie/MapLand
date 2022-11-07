import { Request, Response, NextFunction } from "express";
//import { Schema, model } from 'mongoose';
const owned = require("../models/owned");
//import { Response } from 'express'
const infoland = require("../models/infoland");
const users = require("../models/user");

class Land {
  add(req: Request, res: Response, next: NextFunction) {
    const lname = req.body.name;
    const ldescription = req.body.description;
    const limage = req.body.image;
    const lx = req.body.x;
    const ly = req.body.y;
    const lworld = req.body.world;

    const land = new infoland({
      name: lname,
      description: ldescription,
      image: limage,
      x: lx,
      y: ly,
      world: lworld,
    });

    const lowned = new owned({
      land_id: land._id,
      user_id: "0",
    });

    try {
      lowned.save();
      land.save();
      res.send("Success");
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    //const infoland1 = model('Project',infoland)
    //async getInfo(req:Request, res:Response, next:NextFunction): Promise<void> {
    //const worldId = req.body.world_id;
    const _x = req.query.x;
    const _y = req.query.y;

    let land = await infoland.findOne({ x: _x, y: _y }).exec();
    const landid = land._id.toString();
    console.log(landid);
    const findLand = await infoland.findOne({ _id: landid }).exec();
    //console.log(findLand.name)
    res.send(findLand);
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

  async update(req: Request, res: Response, next: NextFunction) {}

  async delete(req: Request, res: Response, next: NextFunction) {
    let usersArr = await users.find().exec();
    let num = usersArr.length;
    for (let i = 1; i < num; i++) {
      users.deleteOne({ _id: usersArr[i]._id }).exec();
    }
    //res.send("ss")
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    let land = await infoland.find().exec();
    res.send(land);
  }
}
module.exports = new Land();
