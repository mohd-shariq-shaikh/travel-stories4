import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';

// Extend NextApiRequest to include the 'user' property
export interface CustomNextApiRequest extends NextApiRequest {
  user?: string | JwtPayload; // user will be the decoded JWT payload
}
