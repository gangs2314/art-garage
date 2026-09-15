import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-change-in-production';

function verifyCookie(signedValue) {
  const [value, signature] = signedValue.split('.');
  if (!value || !signature) return false;

  const hmac = crypto.createHmac('sha256', SESSION_SECRET);
  hmac.update(value);
  const expectedSignature = hmac.digest('hex');

  return signature === expectedSignature;
}

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
}

export function requireAuth(handler) {
  return (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    const session = cookies.session;

    if (!session || !verifyCookie(session)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return handler(req, res);
  };
}

