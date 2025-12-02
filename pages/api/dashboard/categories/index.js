import { categories } from '../../../../data/categories';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'categories.js');

function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  return true;
}

function updateCategoriesFile(newCategories) {
  // Read the current file
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  
  // Extract the categories array and update it
  const categoriesArray = newCategories.map(cat => `  "${cat.replace(/"/g, '\\"')}"`).join(',\n');
  
  // Simple replacement (this is a basic implementation)
  const newContent = fileContent.replace(
    /export const categories = \[[\s\S]*?\];/,
    `export const categories = [\n${categoriesArray}\n];`
  );
  
  fs.writeFileSync(dataFilePath, newContent, 'utf8');
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(categories);
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const newCategories = [...categories, name.trim()];
    
    try {
      updateCategoriesFile(newCategories);
      return res.status(201).json({ success: true, categories: newCategories });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save category' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

