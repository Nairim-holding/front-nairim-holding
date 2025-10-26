import type { Config } from "tailwindcss";

export default {
  darkMode: false,
  theme: {
    colors: {
      cor_grad_1: "#6A36C5",
      cor_grad_2: "#22005B",
      cor_grad_3: "#11002E",
      primary: "#6D60FC",
      secondary: "#F2FAFC",
      terciary: "#A49DFC",
      gray: "#B4B4B4",
      blue: "#4A3AFF",
      bg_footer: "#4236C5",
      yellow: "#F6CB12",
      text_black: "#292B22",
      text_black_light: "#333",
      bg_input: "#4762FF14",
    },
    screens: {
      laptop: { max: "992px" },
      tablet: { max: "768px" },
      mobile: { max: "550px" },
      "mobile-sm": { max: "375px" },
    },
    dropShadow: {
      "custom-black": "0px 4px 6px #0000000D",
      "purple-soft": "0px 4px 12px #8B5CF666",
      "section-1": "0px 1px 3px 0px rgb(0, 0, 0)",
      "section-2": "0px 4px 8px 3px rgb(0, 0, 0)",
    },
  },
  plugins: [],
} satisfies Config;
