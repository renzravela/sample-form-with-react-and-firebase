import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sample-form-with-react-and-firebase/",
  plugins: [react()],
})
