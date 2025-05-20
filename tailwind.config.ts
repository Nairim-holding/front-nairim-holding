import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cor_grad_1: "#6A36C5",
        cor_grad_2: "#22005B",
        cor_grad_3: "#11002E",
        primary: "#6D60FC",
        secondary: "#F2FAFC",
        terciary: "#A49DFC",
        gray: '#B4B4B4',
        blue: "#4A3AFF",
        bg_footer: "#4236C5",
        yellow: "#F6CB12",
        text_black: "#292B22",
        text_black_light: "#333",
        bg_input: "#4762FF14"
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      screens: {
        'tablet': {'max': '768px'},
        'mobile': {'max': '550px'},
        'mobile-sm': {'max': '375px'}
      },
    },
  },
  plugins: [],
} satisfies Config;
