const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    username: { 
      type: String, 
      trim: true, 
      minlength: 2, 
      maxlength: 60,  
      required: true 
    },
    rating: { 
      type: Number, 
      min: 1, 
      max: 5, 
      required: true 
    },
    comment: { 
      type: String, 
      trim: true, 
      minlength: 5, 
      maxlength: 1000, 
      required: true 
    },
    designation: {
      type: String, 
      trim: true,
      maxlength: 15,
      required: true 
    }
  },
  {
    timestamps: true // ✅ <-- this must be the SECOND argument
  }
);

module.exports = mongoose.model("Review", reviewSchema);
