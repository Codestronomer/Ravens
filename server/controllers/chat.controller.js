import { ChatModel } from '../models/chat.model.js';

// createChat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await ChatModel.findOne({
      members: {$all: [firstId, secondId]}
    })

    if (chat) return res.status(200).json(chat);

    const newChat = new ChatModel({
      members: [firstId, secondId]
    })

    const response = await newChat.save();
    
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}

// getUserChats
const getUserChats = async (req, res) => {
  const userId = req.params.userId

  try {
    const chats = await ChatModel.find({
      members: {$in: [userId]}
    }).populate('members');

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}

// findChat
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await ChatModel.findOne({
      members: {$all: [firstId, secondId]}
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}

export {
  findChat,
  createChat,
  getUserChats,
};
