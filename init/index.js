const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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
initData.data = initData.data.map((obj)=>({ ...obj,owner:"671dd8787b9dd019dad0bd57"}))
await Listing.insertMany(initData.data);
console.log("data was initialised");
}

initDB();