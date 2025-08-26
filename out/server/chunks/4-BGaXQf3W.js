import { f as fetchContacts } from './mongoLoads-BzQOnEVI.js';
import { u as updatecontactstatus } from './mongoActions-EAD_oq8-.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

async function load({ parent, url, fetch }) {
  const page = url.searchParams.get("page");
  const search = url.searchParams.get("search");
  const filter = url.searchParams.get("filter");
  let contacts = [];
  try {
    contacts = await fetchContacts(page, search, filter);
    console.log(contacts, "contactsssssssssss");
    return {
      records: contacts?.records,
      totalCount: contacts?.totalCount
    };
  } catch (error) {
    console.error("Failed to load contacts:", error);
    return {
      records: [],
      totalCount: 0
    };
  }
}
const actions = {
  status: async ({ request }) => {
    const body = Object.fromEntries(await request.formData());
    try {
      const result = await updatecontactstatus(body);
      return result;
    } catch (error) {
      console.log("Error in action:", error.response);
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-2a_a8U5X.js')).default;
const server_id = "src/routes/admin/contact/+page.server.js";
const imports = ["_app/immutable/nodes/4.DxHhLRhA.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/B5PH7vek.js","_app/immutable/chunks/CMFrGLg8.js","_app/immutable/chunks/CzG5mwcR.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=4-BGaXQf3W.js.map
