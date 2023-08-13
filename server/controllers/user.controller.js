import _ from 'lodash';
import validator from 'validator';
import UserModel from '../models/user.model.js';
import { signJwt } from '../middlewares/auth.js';

async function getUsers(req, res) {
  try {
    // get users from database
    const users = await UserModel.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async function getUser(req, res) {
  try {
    const { id } = req.params;
    // get user with the provided id from database
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User with the provided id does not exist' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    let user = UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User with the given email already exists!' });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!'});
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Input valid email address!'});
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: 'Weak game, input a strong password!'});
    }

    user = new UserModel({ username, email, password });

    await user.save();

    const token = signJwt(_.omit(user.toObject(), 'password'));

    return res.status(200).json({ user: _.omit(user.toObject(), 'password'), token });
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // get user with the provided email from the database
    const user = await UserModel.findOne({ email });

    // validate email or password
    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(400).json({ message: 'Invalid Email or Password'});
    }

    // create auth token
    const token = signJwt(_.omit(user.toObject(), 'password'));

    return res.status(200).json({ user: _.omit(user.toObject(), 'passwprd'), token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  login,
  getUser,
  register,
  getUsers,
};