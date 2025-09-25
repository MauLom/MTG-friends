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

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: { light: 5, dark: 5 },
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  defaultRadius: 'md',
  shadows: {
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'xl',
        shadow: 'md',
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
      },
    },
  },
});