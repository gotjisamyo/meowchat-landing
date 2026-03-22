import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite 8 uses rolldown which requires manualChunks as a function
const vendorChunks = {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-framer': ['framer-motion'],
  'vendor-lucide': ['lucide-react'],
  'vendor-charts': ['recharts', 'd3-', 'victory-'],
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [chunkName, pkgs] of Object.entries(vendorChunks)) {
            if (pkgs.some((pkg) => id.includes(`/node_modules/${pkg}/`))) {
              return chunkName;
            }
          }
        },
      },
    },
  },
})
