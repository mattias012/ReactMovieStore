import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = "ReactMovieStore";

// Kolla om vi är i GitHub Actions
const isGithubActions = process.env.GITHUB_ACTIONS || false;

// Sätt `base` beroende på om vi kör `main` eller `dev`
let base = `/${repoName}/`;
if (isGithubActions && process.env.GITHUB_REF === 'refs/heads/dev') {
  base = `/${repoName}/dev/`;
}

export default defineConfig({
  base,  // Sätt korrekt base URL beroende på gren
  plugins: [react()],
});
