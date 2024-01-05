import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "https://open-ai-chat-app-server.vercel.app",
        changeOrigin: true,
      },
      "/api": {
        target: "https://open-ai-chat-app-server.vercel.app",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
