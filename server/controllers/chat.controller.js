import { ChatModel } from '../models/chat.model.js';
import pkg from 'lodash';
const { omit } = pkg;

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

    const sanitizedChat = chats.map((chat) => {
      const sanitizedMembers = chat.toObject().members.map((member) => {
        return omit(member, ['password', '__v']);
      });

      return {
        ...chat.toObject(), // Keep other properties of the chat object
        members: sanitizedMembers, // Replace the members array with the sanitized version
      };
    });

    res.status(200).json(sanitizedChat);
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
