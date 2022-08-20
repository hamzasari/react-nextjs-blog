import { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ text: 'Hello' });
};

export default handler;
