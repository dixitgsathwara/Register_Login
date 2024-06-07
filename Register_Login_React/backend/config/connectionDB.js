const mongoose =require("mongoose");
const connectDb= async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database connected.. \nHost:${connect.connection.host}\nDB:${connect.connection.name}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectDb;
