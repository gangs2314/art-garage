import { del } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { requireAuth } from './middleware.js';

async function deleteHandler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    // Get the item to retrieve the URL
    const item = await sql`SELECT url FROM portfolio_items WHERE id = ${id};`;
    if (item.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const { url } = item.rows[0];

    // Delete from Blob
    await del(url);

    // Delete from Postgres
    await sql`DELETE FROM portfolio_items WHERE id = ${id};`;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Delete failed' });
  }
}

export default requireAuth(deleteHandler);
