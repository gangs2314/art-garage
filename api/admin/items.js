import { sql } from '@vercel/postgres';
import { requireAuth } from './middleware.js';

async function itemsHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await sql`
      SELECT id, type, title, bio, artist, url, created_at
      FROM portfolio_items
      ORDER BY created_at DESC;
    `;
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch items' });
  }
}

export default requireAuth(itemsHandler);
