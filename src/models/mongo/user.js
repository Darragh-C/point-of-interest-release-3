import Mongoose from "mongoose";
const { Schema } = Mongoose;

const userSchema = new Schema({
  /*
  _id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  */  
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  /*
  __v: {
    type: Schema.Types.Number,
    ref: "Version",
  },
  */
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = Mongoose.model("User", userSchema);
