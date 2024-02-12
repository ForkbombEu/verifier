import adapter from '@sveltejs/adapter-static';
// import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		alias: {
			// $ui: './src/components',
			$paraglide: './src/paraglide',
			'$paraglide/*': './src/paraglide/*'
		}
	}
};

export default config;
