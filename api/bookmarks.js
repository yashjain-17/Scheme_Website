import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      const { user_identifier } = req.query || {};
      const identifier = user_identifier || 'guest-session';

      const { data, error } = await supabase
        .from('bookmarks')
        .select('*, schemes(*)')
        .eq('user_identifier', identifier);

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { scheme_id, user_identifier } = req.body;
      const identifier = user_identifier || 'guest-session';

      // Check if exists
      const { data: existing } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('scheme_id', scheme_id)
        .eq('user_identifier', identifier)
        .maybeSingle();

      if (existing) {
        // Delete it
        await supabase.from('bookmarks').delete().eq('id', existing.id);
        return res.status(200).json({ saved: false, message: 'Removed from saved schemes' });
      } else {
        // Insert it
        const { data, error } = await supabase
          .from('bookmarks')
          .insert({ scheme_id, user_identifier: identifier, created_at: new Date().toISOString() })
          .select()
          .single();

        if (error) throw error;
        return res.status(201).json({ saved: true, data, message: 'Added to saved schemes' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error in /api/bookmarks:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
