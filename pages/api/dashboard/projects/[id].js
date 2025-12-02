import fs from 'fs';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');

function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  return true;
}

function loadProjects() {
  if (fs.existsSync(projectsFilePath)) {
    try {
      const jsonProjects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
      if (Array.isArray(jsonProjects) && jsonProjects.length > 0) {
        return jsonProjects;
      }
    } catch (error) {
      // File corrupted, return empty array
      return [];
    }
  }
  // If file doesn't exist, try to load from static data
  try {
    const { projects } = require('../../../../data/categories');
    if (projects && projects.length > 0) {
      saveProjects(projects); // Initialize JSON file
      return projects;
    }
  } catch (error) {
    // Fallback to empty array
  }
  return [];
}

function saveProjects(projects) {
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8');
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function handler(req, res) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const projects = loadProjects();
  const projectIndex = projects.findIndex(p => p.id === id);

  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  if (req.method === 'PUT') {
    const projectData = req.body;
    const updatedProject = {
      ...projects[projectIndex],
      ...projectData,
      slug: slugify(projectData.title || projects[projectIndex].title),
    };

    const newProjects = [...projects];
    newProjects[projectIndex] = updatedProject;
    
    try {
      saveProjects(newProjects);
      return res.status(200).json({ success: true, project: updatedProject });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update project' });
    }
  }

  if (req.method === 'DELETE') {
    const newProjects = projects.filter(p => p.id !== id);
    
    try {
      saveProjects(newProjects);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete project' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

