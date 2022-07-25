const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/component/**/*.{js,ts,jsx,tsx}',
    './src/layout/**/*.{js,ts,jsx,tsx}',
    // Add more here
  ],

  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      serif: ['Inter', 'sans-serif'],
      DejaVu: ['DejaVu Sans', 'Arial', 'sans-serif'],
    },
    extend: {
      height: {
        header: '560px',
      },
      backgroundImage: {
        'page-header': "url('/page-header-bg.jpg')",
        'contact-header': "url('/page-header-bg-2.jpg')",
        subscribe: "url('/subscribe-bg.jpg')",
        'app-download': "url('/app-download.jpg')",
        cta: "url('/cta-bg.png')",
        'cta-1': "url('/cta/cta-bg-1.png')",
        'cta-2': "url('/cta/cta-bg-2.png')",
        'cta-3': "url('/cta/cta-bg-3.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
