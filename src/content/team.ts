/**
 * Team Data - Solo Consultant
 */

export interface TeamMember {
  name: string;
  role: string;
  title: string;
  bio: string;
  location: string;
  avatar?: string;
  links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

export const team: TeamMember[] = [
  {
    name: 'Shawn Sloan',
    role: 'Founder & Principal Architect',
    title: 'Enterprise Architect & AI Strategist',
    bio: '20+ years building Fortune 100 systems. Former firefighter and mechanic turned enterprise architect. Built infrastructure for xAI Colossus, Mercedes-Benz Stadium, and the Thalamus AI Platform. Now bringing enterprise-grade architecture to companies that thought they couldn\'t afford it.',
    location: 'Port Saint Lucie, Florida',
    links: {
      linkedin: 'https://linkedin.com/in/shawnsloan',
      github: 'https://github.com/shawnsloan',
    },
  },
];

export const founder = team[0];
