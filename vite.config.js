import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dynamisk `base`-URL baserat på GitHub Pages deployment
const repoName = "ReactMovieStore";

// Kolla om vi kör i en GitHub Actions-miljö
const isGithubActions = process.env.GITHUB_ACTIONS || false;

// Dynamiskt sätt `base` beroende på om vi är på `main` eller `dev`
let base = `/${repoName}/`;
if (isGithubActions && process.env.GITHUB_REF === 'refs/heads/dev') {
  base = `/${repoName}/dev/`;
}

export default defineConfig({
  base,  // Dynamisk `base` för GitHub Pages
  plugins: [react()],
});
