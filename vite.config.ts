import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const copy404 = () => ({
  name: 'copy-404',
  closeBundle() {
    try {
        const distPath = path.resolve(process.cwd(), 'dist')
        fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '404.html'))
        console.log('Created 404.html from index.html')
    } catch (e) {
        console.error('Failed to create 404.html', e)
    }
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copy404()],
  base: '/quinnhilger-portfolio/',
})
