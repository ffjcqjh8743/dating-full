import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  const { data, error } = await supabase
    .from('users')
    .update(body)
    .eq('telegram_id', body.telegram_id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ user: data });
}
