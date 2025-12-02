# Portfolio Dashboard

A complete dashboard system to manage your portfolio content including categories and projects.

## Features

✅ **Authentication System**

- Secure login page
- Token-based authentication
- Protected routes

✅ **Dashboard Home**

- Overview statistics
- Quick access to management pages
- View portfolio link

✅ **Categories Management**

- Add new categories
- Edit existing categories
- Delete categories
- Real-time updates

✅ **Projects Management**

- Add new projects with full details
- Edit existing projects
- Delete projects
- Manage features, tech stack, and tags

## Access the Dashboard

1. Navigate to `/dashboard/login`
2. Login with default credentials:
   - **Email**: `admin@zombiescoder.com`
   - **Password**: `admin123`

> **Note**: For production, set environment variables:
>
> - `DASHBOARD_EMAIL` - Your admin email
> - `DASHBOARD_PASSWORD` - Your secure password

## Dashboard Structure

```
pages/
  dashboard/
    login.js          # Login page
    index.js          # Dashboard home
    categories.js     # Categories management
    projects.js       # Projects management

pages/api/dashboard/
  auth/
    login.js          # Login API
    verify.js         # Token verification
  categories/
    index.js          # GET/POST categories
    [id].js           # PUT/DELETE category
  projects/
    index.js          # GET/POST projects
    [id].js           # PUT/DELETE project
```

## Data Storage

- **Categories**: Stored in `data/categories.js` (updated dynamically)
- **Projects**: Stored in `data/projects.json` (created automatically)

The dashboard automatically initializes `projects.json` with existing projects from `categories.js` on first use.

## Usage

### Managing Categories

1. Go to `/dashboard/categories`
2. Click "Add Category" to create a new category
3. Click "Edit" to modify an existing category
4. Click "Delete" to remove a category

### Managing Projects

1. Go to `/dashboard/projects`
2. Click "Add Project" to create a new project
3. Fill in all required fields:
   - Title (e.g., "Zombies Coder – Project Name")
   - Category (select from existing categories)
   - Short Description
   - Long Description
   - Features (comma-separated)
   - Tech Stack (comma-separated)
   - Tags (comma-separated)
4. Click "Edit" to modify an existing project
5. Click "Delete" to remove a project

## Security Notes

- The current authentication is basic (for development)
- For production, consider:
  - Using JWT tokens with expiration
  - Password hashing (bcrypt)
  - Database for user management
  - Rate limiting on API routes
  - HTTPS only

## Environment Variables

Create a `.env.local` file:

```env
DASHBOARD_EMAIL=your-email@example.com
DASHBOARD_PASSWORD=your-secure-password
```

## Troubleshooting

- If projects don't appear: Check that `data/projects.json` exists and is valid JSON
- If categories don't update: Ensure write permissions on `data/categories.js`
- If login fails: Check browser console for errors and verify API routes are working
