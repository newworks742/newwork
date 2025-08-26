const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["aboutpages.png","banner5.png","banner6.png","bgvideo.mp4","bgvideo1.mp4","carousel/1.png","carousel/10.png","carousel/11.png","carousel/12.png","carousel/13.png","carousel/14.png","carousel/15.png","carousel/16.png","carousel/17.png","carousel/18.png","carousel/19.png","carousel/2.png","carousel/20.png","carousel/21.png","carousel/22.png","carousel/23.png","carousel/24.png","carousel/3.png","carousel/4.png","carousel/5.png","carousel/6.png","carousel/7.png","carousel/8.png","carousel/9.png","carousel/ATHER.png","carousel/DNLV.png","carousel/em.png","carousel/ISRO.png","carousel/JBGVS.png","carousel/jucom Aerospace.png","carousel/Meslova.png","carousel/River.png","carousel/Untitled design.png","carousel/VVDN.png","DT.png","fb.png","hero1.png","hero2.png","hero3.png","hero4.png","hero5.png","hero6.png","hero7.png","hero8.png","insta.png","linkedin.png","logo.png","oem/crobot technologies.png","oem/Digilent.png","oem/Mantiswave.png","oem/NI.png","oem/ST.png","oem/Tmytek.png","oem/Viavi.png","partner.png","product.png","robots.txt","Technology_Data_Visualization.mp4","unknown.png","unnamed.jpg","vission AI.mp4","Visualization.mp4"]),
	mimeTypes: {".png":"image/png",".mp4":"video/mp4",".txt":"text/plain",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.V3sPUl3q.js",app:"_app/immutable/entry/app.Nr7Js0Vw.js",imports:["_app/immutable/entry/start.V3sPUl3q.js","_app/immutable/chunks/B5PH7vek.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/entry/app.Nr7Js0Vw.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DP-wqAK8.js')),
			__memo(() => import('./chunks/1-CsGT0Hj9.js')),
			__memo(() => import('./chunks/2-Vn3lkjFI.js')),
			__memo(() => import('./chunks/3-D9n4Cyks.js')),
			__memo(() => import('./chunks/4-BGaXQf3W.js')),
			__memo(() => import('./chunks/5-DAJXh4gb.js')),
			__memo(() => import('./chunks/6-RoZ4-i1K.js')),
			__memo(() => import('./chunks/7-BC7wlXH-.js')),
			__memo(() => import('./chunks/8-DgkVRVGo.js')),
			__memo(() => import('./chunks/9-ByZ5GtrK.js')),
			__memo(() => import('./chunks/10-BCt2C4QP.js')),
			__memo(() => import('./chunks/11-rf-jz0p-.js')),
			__memo(() => import('./chunks/12-kjizO4ST.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin/contact",
				pattern: /^\/admin\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/events",
				pattern: /^\/admin\/events\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/partners",
				pattern: /^\/admin\/partners\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/products",
				pattern: /^\/admin\/products\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/contactus",
				pattern: /^\/contactus\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/events",
				pattern: /^\/events\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/events/[eventid]",
				pattern: /^\/events\/([^/]+?)\/?$/,
				params: [{"name":"eventid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/partnership",
				pattern: /^\/partnership\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/products",
				pattern: /^\/products\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
