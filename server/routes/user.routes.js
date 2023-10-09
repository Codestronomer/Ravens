import express from 'express';
import {
  login,
  getUser,
  getUsers,
  register,
} from '../controllers/user.controller.js';

const router = express.Router();

// User routes
router.post('/login', login);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/register', register);
router.post('/verifyUsername/:username')

export default router;