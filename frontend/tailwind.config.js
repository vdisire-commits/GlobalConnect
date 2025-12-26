export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a1a1a',
                    50: '#f5f5f5',
                    100: '#e5e5e5',
                    200: '#cccccc',
                    300: '#b3b3b3',
                    400: '#999999',
                    500: '#808080',
                    600: '#666666',
                    700: '#4d4d4d',
                    800: '#333333',
                    900: '#1a1a1a',
                },
                secondary: {
                    DEFAULT: '#262626',
                    900: '#262626',
                    800: '#333333',
                    700: '#404040',
                },
                accent: {
                    DEFAULT: '#ff8c42',
                    50: '#fff5ed',
                    100: '#ffe8d5',
                    200: '#ffd1aa',
                    300: '#ffb074',
                    400: '#ff8c42',
                    500: '#ff7620',
                    600: '#ff6b0a',
                    700: '#cc5500',
                    800: '#a14400',
                    900: '#7a3300',
                },
                dark: {
                    DEFAULT: '#1a1a1a',
                    50: '#f5f5f5',
                    100: '#e5e5e5',
                    200: '#cccccc',
                    300: '#b3b3b3',
                    400: '#999999',
                    500: '#808080',
                    600: '#666666',
                    700: '#4d4d4d',
                    800: '#333333',
                    900: '#1a1a1a',
                },
                text: {
                    primary: '#f5f5f5',
                    secondary: '#b8b8b8',
                },
                border: {
                    DEFAULT: '#404040',
                },
                success: '#10b981',
                danger: '#ef4444',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(30px)' },
                }
            }
        },
    },
    plugins: [],
}
