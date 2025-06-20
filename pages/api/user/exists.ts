import { supabase } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validateTelegramInitData } from '@/lib/validateTelegram';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { initData } = req.body;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;

  if (!validateTelegramInitData(initData, BOT_TOKEN)) {
    return res.status(403).json({ message: 'Invalid Telegram auth' });
  }

  const params = new URLSearchParams(initData);
  const user = JSON.parse(params.get('user') || '{}');
  const { data, error } = await supabase.from('users').select('id').eq('id', user.id).single();

  if (error && error.code !== 'PGRST116') {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json({ exists: !!data });
}
