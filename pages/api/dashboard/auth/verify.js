export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  
  // Simple token verification (in production, use proper JWT verification)
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email] = decoded.split(':');
    
    if (email) {
      return res.status(200).json({ success: true, user: { email } });
    }
  } catch (error) {
    // Invalid token
  }

  return res.status(401).json({ error: 'Invalid token' });
}

