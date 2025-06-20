import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, birthDate, zodiac, height, habits, bio, verified, premium } = req.body;

  const { data, error } = await supabase.from('users').insert([
    { name, birth_date: birthDate, zodiac, height, habits, bio, verified, premium },
  ]);

  if (error) return res.status(500).json({ message: error.message });
  res.status(200).json({ message: 'User registered', data });
}
