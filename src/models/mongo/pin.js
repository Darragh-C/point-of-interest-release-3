import Mongoose from "mongoose";
const { Schema } = Mongoose;

const pinSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },  
  name: String,
  description: String,
  county: String,
  lattitude: String,
  longitude: String,
  category: String,
  img: String,
});

export const Pin = Mongoose.model("Pin", pinSchema);
