/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
    ],
    theme: {
        extend: {
            colors: {
                brand: '#f97316', // orange-500 accent
            }
        }
    },
    plugins: [],
}