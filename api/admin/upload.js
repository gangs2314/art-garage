import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { requireAuth } from './middleware.js';

async function uploadHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, title, bio, artist, type } = req.body;

    if (!file || !title || !artist || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // file is a base64 string from the frontend
    const buffer = Buffer.from(file, 'base64');
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const extension = type === 'video' ? 'mp4' : 'jpg';

    // Upload to Vercel Blob
    const blob = await put(`artgarage/${filename}.${extension}`, buffer, {
      access: 'public',
    });

    // Insert into Postgres
    const result = await sql`
      INSERT INTO portfolio_items (type, title, bio, artist, url, created_at)
      VALUES (${type}, ${title}, ${bio || ''}, ${artist}, ${blob.url}, NOW())
      RETURNING id, type, title, bio, artist, url, created_at;
    `;

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}

export default requireAuth(uploadHandler);
