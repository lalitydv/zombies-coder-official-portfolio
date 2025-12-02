export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Simple authentication (in production, use proper password hashing and database)
  const validEmail = process.env.DASHBOARD_EMAIL || 'admin@zombiescoder.com';
  const validPassword = process.env.DASHBOARD_PASSWORD || 'admin123';

  if (email === validEmail && password === validPassword) {
    // Simple token (in production, use JWT or proper session management)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    return res.status(200).json({
      success: true,
      token,
      user: { email },
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}

