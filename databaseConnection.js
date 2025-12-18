const mongoose = require("mongoose")

// const DbConnection = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("MongoDB connected successfully");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1);
//   }
// };

// console.log("MONGO_URL =", process.env.MONGO_URL);


//module.exports = DbConnection;


const DbConnection = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected successfully")
  }
  catch(err){
    console.error("MongoDB connection failed : " , err.message)
    process.exit(1)
  }
};

module.exports = DbConnection;