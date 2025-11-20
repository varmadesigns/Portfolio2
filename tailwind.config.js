/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        calsans: ['CalSans', 'sans-serif'],
        gilroy: ['Gilroy', 'sans-serif'],
      },
      animation: {
        fadeInDown: 'fadeInDown 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      transitionDelay: {
        0: '0ms',
        100: '100ms',
        200: '200ms',
        300: '300ms',
      },
    },
  },
}
