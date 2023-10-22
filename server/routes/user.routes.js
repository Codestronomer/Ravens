import express from 'express';
import {
  login,
  getUser,
  getUsers,
  register,
  updateAvatar,
  verifyUsername,
} from '../controllers/user.controller.js';

const router = express.Router();

// User routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/login', login);
router.post('/register', register);
router.put('/:id/avatar', updateAvatar);
router.get('/verify-username/:username', verifyUsername);

export default router;