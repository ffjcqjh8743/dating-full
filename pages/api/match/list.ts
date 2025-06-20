import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;

  const { data: likesFromMe } = await supabase
    .from('likes')
    .select('to_user')
    .eq('from_user', user_id)
    .eq('is_like', true);

  const likedIds = likesFromMe?.map(l => l.to_user) || [];

  const { data: mutual } = await supabase
    .from('likes')
    .select('from_user')
    .in('from_user', likedIds)
    .eq('to_user', user_id)
    .eq('is_like', true);

  const mutualIds = mutual?.map(l => l.from_user);

  const { data: users } = await supabase
    .from('users')
    .select('*')
    .in('telegram_id', mutualIds || []);

  res.status(200).json({ matches: users });
}
