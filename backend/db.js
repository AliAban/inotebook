const mongoose = require("mongoose");
const config = require("./config");
const mongoURI = config.db.development;

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
            console.log("connected to Mongo successfully !");
    })
}

module.exports = connectToMongo;