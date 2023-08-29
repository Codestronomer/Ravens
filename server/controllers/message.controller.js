import MessageModel from '../models/message.model.js';

const createMessage = async (req, res) => {
  const { senderId, userId, text } = req.body;

  try {
    const newMessage = new MessageModel({ senderId, userId, text })
    const response = await newMessage.save();

    res.status(200).json(response);
  } catch(error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}


const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageModel.find({ chatId });

    res.status(200).json(message);
  } catch(error) {
    console.log(error);
    res.status(200).json({ message: error.message });
  }
}

export { createMessage, getMessages };