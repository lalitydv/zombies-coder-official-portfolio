import { projects as staticProjects } from '../../data/categories';
import fs from 'fs';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');

function loadAllProjects() {
  // Try to load from JSON file first (dashboard-managed projects)
  if (fs.existsSync(projectsFilePath)) {
    try {
      const jsonProjects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
      if (Array.isArray(jsonProjects) && jsonProjects.length > 0) {
        // Merge with static projects, avoiding duplicates by slug
        const jsonSlugs = new Set(jsonProjects.map(p => p.slug));
        const additionalStatic = staticProjects.filter(p => !jsonSlugs.has(p.slug));
        return [...jsonProjects, ...additionalStatic];
      }
    } catch (error) {
      // If JSON is corrupted, fall back to static projects
    }
  }
  // Fallback to static projects
  return staticProjects;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const allProjects = loadAllProjects();
  return res.status(200).json(allProjects);
}

