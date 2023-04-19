/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "Sofia Sans",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Noto Sans",
        "Liberation Sans",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      mono: [
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
  },
  content: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./app.vue",
    "./nuxt.config.ts",
  ],
  plugins: [require("@tailwindcss/forms")],
};
