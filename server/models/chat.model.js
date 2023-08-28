import mongoose from 'mongoose';


const ChatSchema = new mongoose.Schema({
  members: Array,
}, {
  timestamps: true,
});

export const ChatModel = mongoose.model('Chat', ChatSchema);