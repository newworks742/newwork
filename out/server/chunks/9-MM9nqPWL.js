import { b as getNewsData } from './mongoLoads-BzQOnEVI.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

const load = async () => {
  try {
    const pubData = await getNewsData();
    return {
      ...pubData
    };
  } catch (error) {
    console.error("Error loading profile data:", error);
    return { error: "Failed to load data" };
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-k0MuzEDA.js')).default;
const server_id = "src/routes/events/+page.server.js";
const imports = ["_app/immutable/nodes/9.BBUPF0Ml.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/CzG5mwcR.js","_app/immutable/chunks/CsqAPviS.js","_app/immutable/chunks/0A__LkGO.js"];
const stylesheets = ["_app/immutable/assets/9.Bw3l0oq3.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=9-MM9nqPWL.js.map
