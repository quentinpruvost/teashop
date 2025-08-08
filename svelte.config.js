// svelte.config.js

import adapter from '@sveltejs/adapter-auto'; // VÉRIFIEZ CETTE LIGNE
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter() // ET CELLE-CI
    }
};

export default config;