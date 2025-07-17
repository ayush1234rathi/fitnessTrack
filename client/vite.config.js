import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server:{
    proxy:{
      "/api":{
        target:'https://fitness-server-0bzg.onrender.com',
        changeOrigin:true,
        secure:true
      }
    }
  }
})
