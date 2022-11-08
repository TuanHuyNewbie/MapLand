import mongoose from "mongoose"
const Schema = mongoose.Schema

const infoland = new Schema({
    _id: {type: Number},
    name: {type: String},
    description: {type: String},
    image: {type: String},
    x: {type: String},
    y: {type: String},
    world: {type: String}
}, {
    query: {
        byXY(x: String, y: String){
            return this.find({x,y}) 
        }
    }


})


module.exports = mongoose.model('infoland', infoland)