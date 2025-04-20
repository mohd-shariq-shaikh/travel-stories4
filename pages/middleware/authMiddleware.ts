import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { CustomNextApiRequest } from '../../types/next.auth';

export function authenticateToken(req: CustomNextApiRequest, res: NextApiResponse, next: Function) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded; // Attach decoded token data to the request object
    next(); // Continue to the next handler
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
