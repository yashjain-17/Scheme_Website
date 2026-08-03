import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { name, email, rating, message, scheme_suggestion } = req.body;

      if (!message && !scheme_suggestion) {
        return res.status(400).json({ error: 'Message or suggestion is required.' });
      }

      const newFeedback = {
        name: name || 'Anonymous User',
        email: email || '',
        rating: rating ? parseInt(rating, 10) : 5,
        message: message || '',
        scheme_suggestion: scheme_suggestion || '',
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('feedback')
        .insert(newFeedback)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error in /api/feedback:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
