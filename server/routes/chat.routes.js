import Express from 'express';
import { createChat, getUserChats, findChat } from '../controllers/chat.controller.js';

const router = Express.Router();

router.post('/', createChat)
router.get('/:userId', getUserChats);
router.get('/find/:firstId/:secondId', findChat);

export default router;