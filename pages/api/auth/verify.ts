import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;

function checkTelegramAuth(query: any): boolean {
  const { hash, ...data } = query;
  const checkString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join('\n');

  const secret = require('crypto')
    .createHash('sha256')
    .update(TELEGRAM_BOT_TOKEN)
    .digest();

  const hmac = require('crypto')
    .createHmac('sha256', secret)
    .update(checkString)
    .digest('hex');

  return hmac === hash;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!checkTelegramAuth(req.query)) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }

  const token = jwt.sign({ id: req.query.id, username: req.query.username }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });

  return res.status(200).json({ ok: true, token });
}
