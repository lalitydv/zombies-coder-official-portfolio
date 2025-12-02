export const categories = [
  "Website Development",
  "Mobile App Development",
  "SaaS Product Development",
  "CRM System Development",
  "ERP System Development",
  "E-commerce Store Development",
  "Doctor & Healthcare Platforms",
  "Dashboard & Admin Panels",
  "Custom Business Tools",
  "Real Estate Solutions",
  "Education & LMS",
  "Travel & Booking Systems",
  "Social Media Platforms",
  "AI Tools & Automation",
  "FinTech Apps",
  "Food Delivery Platforms",
  "Job Portals",
  "Logistics & Courier System",
  "Streaming & Entertainment Apps",
  "Marketplace Solutions",
  "Hotel & Hospitality Systems",
  "Subscription & Membership Platforms",
  "Inventory Management Systems",
  "Billing & Invoicing Systems",
  "HRMS & Attendance Systems",
  "Event Booking Platforms",
  "OTT & Media Platforms",
  "Fitness & Gym Platforms",
  "Salon & Beauty Booking",
  "Vehicle Rental Platforms",
  "Donation & Fundraising Platforms",
  "Construction & Contractor Software",
  "E-learning Test Platforms",
  "Forex & Trading Dashboards",
  "Crypto & Blockchain Apps",
  "Productivity Tools",
  "Chat Applications",
  "Dating Platforms",
  "Real-Time Tracking Apps",
  "Ticket Support Systems",
  "Manufacturing Software",
  "School Management Systems",
  "Exam Result Systems",
  "Vendor Management Systems",
  "Franchise Management Software",
  "Personal Branding Websites",
  "AI Image/Video Tools",
  "API Development & Integrations",
  "Automation Bots",
  "Cloud-based Multi-User Platforms"
];

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Product names for each category
const productNames = {
  "Website Development": [
    "Corporate Business Website",
    "Portfolio Website",
    "Restaurant Website",
    "NGO Website",
    "Product Landing Page"
  ],
  "Mobile App Development": [
    "Service Booking App",
    "Fitness App",
    "E-commerce App",
    "Social Feed App",
    "Travel Booking App"
  ],
  "SaaS Product Development": [
    "Task Management SaaS",
    "Invoice Generator SaaS",
    "Social Media Scheduler SaaS",
    "AI Writing SaaS",
    "Email Marketing SaaS"
  ],
  "CRM System Development": [
    "Sales CRM",
    "Healthcare CRM",
    "Real Estate CRM",
    "Education CRM",
    "Finance CRM"
  ],
  "ERP System Development": [
    "HRMS ERP",
    "Inventory ERP",
    "Finance ERP",
    "School ERP",
    "Production ERP"
  ],
  "E-commerce Store Development": [
    "Clothing Store",
    "Electronics Store",
    "Grocery App",
    "Multi-vendor Marketplace",
    "Single Product Store"
  ],
  "Doctor & Healthcare Platforms": [
    "Doctor Search Hub",
    "Clinic Appointment System",
    "Telemedicine Platform",
    "Hospital Management System",
    "Pharmacy Ordering App"
  ],
  "Dashboard & Admin Panels": [
    "Sales Dashboard",
    "Admin Panel",
    "HR Dashboard",
    "Finance Dashboard",
    "User Insights Dashboard"
  ],
  "Custom Business Tools": [
    "Attendance System",
    "Complaint Management",
    "Project Tracker",
    "Approval Workflows",
    "Billing System"
  ],
  "Real Estate Solutions": [
    "Property Listing Platform",
    "Property Booking",
    "Rent App",
    "Broker CRM",
    "Real Estate Marketplace"
  ],
  "Education & LMS": [
    "LMS Platform",
    "Test Series App",
    "Student Portal",
    "Tutor Booking App",
    "Online Classroom"
  ],
  "Travel & Booking Systems": [
    "Hotel Booking",
    "Tour Booking",
    "Bus Ticketing",
    "Taxi App",
    "Holiday Package System"
  ],
  "Social Media Platforms": [
    "Social Feed App",
    "Photo Sharing",
    "Video Reels App",
    "Chat App",
    "Creator Platform"
  ],
  "AI Tools & Automation": [
    "AI Chatbot",
    "AI Writer",
    "AI Image Generator",
    "AI Resume Builder",
    "AI Code Assistant"
  ],
  "FinTech Apps": [
    "Wallet App",
    "Expense Tracker",
    "Stock Portfolio Manager",
    "Loan Management System",
    "EMI Calculator App"
  ],
  "Food Delivery Platforms": [
    "Food Ordering",
    "Restaurant Dashboard",
    "Delivery Boy App",
    "Cloud Kitchen Management",
    "Multi-Restaurant Marketplace"
  ],
  "Job Portals": [
    "Job Search App",
    "Resume Builder",
    "Employer Dashboard",
    "Candidate Tracking System",
    "Freelancing Marketplace"
  ],
  "Logistics & Courier System": [
    "Courier Tracking",
    "Fleet Management",
    "Delivery Partner App",
    "Warehouse Management",
    "Transport Booking"
  ],
  "Streaming & Entertainment Apps": [
    "Movie Streaming",
    "Music Streaming",
    "Live TV",
    "Podcast App",
    "Short Video App"
  ],
  "Marketplace Solutions": [
    "Multi-vendor eCommerce",
    "Rental Marketplace",
    "Learning Marketplace",
    "Food Marketplace",
    "Service Marketplace"
  ],
  "Hotel & Hospitality Systems": [
    "Hotel PMS",
    "Room Booking System",
    "Channel Manager",
    "Restaurant POS",
    "Staff Scheduling Tool"
  ],
  "Subscription & Membership Platforms": [
    "Membership Website",
    "Premium Content Platform",
    "Fitness Subscription App",
    "Newsletter Subscription System",
    "Paid Community Portal"
  ],
  "Inventory Management Systems": [
    "Stock Manager",
    "Purchase & Supplier",
    "Warehouse App",
    "Barcode Scanner Inventory",
    "Inventory Analytics Dashboard"
  ],
  "Billing & Invoicing Systems": [
    "POS Billing",
    "GST Billing",
    "Subscription Billing",
    "Invoice Generator",
    "Retail Billing System"
  ],
  "HRMS & Attendance Systems": [
    "Payroll System",
    "Leave Management",
    "Attendance Tracking",
    "Employee App",
    "HR Dashboard"
  ],
  "Event Booking Platforms": [
    "Concert Booking",
    "Event Ticketing",
    "Wedding Planner Tool",
    "Venue Booking",
    "Artist Booking System"
  ],
  "OTT & Media Platforms": [
    "Movie OTT",
    "Series OTT",
    "Kids Streaming",
    "Anime OTT",
    "Sports OTT"
  ],
  "Fitness & Gym Platforms": [
    "Gym Management",
    "Trainer Booking",
    "Diet Plan App",
    "Fitness Tracker",
    "Yoga Classes Platform"
  ],
  "Salon & Beauty Booking": [
    "Salon Booking App",
    "Beauty Packages System",
    "Makeup Artist Portal",
    "Spa Management",
    "Cosmetic Store"
  ],
  "Vehicle Rental Platforms": [
    "Car Rental",
    "Bike Rental",
    "Taxi Booking System",
    "Vehicle Scheduler",
    "Rental Marketplace"
  ],
  "Donation & Fundraising Platforms": [
    "NGO Donation Platform",
    "Crowdfunding App",
    "Fundraising Dashboard",
    "Donor Management",
    "Charity Website"
  ],
  "Construction & Contractor Software": [
    "Project Tracker",
    "Contractor CRM",
    "Material Management",
    "Labour Attendance",
    "Cost Estimator Tool"
  ],
  "E-learning Test Platforms": [
    "Mock Test System",
    "Quiz App",
    "Result Generator",
    "Exam Portal",
    "AI Test Evaluator"
  ],
  "Forex & Trading Dashboards": [
    "Price Charts Platform",
    "Portfolio Tracker",
    "Trading Journal",
    "Signals App",
    "Real-time Market Dashboard"
  ],
  "Crypto & Blockchain Apps": [
    "Crypto Wallet",
    "Exchange Platform",
    "NFT Marketplace",
    "Token Launchpad",
    "Web3 Login App"
  ],
  "Productivity Tools": [
    "Notes App",
    "Task Planner",
    "Calendar Scheduling",
    "Team Collaboration",
    "Kanban Board"
  ],
  "Chat Applications": [
    "Real-time Chat",
    "Group Chat",
    "Voice Notes",
    "Media Sharing",
    "Secure Encrypted Chat"
  ],
  "Dating Platforms": [
    "Matchmaking App",
    "Swipe-based Dating",
    "Video Dating",
    "Profile Verification System",
    "Premium Dating Portal"
  ],
  "Real-Time Tracking Apps": [
    "GPS Tracker",
    "Delivery Tracking",
    "Employee Location Tracking",
    "Vehicle Tracker",
    "Pet Tracker"
  ],
  "Ticket Support Systems": [
    "Customer Support Portal",
    "Helpdesk System",
    "Ticket Assignment Tool",
    "Complaint Tracker",
    "Support Dashboard"
  ],
  "Manufacturing Software": [
    "Production Management",
    "QC Inspection System",
    "Machine Maintenance App",
    "Material Planning",
    "Production Analytics"
  ],
  "School Management Systems": [
    "Parent Portal",
    "Teacher Dashboard",
    "Fees Management",
    "Homework App",
    "Attendance & Results"
  ],
  "Exam Result Systems": [
    "Result Portal",
    "Marksheet Generator",
    "Grade Evaluation",
    "Analytics Dashboard",
    "Certificate Generator"
  ],
  "Vendor Management Systems": [
    "Vendor Registration System",
    "Vendor Scorecard",
    "Quotation Manager",
    "Supplier Portal",
    "Purchase Dashboard"
  ],
  "Franchise Management Software": [
    "Franchise Sales Tracker",
    "Branch Manager App",
    "Royalty Dashboard",
    "Staff Management",
    "Lead Allocation System"
  ],
  "Personal Branding Websites": [
    "Influencer Website",
    "Speaker Portfolio",
    "Artist Showcase",
    "Consultant Website",
    "Personal Blog Platform"
  ],
  "AI Image/Video Tools": [
    "AI Image Editor",
    "Video Generator",
    "Photo Enhancer",
    "Background Remover",
    "AI Thumbnail Creator"
  ],
  "API Development & Integrations": [
    "REST API Builder",
    "GraphQL API",
    "Payment Gateway Integration",
    "Third-party API Connector",
    "Webhook Manager"
  ],
  "Automation Bots": [
    "Chatbot Builder",
    "Social Media Bot",
    "Email Automation",
    "Workflow Automation",
    "Customer Service Bot"
  ],
  "Cloud-based Multi-User Platforms": [
    "Multi-tenant SaaS",
    "Collaboration Platform",
    "Team Workspace",
    "Enterprise Portal",
    "Cloud Management System"
  ]
};

