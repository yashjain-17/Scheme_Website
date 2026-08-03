import supabase from './db-client.js';

function generateTrackingCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomStr = '';
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SCH-2025-${randomStr}`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      const { code } = req.query || {};

      if (code) {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .ilike('tracking_code', code.trim())
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          return res.status(404).json({ error: 'Application tracking code not found.' });
        }
        return res.status(200).json(data);
      }

      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { scheme_id, scheme_title, applicant_name, email, phone, age, gender, income, state } = req.body;

      if (!applicant_name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required fields.' });
      }

      const tracking_code = generateTrackingCode();

      const newApp = {
        tracking_code,
        scheme_id: scheme_id || 1,
        scheme_title: scheme_title || 'General Public Scheme',
        applicant_name,
        email,
        phone,
        age: age ? parseInt(age, 10) : 25,
        gender: gender || 'All',
        income: income ? parseFloat(income) : 100000,
        state: state || 'All India',
        status: 'Submitted',
        submitted_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('applications')
        .insert(newApp)
        .select()
        .single();

      if (error) throw error;

      // Increment application count on scheme
      if (scheme_id) {
        try {
          const { data: currentScheme } = await supabase.from('schemes').select('total_applications').eq('id', scheme_id).single();
          if (currentScheme) {
            await supabase.from('schemes').update({ total_applications: (currentScheme.total_applications || 0) + 1 }).eq('id', scheme_id);
          }
        } catch (e) {
          console.warn('Could not increment application count:', e);
        }
      }

      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error in /api/applications:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
