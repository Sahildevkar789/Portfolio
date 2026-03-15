/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                // We'll define custom colors here or use Tailwind defaults. The prompt asked for Apple/Stripe aesthetic.
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    900: '#0c4a6e',
                },
                dark: {
                    bg: '#0a0a0a',
                    card: '#111111',
                    text: '#f3f4f6',
                },
                light: {
                    bg: '#ffffff',
                    card: '#f9fafb',
                    text: '#111827',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Popular modern font
            },
            animation: {
                blob: "blob 7s infinite",
            },
            keyframes: {
                blob: {
                    "0%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                        transform: "translate(30px, -50px) scale(1.1)",
                    },
                    "66%": {
                        transform: "translate(-20px, 20px) scale(0.9)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                },
            },
        },
    },
    plugins: [],
}
