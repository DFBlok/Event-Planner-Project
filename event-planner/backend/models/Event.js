import mongoose from "mongoose";
import { type } from "os";

const guestSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  invited: {type:Boolean, default:false},
});

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  eventPassword: { type: String  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  guest: [guestSchema],
});

export default mongoose.model("Event", eventSchema);
