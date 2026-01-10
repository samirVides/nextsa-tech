import jwt from 'jsonwebtoken';


const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ¡OBLIGATORIO en Render! (HTTPS)
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
  });
};

export default generateToken;