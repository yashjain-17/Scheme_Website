import { randomBytes } from 'node:crypto';
import supabase from './db-client.js';

function generateTicketCode() {
  return `TKT-${new Date().getFullYear()}-${randomBytes(6).toString('hex').slice(0, 10).toUpperCase()}`;
}

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
    const { name, email, phone, category, tracking_code, description } = body;
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanDescription = typeof description === 'string' ? description.trim() : '';

    if (!cleanName || !cleanDescription) {
      return res.status(400).json({ error: 'Name and issue description are required.' });
    }
    if (cleanName.length > 120 || cleanDescription.length > 5000) {
      return res.status(400).json({ error: 'Support request exceeds the allowed length.' });
    }

    const ticket_code = generateTicketCode();
    const { error } = await supabase.from('feedback').insert({
      name: cleanName,
      email: typeof email === 'string' ? email.trim().slice(0, 254) : '',
      rating: 5,
      message: [
        `Support category: ${typeof category === 'string' ? category.slice(0, 100) : 'General'}`,
        `Phone: ${typeof phone === 'string' ? phone.slice(0, 30) : 'Not provided'}`,
        `Application reference: ${typeof tracking_code === 'string' ? tracking_code.slice(0, 40) : 'Not provided'}`,
        `Description: ${cleanDescription}`,
      ].join('\n'),
      scheme_suggestion: `Support ticket reference: ${ticket_code}`,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;

    return res.status(201).json({
      success: true,
      ticket_code,
      message: 'Your support request has been recorded.',
    });
  } catch (err) {
    console.error('API error in /api/support:', err);
    return res.status(503).json({ error: 'Unable to record the support request. Please try again later.' });
  }
}
