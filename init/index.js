const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

const {data:sampleListings} = require("./data.js")



const MONGO_URL = process.env.ATLASDB_URL;



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
