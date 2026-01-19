export const personalInfo = {
  name: "Alfonso Aranzazu",
  title: "Senior Software Engineer",
  email: "alfonso.aranzazu@gmail.com",
  phone: "(559) 726-4094",
  location: "Irvine, CA",
  github: "github.com/0xFonzy",
  linkedin: "linkedin.com/in/alfonso-aranzazu",
  summary: "Senior Software Engineer with 9+ years of experience in building scalable, high-performance products using React, TypeScript, and GraphQL. Skilled in architecture, performance, API integration, UI/UX, and delivering exceptional user experiences.",
  yearsExperience: 9,
};

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    id: "henry-meds",
    company: "Henry Meds",
    role: "Senior Software Engineer",
    period: "Jul 2024 - Present",
    highlights: [
      "Raised ARR by 10% by building scalable onboarding flows for a new ED treatment line, refactoring React components and optimizing GraphQL queries to a PostgreSQL relational database on GCP",
      "Accelerated prescription delivery to customers by 30% by redesigning the provider workflow with modular React TypeScript components and improved UI flows, streamlining prescribing and reducing delays",
    ],
    tech: ["React", "TypeScript", "GraphQL", "Postgres", "GCP"],
  },
  {
    id: "homes-com",
    company: "Homes.com",
    role: "Senior Software Engineer",
    period: "Sep 2023 - Jan 2024",
    highlights: [
      "Drove $10M in auction sales by streamlining auction payments with Stripe, replacing slow ACH transfers with instant processing via React and Java Spring integrations",
      "Improved bidding speed by 25% by leading performance optimizations, including memoizing React components and implementing Redis caching for bid state",
    ],
    tech: ["React", "TypeScript", "Java", "AWS", "Stripe", "CI/CD"],
  },
  {
    id: "capital-group",
    company: "Capital Group",
    role: "Software Engineer III",
    period: "Apr 2019 - Sep 2023",
    highlights: [
      "Increased ARR by $500K by delivering online enrollment in React and TypeScript, serving dynamic content with a headless CMS over a Java Spring API",
      "Enhanced First Contentful Paint by 75% with tree-shaking, lazy loading, and image compression in React, leading the team to resolve critical performance issues and meet launch KPIs",
    ],
    tech: ["React", "TypeScript", "Performance Optimization", "CMS"],
  },
  {
    id: "glidewell",
    company: "Glidewell",
    role: "Software Engineer",
    period: "Jul 2017 - Apr 2019",
    highlights: [
      "Increased development productivity by 20% by building a company-wide Angular component library that 5 engineering teams adopted to create user-friendly interfaces",
      "Improved CRM performance by 40% by reducing Time to Interactive (TTI) through ahead-of-time compilation and tree shaking",
      "Strengthened user collaboration by 40% by building live chat in the Angular CRM with WebSockets and Redis caching",
    ],
    tech: ["Angular", "Component Libraries", "Redis", "WebSockets", "Performance Optimization"],
  },
  {
    id: "cofebe",
    company: "Cofebe",
    role: "Junior Software Engineer",
    period: "Mar 2016 - Jul 2017",
    highlights: [
      "Launched a mobile app in 2 months using Ionic, deploying to Apple and Google app stores",
      "Enabled sub-200ms real-time video streaming using Angular, WebSockets, and Redis, facilitating live interactions between celebrities and fans",
      "Enabled a client's IPO by developing an end-to-end Jasmine test suite for their product launch",
    ],
    tech: ["Ionic", "Angular", "WebSockets", "Redis", "Jasmine"],
  },
  {
    id: "toshiba",
    company: "Toshiba",
    role: "Undergrad Intern",
    period: "Mar 2015",
    highlights: [
      "Pitched an IoT smart home gardening prototype built with Python and Arduino to the VP of Toshiba",
    ],
    tech: ["Python", "Arduino", "IoT"],
  },
];

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  visibility: "Public" | "Private";
  url?: string;
}

export const projects: Project[] = [
  {
    id: "meme-pools-web",
    name: "meme-pools-web",
    description: "Frontend web3 app for memepools.com using React, Next.js, Viem, Wagmi, and Delegate.xyz",
    tech: ["Next.js", "React", "Web3"],
    visibility: "Public",
  },
  {
    id: "layer-zero-contracts",
    name: "layer-zero-contracts",
    description: "Upgradeable Ethereum smart contracts built in Solidity using Layer Zero ONFTs",
    tech: ["Solidity", "Ethereum", "Layer Zero"],
    visibility: "Public",
  },
  {
    id: "solidity-contracts",
    name: "solidity-contracts",
    description: "Deployed Solidity contracts implementing ERC-721A, ERC-404, ERC-1155, Staking, and Soulbound standards",
    tech: ["Solidity", "ERC-721A", "ERC-1155"],
    visibility: "Public",
  },
  {
    id: "froggy-friends-dapp",
    name: "froggy-friends-dapp",
    description: "Web3 Dapp for froggyfriends.io",
    tech: ["React", "Web3", "DApp"],
    visibility: "Public",
  },
  {
    id: "froggy-friends-api",
    name: "froggy-friends-api",
    description: "All purpose API built in Nest JS to service the Froggy Friends website",
    tech: ["TypeScript", "NestJS", "API"],
    visibility: "Public",
  },
  {
    id: "walmart-launch-consulting",
    name: "walmart-launch-consulting",
    description: "Consulting project for Walmart launch",
    tech: ["JavaScript", "Consulting"],
    visibility: "Public",
  },
  {
    id: "github-battleship-app",
    name: "github-battleship-app",
    description: "Battleship game in React for Github coding interview",
    tech: ["TypeScript", "React", "Game"],
    visibility: "Public",
  },
  {
    id: "moviesearch",
    name: "moviesearch",
    description: "Netflix like movie search app that fetches movies from TMDB",
    tech: ["TypeScript", "React", "TMDB API"],
    visibility: "Public",
  },
  {
    id: "henrymeds",
    name: "henrymeds",
    description: "Scheduling app for HenryMeds.com coding challenge built in React",
    tech: ["TypeScript", "React", "Scheduling"],
    visibility: "Public",
  },
];

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "🖥️",
    skills: ["React", "Next.js", "TailwindCSS", "Angular"],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "WebSockets", "Postgres", "Redis", "NestJS"],
  },
  {
    id: "languages",
    name: "Languages",
    icon: "📝",
    skills: ["TypeScript", "JavaScript", "Python", "Solidity"],
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "🔄",
    skills: ["CI/CD", "Docker", "Terraform", "Kubernetes", "GCP", "AWS"],
  },
  {
    id: "tools",
    name: "Tools",
    icon: "🛠️",
    skills: ["Cursor AI", "Chrome DevTools", "LLMs", "Git"],
  },
  {
    id: "web3",
    name: "Web3",
    icon: "🔗",
    skills: ["Solidity", "Viem", "Wagmi", "ERC Standards", "Smart Contracts"],
  },
];

export const education = {
  degree: "B.S. Computer Science (Human Computer Interaction)",
  school: "University of California, Irvine",
  year: "2016",
  description: "Specialized in Human Computer Interaction, focusing on creating intuitive and user-friendly interfaces. Developed a strong foundation in computer science principles while honing skills in user experience design.",
};
