import { createTheme, MantineColorsTuple } from '@mantine/core';

// Define custom colors to match the existing design system
const primaryColor: MantineColorsTuple = [
  '#eef2ff',
  '#e0e7ff',
  '#c7d2fe',
  '#a5b4fc',
  '#818cf8',
  '#667eea',
  '#5b21b6',
  '#4c1d95',
  '#3730a3',
  '#312e81',
];

const secondaryColor: MantineColorsTuple = [
  '#fdf4ff',
  '#fae8ff',
  '#f5d0fe',
  '#f0abfc',
  '#e879f9',
  '#d946ef',
  '#c026d3',
  '#a21caf',
  '#86198f',
  '#701a75',
];

const successColor: MantineColorsTuple = [
  '#f0fdf4',
  '#dcfce7',
  '#bbf7d0',
  '#86efac',
  '#4ade80',
  '#22c55e',
  '#16a34a',
  '#15803d',
  '#166534',
  '#14532d',
];

const warningColor: MantineColorsTuple = [
  '#fefce8',
  '#fef9c3',
  '#fef08a',
  '#fde047',
  '#facc15',
  '#eab308',
  '#ca8a04',
  '#a16207',
  '#854d0e',
  '#713f12',
];

const errorColor: MantineColorsTuple = [
  '#fef2f2',
  '#fee2e2',
  '#fecaca',
  '#fca5a5',
  '#f87171',
  '#ef4444',
  '#dc2626',
  '#b91c1c',
  '#991b1b',
  '#7f1d1d',
];

/**
 * MTG Friends Mantine Theme Configuration
 * 
 * This theme provides a consistent design system across the application,
 * with support for dark mode and custom component styling.
 */
export const mantineTheme = createTheme({
  /** Primary brand color */
  primaryColor: 'primary',
  
  /** Shade index for light and dark modes */
  primaryShade: { light: 5, dark: 5 },
  
  /** Custom color palette */
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
    success: successColor,
    warning: warningColor,
    error: errorColor,
  },
  
  /** Font family stack */
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  
  /** Monospace font for code */
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  
  /** Default border radius */
  defaultRadius: 'md',
  
  /** Custom shadow definitions */
  shadows: {
    xs: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  /** Spacing scale (can be customized if needed) */
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  /** Custom component configurations */
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          transition: 'all 300ms ease',
        },
      },
    },
    
    Paper: {
      defaultProps: {
        radius: 'xl',
        shadow: 'md',
      },
    },
    
    Card: {
      defaultProps: {
        radius: 'xl',
        shadow: 'md',
        padding: 'lg',
      },
    },
    
    TextInput: {
      defaultProps: {
        radius: 'lg',
      },
    },
    
    Badge: {
      defaultProps: {
        radius: 'xl',
        variant: 'light',
      },
    },
    
    Modal: {
      defaultProps: {
        radius: 'lg',
        shadow: 'xl',
        centered: true,
      },
    },
    
    Drawer: {
      defaultProps: {
        radius: 'md',
        shadow: 'xl',
      },
    },
    
    Notification: {
      defaultProps: {
        radius: 'lg',
      },
    },
  },
});
