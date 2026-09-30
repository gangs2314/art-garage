import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { requireAuth } from './middleware.js';

function compressBase64(base64String, quality = 0.8) {
  // For production, consider using a library like sharp for server-side compression
  // This is a placeholder that validates the base64
  if (base64String.length > 10 * 1024 * 1024) {
    throw new Error('File too large (max 10MB)');
  }
  return base64String;
}

async function uploadHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, title, bio, artist, type } = req.body;

    if (!file || !title || !artist || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (type !== 'photo' && type !== 'video') {
      return res.status(400).json({ error: 'Invalid type. Must be "photo" or "video"' });
    }

    // Validate title length
    if (title.length < 3 || title.length > 100) {
      return res.status(400).json({ error: 'Title must be between 3 and 100 characters' });
    }

    // Compress/validate file
    const compressedFile = compressBase64(file);
    const buffer = Buffer.from(compressedFile, 'base64');

    // Validate buffer size
    const maxSize = type === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for video, 10MB for photo
    if (buffer.length > maxSize) {
      return res.status(400).json({ error: `File too large. Max ${maxSize / 1024 / 1024}MB` });
    }

    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const extension = type === 'video' ? 'mp4' : 'jpg';

    // Upload to Vercel Blob with metadata
    const blob = await put(`artgarage/${type}s/${filename}.${extension}`, buffer, {
      access: 'public',
      addRandomSuffix: false,
      contentType: type === 'video' ? 'video/mp4' : 'image/jpeg',
    });

    // Insert into Postgres with validation
    const result = await sql`
      INSERT INTO portfolio_items (type, title, bio, artist, url, created_at)
      VALUES (${type}, ${title}, ${bio || ''}, ${artist}, ${blob.url}, NOW())
      RETURNING id, type, title, bio, artist, url, created_at;
    `;

    return res.status(201).json({
      success: true,
      item: result.rows[0],
      message: `${type === 'photo' ? 'Photo' : 'Video'} uploaded successfully`
    });
  } catch (error) {
    console.error('Upload error:', error);

    // Specific error messages
    if (error.message.includes('File too large')) {
      return res.status(413).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Upload failed. Please try again.' });
  }
}

export default requireAuth(uploadHandler);

