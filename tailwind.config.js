export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				background: 'var(--color-background)',
				card: 'var(--color-card)',
				text: 'var(--color-text)',
				accent: 'var(--color-accent)',
			},
		},
	},
	plugins: [],
};
