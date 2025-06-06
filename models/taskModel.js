const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true,trim: true },
  description:{
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task