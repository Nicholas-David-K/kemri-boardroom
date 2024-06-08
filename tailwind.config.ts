import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            backgroundImage: (theme: any) => ({
                'gradient-dark':
                    'linear-gradient(180deg,rgba(84,89,94,0),rgba(84,89,94,.008) 6.67%,rgba(84,89,94,.032) 13.33%,rgba(84,89,94,.073) 20%,rgba(84,89,94,.133) 26.67%,rgba(84,89,94,.209) 33.33%,rgba(84,89,94,.299) 40%,rgba(84,89,94,.398) 46.67%,rgba(84,89,94,.502) 53.33%,rgba(84,89,94,.601) 60%,rgba(84,89,94,.691) 66.67%,rgba(84,89,94,.767) 73.33%,rgba(84,89,94,.827) 80%,rgba(84,89,94,.868) 86.67%,rgba(84,89,94,.892) 93.33%,rgba(84,89,94,.9))',
                'gradient-blue':
                    'linear-gradient(180deg,rgba(0,22,43,0),rgba(0,22,43,.008) 6.67%,rgba(0,22,43,.032) 13.33%,rgba(0,22,43,.073) 20%,rgba(0,22,43,.133) 26.67%,rgba(0,22,43,.209) 33.33%,rgba(0,22,43,.299) 40%,rgba(0,22,43,.398) 46.67%,rgba(0,22,43,.502) 53.33%,rgba(0,22,43,.601) 60%,rgba(0,22,43,.691) 66.67%,rgba(0,22,43,.767) 73.33%,rgba(0,22,43,.827) 80%,rgba(0,22,43,.868) 86.67%,rgba(0,22,43,.892) 93.33%,rgba(0,22,43,.9))',
                'gradient-blur': 'linear-gradient(180deg,hsla(0,0%,100%,0),#fff);',
                'gradient-card':
                    'linear-gradient(180deg, rgba(0,22,43,0), rgba(0,22,43,.008) 6.67%, rgba(0,22,43,.032) 13.33%, rgba(0,22,43,.073) 20%, rgba(0,22,43,.133) 26.67%, rgba(0,22,43,.209) 33.33%, rgba(0,22,43,.299) 40%, rgba(0,22,43,.398) 46.67%, rgba(0,22,43,.502) 53.33%, rgba(0,22,43,.601) 60%, rgba(0,22,43,.691) 66.67%, rgba(0,22,43,.767) 73.33%, rgba(0,22,43,.827) 80%, rgba(0,22,43,.868) 86.67%, rgba(0,22,43,.892) 93.33%, rgba(0,22,43,.9))',
            }),
            screens: {
                xs: '368px',
                xm: '668px',
                sm: '768px',
                md: '1060px',
                lg: '1200px',
                xl: '1408px',
                xxl: '1556px',
                '3xl': '1700px',
                '4xl': '1900px',
            },
            colors: {
                'primary-500': '#06abdd',
                'primary-400': '#1e73be',
                'dark-500': '#262626',

                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
