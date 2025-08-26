import { d as getpartnerssdata } from './mongoLoads-BzQOnEVI.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

const load = async () => {
  try {
    const pubData = await getpartnerssdata();
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

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5flncD3D.js')).default;
const server_id = "src/routes/partnership/+page.server.js";
const imports = ["_app/immutable/nodes/11.CwYsO4qz.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/CzG5mwcR.js","_app/immutable/chunks/CsqAPviS.js","_app/immutable/chunks/0A__LkGO.js"];
const stylesheets = ["_app/immutable/assets/11.BGtKA-JV.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=11-BejsbzQJ.js.map
