import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    importToCDN({
        modules: [
            autoComplete('react'),
            autoComplete('react-dom'),
            autoComplete('moment'),
            autoComplete('antd'),
            autoComplete('react-bootstrap')
        ],
    }),
    reactRefresh(),
],
})
