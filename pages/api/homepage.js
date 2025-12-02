import fs from 'fs';
import path from 'path';

const homepageFilePath = path.join(process.cwd(), 'data', 'homepage.json');

function loadHomepageData() {
  if (fs.existsSync(homepageFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(homepageFilePath, 'utf8'));
    } catch (error) {
      // Return default data if file is corrupted
      return getDefaultData();
    }
  }
  return getDefaultData();
}

function getDefaultData() {
  // Return default structure if file doesn't exist
  return {
    hero: { enabled: true, title: '', subtitle: '', primaryButton: { text: '', link: '' }, secondaryButton: { text: '', link: '' } },
    stats: { enabled: true, items: [] },
    about: { enabled: true, title: '', subtitle: '', description: '', features: [] },
    services: { enabled: true, title: '', subtitle: '', items: [] },
    features: { enabled: true, title: '', subtitle: '', items: [] },
    testimonials: { enabled: true, title: '', subtitle: '', items: [] },
    process: { enabled: true, title: '', subtitle: '', steps: [] },
    cta: { enabled: true, title: '', subtitle: '', buttonText: '', buttonLink: '' },
    topCategories: { enabled: true, title: '', count: 8 },
    featuredProjects: { enabled: true, title: '', count: 8 },
  };
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = loadHomepageData();
    return res.status(200).json(data);
  }

  // Verify authentication for POST/PUT
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'PUT') {
    try {
      const newData = req.body;
      fs.writeFileSync(homepageFilePath, JSON.stringify(newData, null, 2), 'utf8');
      return res.status(200).json({ success: true, data: newData });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save homepage data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

