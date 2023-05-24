import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      template_purple: "hsl(259, 100%, 65%)",
      template_red: "hsl(0, 100%, 67%)",
      template_off_white: "hsl(0, 0%, 94%)",
      template_ligth_grey: "hsl(0, 0%, 86%)",
      template_smokey_grey: "hsl(0, 1%, 44%)",
      template_off_black: "hsl(0, 0%, 8%)",
    },
    screens: {

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
