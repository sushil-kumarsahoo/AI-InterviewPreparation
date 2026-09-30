const mongoose = require("mongoose");

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
    console.log("Conected to Databse")
    } 
    catch(err){
        console.log(err)
    }
}

module.exports = connectToDB