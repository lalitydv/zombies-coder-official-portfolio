import { categories } from '../../../../../data/categories';
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
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  const categoriesArray = newCategories.map(cat => `  "${cat.replace(/"/g, '\\"')}"`).join(',\n');
  const newContent = fileContent.replace(
    /export const categories = \[[\s\S]*?\];/,
    `export const categories = [\n${categoriesArray}\n];`
  );
  fs.writeFileSync(dataFilePath, newContent, 'utf8');
}

export default function handler(req, res) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const index = parseInt(id);

  if (isNaN(index) || index < 0 || index >= categories.length) {
    return res.status(404).json({ error: 'Category not found' });
  }

  if (req.method === 'PUT') {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const newCategories = [...categories];
    newCategories[index] = name.trim();
    
    try {
      updateCategoriesFile(newCategories);
      return res.status(200).json({ success: true, categories: newCategories });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update category' });
    }
  }

  if (req.method === 'DELETE') {
    const newCategories = categories.filter((_, i) => i !== index);
    
    try {
      updateCategoriesFile(newCategories);
      return res.status(200).json({ success: true, categories: newCategories });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete category' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

