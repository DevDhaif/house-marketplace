module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'svg-background': "url('/src/assets/images/logo-black.svg')",
      }),
    },
  },
  plugins: [],
}
