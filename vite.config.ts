import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// The compiled notes live in subjects/, outside Vite's publicDir (which holds the
// shared LaTeX sources). Dev serves them straight from the project root; this
// copies just the PDFs into dist/ at build time.
function copyNotePdfs(): Plugin {
  return {
    name: 'copy-note-pdfs',
    apply: 'build',
    closeBundle() {
      for (const subject of readdirSync('subjects', { withFileTypes: true })) {
        if (!subject.isDirectory()) continue
        const from = join('subjects', subject.name)
        const to = join('dist', from)
        for (const file of readdirSync(from)) {
          if (!file.endsWith('.pdf')) continue
          mkdirSync(to, { recursive: true })
          copyFileSync(join(from, file), join(to, file))
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyNotePdfs()],
})
