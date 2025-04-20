import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const { userName, email, password, profilePic } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload the profile picture to Sanity
    const uploadedImage = await client.assets.upload('image', profilePic);

    const newUser = {
      _type: 'user',
      userName,
      email,
      password: hashedPassword,
      image: {
        _type: 'image',
        asset: { _ref: uploadedImage._id }
      }
    };

    await client.create(newUser);
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: console.error('Error')
     });
  }
}
