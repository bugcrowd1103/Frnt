import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ✅ Clean production config (no replit plugins, no theme plugin)
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: "./", // your index.html is already at repo root
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
