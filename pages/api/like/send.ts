import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { from_user, to_user, is_like } = req.body;

  const { error } = await supabase
    .from('likes')
    .insert([{ from_user, to_user, is_like }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true });
}
