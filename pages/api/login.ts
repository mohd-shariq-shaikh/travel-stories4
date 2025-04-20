import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';
import { your_jwt_secret } from '../../utils';
import dotenv from 'dotenv';
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const query = `*[_type == "user" && email == $email][0]`;
    const params = { email };
    const user = await client.fetch(query, params);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: console.error('errror') });
  }
}
