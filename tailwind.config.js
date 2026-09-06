module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#031027',
          900: '#020618'
        },
        gold: '#D4AF37'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}
