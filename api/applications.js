import { randomBytes } from 'node:crypto';
import supabase from './db-client.js';

function generateTrackingCode() {
  return `SCH-${new Date().getFullYear()}-${randomBytes(6).toString('hex').slice(0, 10).toUpperCase()}`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const rawCode = typeof req.query?.code === 'string' ? req.query.code.trim() : '';
      if (!rawCode || rawCode.length > 40) {
        return res.status(400).json({ error: 'Provide a valid application tracking code.' });
      }

      const { data, error } = await supabase
        .from('applications')
        .select('tracking_code, scheme_title, status, submitted_at, state')
        .eq('tracking_code', rawCode.toUpperCase())
        .maybeSingle();

      if (error) throw error;
      if (!data) return res.status(404).json({ error: 'Application tracking code not found.' });
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = req.body && typeof req.body === 'object' ? req.body : {};
      const { scheme_id, scheme_title, applicant_name, email, phone, age, gender, income, state } = body;

      if (
        typeof applicant_name !== 'string' || !applicant_name.trim() ||
        typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        typeof phone !== 'string' || !/^[+\d][\d\s()-]{7,19}$/.test(phone)
      ) {
        return res.status(400).json({ error: 'Enter a valid name, email address, and phone number.' });
      }

      const parsedAge = age === undefined || age === null || age === '' ? null : Number(age);
      const parsedIncome = income === undefined || income === null || income === '' ? null : Number(income);
      if (parsedAge !== null && (!Number.isInteger(parsedAge) || parsedAge < 0 || parsedAge > 120)) {
        return res.status(400).json({ error: 'Age must be a valid number between 0 and 120.' });
      }
      if (parsedIncome !== null && (!Number.isFinite(parsedIncome) || parsedIncome < 0)) {
        return res.status(400).json({ error: 'Income must be a non-negative number.' });
      }

      const tracking_code = generateTrackingCode();
      const newApp = {
        tracking_code,
        scheme_id: scheme_id || 1,
        scheme_title: typeof scheme_title === 'string' && scheme_title.trim() ? scheme_title.trim() : 'General Public Scheme',
        applicant_name: applicant_name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        age: parsedAge ?? 25,
        gender: typeof gender === 'string' && gender.trim() ? gender.trim() : 'All',
        income: parsedIncome ?? 100000,
        state: typeof state === 'string' && state.trim() ? state.trim() : 'All India',
        status: 'Submitted',
        submitted_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('applications')
        .insert(newApp)
        .select('tracking_code, scheme_title, status, submitted_at')
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error in /api/applications:', err);
    return res.status(500).json({ error: 'Unable to process the application request.' });
  }
}
