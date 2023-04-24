const { environment } = require(`./environments/${process.env.NODE_ENV}.ts`);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: "Bürofreunde",
      bodyAttrs: {
        class:
          "h-full bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 selection:bg-teal-400 selection:text-slate-700 font-sans font-light lg:text-xl leading-relaxed",
      },
      script: [
        {
          defer: true,
          crossorigin: "anonymous",
          src: "https://kit.fontawesome.com/34fb0cf229.js",
        },
        {
          textContent:
            '"dark"!==localStorage.theme&&("theme"in localStorage||!window.matchMedia("(prefers-color-scheme: dark)").matches)?document.documentElement.classList.remove("dark"):document.documentElement.classList.add("dark");',
        },
      ],
    },
    pageTransition: { name: "fade", mode: "out-in" },
  },
  runtimeConfig: {
    public: environment,
  },
  googleFonts: {
    display: "swap",
    prefetch: true,
    preconnect: true,
    families: {
      "Sofia Sans": [300, 600],
    },
  },
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/tailwindcss"],
  ssr: false,
});
