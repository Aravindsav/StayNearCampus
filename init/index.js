const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

const {data:sampleListings} = require("./data.js")



const MONGO_URL = "mongodb+srv://Aravind:chinna2004@cluster0.oao2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



main().then(()=>{
    console.log("connection of DB is succesful");
}).catch((err)=>{
    console.log("error");
});
async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB = async ()=>{
  await Listing.deleteMany({});
await Listing.insertMany(sampleListings)
console.log("Sample listings inserted successfully");
}

initDB();