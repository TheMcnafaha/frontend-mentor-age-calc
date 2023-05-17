import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors:{
      template_purple:"hsl(259, 100%, 65%)",
      template_red: "hsl(0, 100%, 67%)",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
