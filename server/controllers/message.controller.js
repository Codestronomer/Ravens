import MessageModel from "../models/message.model.js";

// Create a message
const createMessage = async (req, res) => {
  const { senderId, userId, text } = req.body;

  try {
    if (!senderId || !userId || !text) {
      return res.status(400).json({ message: "Bad input: Provide senderId, userId, and text" });
    }

    const newMessage = new MessageModel({ senderId, userId, text });
    const response = await newMessage.save();

    res.status(201).json(response); // Use 201 for resource creation
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

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createMessage, getMessages };