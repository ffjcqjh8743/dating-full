import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user1, user2 } = req.query;

  const { data } = await supabase
    .from('likes')
    .select('*')
    .or(`from.eq.${user1},from.eq.${user2}`)
    .or(`to.eq.${user1},to.eq.${user2}`);

  const likedEachOther = data?.filter(l => l.from === user1 && l.to === user2).length &&
                         data?.filter(l => l.from === user2 && l.to === user1).length;

  res.status(200).json({ matched: Boolean(likedEachOther) });
}
