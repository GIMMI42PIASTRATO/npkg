/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                primary: '#E7E5E4',
                primary_dark: '#181A1B',
            },
            textColor: {
                primary: '#E7E5E4',
                primary_dark: '#181A1B',
            },
            maxHeight: {
                container: '80vh',
            },
        },
    },
    darkMode: 'media',
    plugins: [],
};
