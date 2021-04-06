const defaultTheme = require('tailwindcss/defaultTheme');
const formsPlugin = require('@tailwindcss/forms');
const typographyPlugin = require('@tailwindcss/typography');
const colors = require('tailwindcss/colors');

module.exports = {
  // mode: 'jit',
  purge: ['./apps/**/*.{js,ts,jsx,tsx}', './libs/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand, #105a8f)',
          dark: 'var(--color-brand-dark, #254981)',
          lighter: 'var(--color-brand-lighter, #367dbc)',
          contrast: `var(--color-brand-contrast, ${colors.white})`,
        },
        secondary: {
          DEFAULT: 'var(--color-secondary, #032850)',
          dark: 'var(--color-secondary-dark, #111c36)',
          lighter: 'var(--color-secondary-lighter, #2a467a)',
          contrast: `var(--color-secondary-contrast, ${colors.white})`,
        },
        light: {
          DEFAULT: `var(--color-light, ${colors.gray[100]})`,
          dark: `var(--color-light-dark, ${colors.gray[200]})`,
          lighter: `var(--color-light-lighter, ${colors.gray[50]})`,
          contrast: `var(--color-light-contrast, ${colors.black})`,
        },
        dark: {
          DEFAULT: `var(--color-dark, ${colors.gray[800]})`,
          dark: `var(--color-dark-dark, ${colors.gray[900]})`,
          lighter: `var(--color-dark-lighter, ${colors.gray[700]})`,
          contrast: `var(--color-dark-contrast, ${colors.white})`,
        },
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        cursive: `'Caveat', cursive;`,
        display: `'Quicksand', sans-serif;`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [formsPlugin, typographyPlugin],
};
