import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { tanstackRouter } from '@tanstack/router-plugin/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({ target: 'react' }), react()],
  test: {
    // Load the development exports so memory routers can opt into client navigation.
    server: { deps: { inline: ['@tanstack/react-router', '@tanstack/router-core'] } },
  },
})

