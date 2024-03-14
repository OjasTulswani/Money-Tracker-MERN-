const mongoose = require('mongoose')
const colors = require('colors')
const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white)

    } catch(err){
       console.log(`${err}`.bgRed) 
    }
}

module.exports = connectDb