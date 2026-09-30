import crypto from 'crypto';
import bcryptjs from 'bcryptjs';

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-change-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$YixZPyDQvB0FVAlruI4KfO7z.psI4rWGiky6.1l66elprpa0xeUm'; // bcrypt hash of 'password'

function signCookie(value) {
  const hmac = crypto.createHmac('sha256', SESSION_SECRET);
  hmac.update(value);
  return `${value}.${hmac.digest('hex')}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Verify username and password against stored hash
    const isValidUsername = username === ADMIN_USERNAME;
    const isValidPassword = await bcryptjs.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValidUsername || !isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create secure session
    const sessionValue = crypto.randomBytes(32).toString('hex');
    const signedSession = signCookie(sessionValue);

    res.setHeader(
      'Set-Cookie',
      `session=${signedSession}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`
    );

    return res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}

