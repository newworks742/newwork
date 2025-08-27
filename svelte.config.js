// // import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import { preprocessMeltUI, sequence } from '@melt-ui/pp';
// import adapter from '@sveltejs/adapter-node';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter({
// 			out: 'out',
// 			precompress: true,
// 			envPrefix: 'Digitoad_',
// 			assets: 'static'
// 		}),
// 		csrf: {
// 			checkOrigin: false
// 		}
// 	},
// 	preprocess: [vitePreprocess(), sequence([preprocessMeltUI()])]
// };
// export default config;



import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-netlify'; // 👈 use Netlify adapter
// import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // you usually don't need to set options, defaults are good
    }),
    csrf: {
    //   checkOrigin: false
	trustedOrigins: []
    }
  },
  preprocess: [vitePreprocess(), sequence([preprocessMeltUI()])]
};

export default config;
