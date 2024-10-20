const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected');
    }
    catch(err){
        console.log("Error connecting to database");
        console.log(err);
    }
}
connection()

module.exports = connection;