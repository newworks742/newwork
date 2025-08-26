import { e as getprodustsdata } from './mongoLoads-BzQOnEVI.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

const load = async () => {
  try {
    const pubData = await getprodustsdata();
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

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D14c_gIV.js')).default;
const server_id = "src/routes/products/+page.server.js";
const imports = ["_app/immutable/nodes/12.BeZUWsqy.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/CzG5mwcR.js","_app/immutable/chunks/CsqAPviS.js","_app/immutable/chunks/0A__LkGO.js"];
const stylesheets = ["_app/immutable/assets/12.CsmmsXDU.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=12-kuZyFPD2.js.map
