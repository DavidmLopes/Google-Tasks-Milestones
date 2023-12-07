import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'bg-primary': '#454545',
                'text-primary': '#FFFFFF',
                highlights: '#ff9c24',
                'highlights-h': '#e88f23',
            },
        },
    },
    plugins: [],
}
export default config
