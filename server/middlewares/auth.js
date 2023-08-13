import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_KEY || 'secrect_key';

export const signJwt = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: '2d' });
  } catch (error) {
    console.log(error.message);
  }
}

export const auth = (req, res, next) => {
  try {
    let token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '') : undefined;
    
    if (!token) {
      token = req.cookies['Authorization']
        ? req.cookies['Authorization'].replace('Bearer ', '') : undefined;

      if (!token) {
        throw new Error('Missing Authorization token');
      }
    }

    const decoded = jwt.verify(token, secret);
    req.body.id = decoded._id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized to perform request!'});
  }
}