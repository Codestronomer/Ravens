import { ChatModel } from "../models/chat.model.js";
import MessageModel from "../models/message.model.js";

// Create a message
const createMessage = async (req, res) => {
  const { senderId, text, chatId} = req.body;

  try {
    if (!senderId || !text || !chatId) {
      return res.status(400).json({ message: "Bad input: Provide senderId, chatId and text" });
    }

    const newMessage = new MessageModel({ senderId, chatId, text });
    const response = await newMessage.save();

    res.status(201).json({ ...response.toObject(), id: response._id }); // Use 201 for resource creation

    // update chat last updated Time
    await ChatModel.findByIdAndUpdate(chatId, { updatedAt: Date.now()});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get messages for a chat
const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    if (!chatId) {
      return res.status(400).json({ message: "Bad input: Provide a valid chatId" });
    }

    const messages = await MessageModel.find({ chatId });
    const response = messages.map((message) => {
      return { ...message.toObject(), id: message._id }
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createMessage, getMessages };