/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        mobile: '360px', 
      },
      colors: {
        primary: '#4f46e5',    
        hovercolor: '#2e8b69', 
        accent: '#10b981',
        appbgcolor: '#f5f7fa'  
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};
