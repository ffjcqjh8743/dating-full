import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { validateTelegramInitData } from '../../../lib/validateTelegram';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { initData } = req.body;

  if (!validateTelegramInitData(initData, BOT_TOKEN)) {
    return res.status(403).json({ error: 'Invalid Telegram auth' });
  }

  const params = new URLSearchParams(initData);
  const user = JSON.parse(params.get('user') || '{}');

  const token = jwt.sign({ id: user.id, name: user.first_name, username: user.username }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`);
  res.status(200).json({ success: true });
}
// touched

