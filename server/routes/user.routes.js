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
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/regiser', register);

export default router;