/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS Variables (for theme switching)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        
        // Primary Palette - Executive Foundation
        charcoal: {
          900: '#0F172A', // Deep Charcoal - Primary backgrounds
          800: '#1E293B', // Slate-800 - Secondary backgrounds
          700: '#334155', // Slate-700 - Borders, dividers
          600: '#475569', // Slate-600 - Muted text
          100: '#F1F5F9', // Slate-100 - Light backgrounds
        },
        
        // Accent Colors - Vibrant but Refined
        accent: {
          blue: {
            DEFAULT: '#3B82F6', // Blue-500
            600: '#2563EB', // Blue-600
            500: '#3B82F6',
          },
          violet: {
            DEFAULT: '#8B5CF6', // Violet-500
            600: '#7C3AED', // Violet-600
            500: '#8B5CF6',
          },
          emerald: {
            DEFAULT: '#10B981', // Emerald-500
            600: '#059669', // Emerald-600
            500: '#10B981',
          },
          amber: {
            DEFAULT: '#F59E0B', // Amber-500
            600: '#D97706', // Amber-600
            500: '#F59E0B',
          },
        },
        
        // Semantic Colors
        success: '#10B981', // Emerald-500
        warning: '#F59E0B', // Amber-500
        error: '#F43F5E', // Rose-500
        info: '#0EA5E9', // Sky-500
      },
      
      // Typography Scale
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }], // 72px
        'display-l': ['3rem', { lineHeight: '1.2', fontWeight: '700' }], // 48px
        'display-m': ['2.25rem', { lineHeight: '1.25', fontWeight: '600' }], // 36px
        'heading-l': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }], // 30px
        'heading-m': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px
        'body-l': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body-m': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'body-s': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'label': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }], // 12px
      },
      
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      
      // Spacing System (8px base unit - extending Tailwind's default)
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      
      // Border Radius
      borderRadius: {
        'xl': '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
      },
      
      // Box Shadows - Elevation System
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.2)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.2)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      
      // Animation Timing
      transitionDuration: {
        'instant': '50ms',
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
        'deliberate': '800ms',
      },
      
      transitionTimingFunction: {
        'ease-out-smooth': 'cubic-bezier(0.0, 0, 0.2, 1)',
        'ease-in-out-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Backdrop Blur
      backdropBlur: {
        xs: '2px',
      },
      
      // Z-Index Scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};

