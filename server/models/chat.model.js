import mongoose from 'mongoose';


const ChatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
}, {
  timestamps: true,
});

export const ChatModel = mongoose.model('Chat', ChatSchema);