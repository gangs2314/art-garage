import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { artist } = req.query;

    let query;
    if (artist) {
      // Normalize artist names (Sude/Sudee and Sagar)
      const normalizedArtist = artist.toLowerCase() === 'sudee' ? 'sude' : artist.toLowerCase();
      query = sql`
        SELECT id, type, title, bio, artist, url, created_at
        FROM portfolio_items
        WHERE LOWER(artist) = ${normalizedArtist}
        ORDER BY created_at DESC;
      `;
    } else {
      query = sql`
        SELECT id, type, title, bio, artist, url, created_at
        FROM portfolio_items
        ORDER BY created_at DESC;
      `;
    }

    const result = await query;
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}
