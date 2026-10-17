/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E87532',
          orangeDark: '#C95F20',
          green: '#237A57',
          greenLight: '#E8F5EF',
          cream: '#FFFAF1',
          paper: '#FFFFFF',
          ink: '#1F2A37',
          muted: '#6B7280',
          line: '#ECE5D9',
          pale: '#FFF0E2'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
