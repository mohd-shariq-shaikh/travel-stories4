import type { NextApiRequest, NextApiResponse } from 'next';

import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const imagesQuery = searchPostsQuery(id ?? "");

    const images = await client.fetch(imagesQuery);

    res.status(200).json(images);
  }
}