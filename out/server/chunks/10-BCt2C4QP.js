import { c as getSingleNewsData } from './mongoLoads-BzQOnEVI.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

const load = async ({ params }) => {
  try {
    const { eventid } = params;
    if (!eventid) {
      return { error: "Event ID is required" };
    }
    const pubData = await getSingleNewsData(eventid);
    return {
      newsdata: JSON.parse(JSON.stringify(pubData))
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

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-TZMgy02R.js')).default;
const server_id = "src/routes/events/[eventid]/+page.server.js";
const imports = ["_app/immutable/nodes/10.DuOf-X2y.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/CzG5mwcR.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/BtG5aEW1.js","_app/immutable/chunks/B5PH7vek.js","_app/immutable/chunks/BoqYbZC7.js","_app/immutable/chunks/B1gt4VIs.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DQwrSZtH.css","_app/immutable/assets/10.j11M3ytH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=10-BCt2C4QP.js.map
