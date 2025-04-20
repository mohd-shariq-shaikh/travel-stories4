// import { authenticateToken } from '../../middleware/authMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateToken } from '../middleware/authMiddleware';
import { CustomNextApiRequest } from '../../types/next.auth';

export default function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  // Protect the route by calling the middleware first
  authenticateToken(req, res, () => {
    // Protected logic goes here, available only if the token is valid
    res.status(200).json({ message: 'You have accessed a protected route', user: req.user });
  });
}
