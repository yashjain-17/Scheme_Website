import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const { name, email, rating, message, scheme_suggestion } = body;
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    const cleanSuggestion = typeof scheme_suggestion === 'string' ? scheme_suggestion.trim() : '';

    if (!cleanMessage && !cleanSuggestion) {
      return res.status(400).json({ error: 'Message or scheme suggestion is required.' });
    }
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (cleanEmail && (cleanEmail.length > 254 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(cleanEmail))) {
      return res.status(400).json({ error: 'Enter a valid email address.' });
    }

    if (cleanMessage.length > 5000 || cleanSuggestion.length > 2000) {
      return res.status(400).json({ error: 'Feedback exceeds the allowed length.' });
    }

    const parsedRating = rating === undefined || rating === null || rating === '' ? null : Number(rating);
    if (parsedRating !== null && (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5)) {
      return res.status(400).json({ error: 'Rating must be a whole number from 1 to 5.' });
    }

    const newFeedback = {
      name: typeof name === 'string' && name.trim() ? name.trim().slice(0, 120) : 'Anonymous User',
      email: cleanEmail,
      rating: parsedRating,
      message: cleanMessage,
      scheme_suggestion: cleanSuggestion,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('feedback').insert(newFeedback);
    if (error) throw error;
    return res.status(201).json({ success: true, message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error('API Error in /api/feedback:', err);
    return res.status(500).json({ error: 'Unable to save feedback right now.' });
  }
}
