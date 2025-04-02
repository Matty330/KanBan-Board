// Path: Kandban Board/server/src/routes/auth-routes.ts

import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username);

  try {
    // Find the user
    const user = await User.findOne({ 
      where: { 
        username: username
      } 
    });
    
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      console.log("Invalid password");
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log("Login successful");
    // Create token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: '1h' }
    );

    return res.json({ token, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;