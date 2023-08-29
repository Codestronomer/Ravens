import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: String,
}, { timestamps: true });

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
