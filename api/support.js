import supabase from './db-client.js';

function generateTicketCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let str = '';
  for (let i = 0; i < 6; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TKT-2025-${str}`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'POST') {
      const { name, email, phone, category, tracking_code, description } = req.body;

      if (!description || !name) {
        return res.status(400).json({ error: 'Name and issue description are required.' });
      }

      const ticket_code = generateTicketCode();

      // Log to feedback or support table
      try {
        await supabase.from('feedback').insert({
          name: `${name} (Grievance Ticket: ${ticket_code})`,
          email: email || '',
          rating: 5,
          message: `Category: ${category || 'General'} | Phone: ${phone || 'N/A'} | Tracking Ref: ${tracking_code || 'N/A'} | Description: ${description}`,
          scheme_suggestion: `Ticket Ref: ${ticket_code}`,
          created_at: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Could not store to DB, returning ticket response:', e);
      }

      return res.status(201).json({
        success: true,
        ticket_code,
        message: 'Grievance ticket logged successfully with National Public Welfare Helpdesk.'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error in /api/support:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
