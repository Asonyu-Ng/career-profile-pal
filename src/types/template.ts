
export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: 'classic' | 'modern' | 'creative' | 'minimal';
}

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and professional design perfect for corporate roles',
    preview: '📄',
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      text: '#1f2937',
      background: '#ffffff',
      accent: '#3b82f6'
    },
    fonts: {
      heading: 'font-serif',
      body: 'font-sans'
    },
    layout: 'classic'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with clean lines and modern typography',
    preview: '🔷',
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      text: '#334155',
      background: '#ffffff',
      accent: '#0ea5e9'
    },
    fonts: {
      heading: 'font-sans',
      body: 'font-sans'
    },
    layout: 'modern'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and creative design for design and marketing roles',
    preview: '🎨',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      text: '#1f2937',
      background: '#ffffff',
      accent: '#ec4899'
    },
    fonts: {
      heading: 'font-sans',
      body: 'font-sans'
    },
    layout: 'creative'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean design focusing on content',
    preview: '⚪',
    colors: {
      primary: '#000000',
      secondary: '#4b5563',
      text: '#374151',
      background: '#ffffff',
      accent: '#6b7280'
    },
    fonts: {
      heading: 'font-mono',
      body: 'font-mono'
    },
    layout: 'minimal'
  }
];

export const COLOR_THEMES = [
  { name: 'Blue', primary: '#3b82f6', secondary: '#1e40af' },
  { name: 'Green', primary: '#10b981', secondary: '#047857' },
  { name: 'Purple', primary: '#8b5cf6', secondary: '#7c3aed' },
  { name: 'Red', primary: '#ef4444', secondary: '#dc2626' },
  { name: 'Orange', primary: '#f97316', secondary: '#ea580c' },
  { name: 'Gray', primary: '#6b7280', secondary: '#374151' }
];
