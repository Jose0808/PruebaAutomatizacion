import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'react-router-dom',
        'react-bootstrap',
        'firebase',
        'firebase/firestore',
        'firebase/auth',
        'firebase/app',
        'firebase/analytics',
        'primereact',
        'primereact/api',
        'primereact/datatable',
        'primereact/column',
        'primereact/inputtext',
        'primereact/button',
        'primereact/tooltip',
        'jspdf',
        'jspdf-autotable',
        'xlsx',
        'file-saver',
      ]
    }
  }
})
