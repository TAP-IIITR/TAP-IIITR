import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  server:{
    proxy:{
      '/api':'https://s6dohx6twlodp6xdapdb4q4pea0gsvia.lambda-url.ap-south-1.on.aws'
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
