import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      manifest: {
        name: "TFood",
        short_name: "TFood",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#38bdf8", // tailwind sky-400
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@routes": path.resolve(__dirname, "./src/routes"),
    },
  },
});
