// Dans tailwind.config.js

import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...fontFamily.sans],
                // LIGNE À AJOUTER
                script: ['"Dancing Script"', ...fontFamily.sans]
            }
        }
    },

    plugins: []
};

export default config;