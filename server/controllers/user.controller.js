import _ from 'lodash';
import validator from 'validator';
import UserModel from '../models/user.model.js';
import { signJwt } from '../middlewares/auth.js';

async function getUsers(req, res) {
  try {
    // get users from database
    const users = await UserModel.find();

    const updatedUsers = users.map((user) => {
      return { username: user.username, id: user._id, image: user?.image }; // Add 'id' property
    });

    return res.status(200).json(updatedUsers);
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

    return res.status(200).json({ username: user.username, id: user._id, image: user?.image });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async function verifyUsername(req, res) {
  const { username } = req.params;

  try {
    // Check if the username exists in the database
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      // Username already exists
      return res.json({ exists: true });
    } else {
      // Username doesn't exist
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function register(req, res) {
  try {
    const { username, password } = req.body;

    const cleanUser = sanitizeUser(username, password);

    let user = await UserModel.findOne({ username: cleanUser.username });

    if (user) {
      return res.status(400).json({ message: 'User with the given username already exists!' });
    }

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required!'});
    }

    // if (!validator.isEmail(email)) {
    //   return res.status(400).json({ message: 'Input valid email address!'});
    // }

    if (password.length < 5) {
      return res.status(400).json({ message: 'Weak password, input a strong password!'});
    }

    user = new UserModel({ username: cleanUser.username, password: cleanUser.password });

    await user.save();

    const token = signJwt(_.omit(user.toObject(), 'password'));

    return res.status(200).json({ username: user.username, id: user._id, token, image: user?.image });
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const cleanUser = sanitizeUser(username, password);

    // get user with the provided email from the database
    const user = await UserModel.findOne({ username: cleanUser.username });

    // validate username or password
    if (!user || !(await user.comparePasswords(cleanUser.password, user.password))) {
      return res.status(400).json({ message: 'Invalid Email or Password'});
    }

    // create auth token
    const token = signJwt(_.omit(user.toObject(), 'password'));

    return res.status(200).json({ username: user.username, id: user._id, token, image: user?.image });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

async function updateAvatar(req, res) {
  try {
    const avatar = req.body.key;
    const userId = req.params.id;

    let user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User with the provided ID does not exists'});
    }

    user.image = avatar;

    user = await user.save();

    return res.status(200).json({ message: 'User update successful', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message })
  }
}
const sanitizeUser = (username, password) => {
  username = username.toLowerCase();
  password = username.toLowerCase()

  return { username, password };
};

export {
  login,
  getUser,
  register,
  getUsers,
  updateAvatar,
  verifyUsername,
};