const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review =require("./review.js");
const { listingSchema } = require("../schema");
const { required } = require("joi");
const listingschema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: {
      url: String,
      filename: String
    },
    price :{type: Number,required:true,min:0},
    location: String,
    country: String,
    amenities: {
      type: [String],
      default: []
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    owner: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
      ,
      

    }
  });
  listingschema.index({geometry:"2dsphere"});
  
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in : listing.reviews}});
}

});

const  Listing  = mongoose.model("Listing", listingschema);
module.exports = Listing;



