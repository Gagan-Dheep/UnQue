const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../db/connection');

const register = async (req, res) => {
  console.log(req.body);
  
  const { username, email, password, role } = req.body;
  const db = getDB();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword, role };

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) return res.status(400).send({ message: 'User already exists' });

    await db.collection('users').insertOne(user);
    res.status(201).send({ message: 'User registered successfully', data: user });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
};

const login = async (req, res) => {
  
  const { email, password } = req.body;
  const db = getDB();

  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(401).send({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).send({ token: token, user: user });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { register, login };
