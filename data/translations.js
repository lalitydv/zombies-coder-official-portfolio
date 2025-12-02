export const translations = {
  en: {
    nav: {
      home: "Home",
      categories: "Categories",
      projects: "All Projects",
      caseStudies: "Case Studies",
      services: "Services",
      about: "About",
      contact: "Contact",
    },
    home: {
      hero: {
        title: "Zombies Coder — I build modern Web & Mobile Products",
        subtitle: "Websites, SaaS, Mobile Apps, CRMs, E-commerce, Dashboards — professionally built and production ready.",
        viewProjects: "View Projects",
        contact: "Contact",
      },
      topServices: "Top Services",
      featuredProjects: "Featured Projects",
      stats: {
        categories: "Categories",
        projects: "Projects",
        clients: "Happy Clients",
        experience: "Years Experience",
      },
    },
    categories: {
      title: "Categories",
      allCategories: "All Categories",
      projectsCount: "Projects",
      viewCategory: "View Category",
    },
    projects: {
      title: "All Projects",
      viewProject: "View Project",
      category: "Category",
      features: "Features",
      techStack: "Tech Stack",
      description: "Description",
    },
    project: {
      features: "Features",
      techStack: "Tech Stack",
      description: "Description",
      viewLive: "View Live Demo",
      viewCode: "View Code",
      relatedProjects: "Related Projects",
    },
    footer: {
      rights: "All rights reserved",
      builtBy: "Built by Zombies Coder",
    },
    common: {
      loading: "Loading...",
      search: "Search",
      filter: "Filter",
      noResults: "No results found",
    },
  },
  hi: {
    nav: {
      home: "होम",
      categories: "श्रेणियाँ",
      projects: "सभी प्रोजेक्ट",
      caseStudies: "केस स्टडी",
      services: "सेवाएं",
      about: "के बारे में",
      contact: "संपर्क",
    },
    home: {
      hero: {
        title: "Zombies Coder — मैं आधुनिक वेब और मोबाइल उत्पाद बनाता हूं",
        subtitle: "वेबसाइट, SaaS, मोबाइल ऐप, CRM, ई-कॉमर्स, डैशबोर्ड — पेशेवर रूप से निर्मित और प्रोडक्शन के लिए तैयार।",
        viewProjects: "प्रोजेक्ट देखें",
        contact: "संपर्क",
      },
      topServices: "शीर्ष सेवाएं",
      featuredProjects: "विशेष प्रोजेक्ट",
      stats: {
        categories: "श्रेणियाँ",
        projects: "प्रोजेक्ट",
        clients: "खुश ग्राहक",
        experience: "वर्षों का अनुभव",
      },
    },
    categories: {
      title: "श्रेणियाँ",
      allCategories: "सभी श्रेणियाँ",
      projectsCount: "प्रोजेक्ट",
      viewCategory: "श्रेणी देखें",
    },
    projects: {
      title: "सभी प्रोजेक्ट",
      viewProject: "प्रोजेक्ट देखें",
      category: "श्रेणी",
      features: "विशेषताएं",
      techStack: "तकनीकी स्टैक",
      description: "विवरण",
    },
    project: {
      features: "विशेषताएं",
      techStack: "तकनीकी स्टैक",
      description: "विवरण",
      viewLive: "लाइव डेमो देखें",
      viewCode: "कोड देखें",
      relatedProjects: "संबंधित प्रोजेक्ट",
    },
    footer: {
      rights: "सभी अधिकार सुरक्षित",
      builtBy: "Zombies Coder द्वारा निर्मित",
    },
    common: {
      loading: "लोड हो रहा है...",
      search: "खोजें",
      filter: "फ़िल्टर",
      noResults: "कोई परिणाम नहीं मिला",
    },
  },
};

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

export function getTranslation(lang, key) {
  const keys = key.split('.');
  let value = translations[lang] || translations.en;
  for (const k of keys) {
    value = value?.[k];
    if (!value) return key;
  }
  return value || key;
}

