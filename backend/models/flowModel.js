import mongoose from "mongoose";

const flowSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const FlowResult = mongoose.model('FlowResult', flowSchema);