// Generate 5 products per category
export const projects = categories.flatMap((cat, ci) => {
  const names = productNames[cat] || Array.from({ length: 5 }).map((_, i) => `${cat.split(' ')[0]} ${i + 1}`);
  
  return names.map((name, i) => {
    const slug = `${slugify(cat)}-${slugify(name)}`;
    const title = `Zombies Coder – ${name}`;
    
    return {
      id: `${ci + 1}-${i + 1}`,
      title,
      slug,
      category: cat,
      categoryIndex: ci,
      shortDescription: `A robust ${cat} solution built by Zombies Coder. Professional ${name.toLowerCase()} with modern UI and scalable architecture.`,
      longDescription: `Zombies Coder presents a full-featured ${cat} solution: ${name}. This production-ready platform includes modern UI, secure backend, scalable architecture, and enterprise-grade features. Built with best practices and optimized for performance.`,
      features: [
        "Responsive UI/UX Design",
        "Authentication & Authorization",
        "Admin Panel & Dashboard",
        "REST & GraphQL APIs",
        "CI/CD Ready",
        "Multi-language Support",
        "Dark/Light Theme",
        "Real-time Updates",
        "Payment Integration",
        "Analytics & Reporting"
      ],
      techStack: ["Next.js", "React", "Node.js", "Tailwind CSS", "MongoDB", "TypeScript"],
      tags: ["zombies-coder", cat.toLowerCase().replace(/\s+/g, '-'), name.toLowerCase().replace(/\s+/g, '-')],
      thumbnail: `/images/${slug}.png`,
      createdAt: new Date(2024, ci % 12, (i + 1) % 28).toISOString(),
    };
  });
});

// Load projects from JSON file if it exists, otherwise use static projects
function loadProjects() {
  if (typeof window === 'undefined') {
    // Server-side
    try {
      const fs = require('fs');
      const path = require('path');
      const jsonPath = path.join(process.cwd(), 'data', 'projects.json');
      if (fs.existsSync(jsonPath)) {
        const jsonProjects = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        if (jsonProjects.length > 0) {
          return jsonProjects;
        }
      }
    } catch (error) {
      // Fallback to static projects
    }
  } else {
    // Client-side - try to load from API
    // For now, use static projects on client
  }
  return projects;
}

export function getProjectsByCategory(categoryName) {
  const allProjects = loadProjects();
  return allProjects.filter(p => p.category === categoryName);
}

export function getProjectBySlug(slug) {
  const allProjects = loadProjects();
  return allProjects.find(p => p.slug === slug);
}

export function getCategoryBySlug(slug) {
  const categoryName = slug.replace(/-/g, ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  return categories.find(c => c.toLowerCase() === categoryName.toLowerCase());
}

