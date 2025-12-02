import { projects } from '../../../../data/categories';
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

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function generateProjectId(projects) {
  const maxId = projects.reduce((max, p) => {
    const idParts = p.id.split('-');
    const num = parseInt(idParts[0]) * 100 + parseInt(idParts[1] || 0);
    return Math.max(max, num);
  }, 0);
  return `${Math.floor(maxId / 100) + 1}-1`;
}

function updateProjectsFile(newProjects) {
  // This is a simplified approach - in production, use a proper database
  // For now, we'll need to regenerate the entire file structure
  // This is complex, so we'll store projects in a separate JSON file for easier management
  const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');
  fs.writeFileSync(projectsFilePath, JSON.stringify(newProjects, null, 2), 'utf8');
}

function loadProjects() {
  const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');
  if (fs.existsSync(projectsFilePath)) {
    try {
      const jsonProjects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
      // If JSON file is empty or invalid, initialize with static projects
      if (Array.isArray(jsonProjects) && jsonProjects.length > 0) {
        return jsonProjects;
      }
    } catch (error) {
      // If JSON file is corrupted, use static projects
    }
  }
  // Initialize JSON file with static projects if it doesn't exist or is empty
  try {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8');
  } catch (error) {
    // If we can't write, just return static projects
  }
  return projects;
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const allProjects = loadProjects();
    return res.status(200).json(allProjects);
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const projectData = req.body;
    const allProjects = loadProjects();
    
    if (!projectData.title || !projectData.category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }

    const slug = slugify(projectData.title);
    const newProject = {
      id: generateProjectId(allProjects),
      title: projectData.title,
      slug,
      category: projectData.category,
      categoryIndex: 0, // You may want to calculate this based on category
      shortDescription: projectData.shortDescription || '',
      longDescription: projectData.longDescription || '',
      features: projectData.features || [],
      techStack: projectData.techStack || [],
      tags: projectData.tags || [],
      thumbnail: `/images/${slug}.png`,
      createdAt: new Date().toISOString(),
    };

    const newProjects = [...allProjects, newProject];
    
    try {
      updateProjectsFile(newProjects);
      return res.status(201).json({ success: true, project: newProject });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save project' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

