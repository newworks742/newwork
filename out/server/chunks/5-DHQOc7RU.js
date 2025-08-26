import { n as newsroom } from './mongoLoads-BzQOnEVI.js';
import { f as fail } from './index-BNsehNMA.js';
import { d as deleteEvent, a as updateEvent, b as addEvent } from './mongoActions-EAD_oq8-.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

async function load({ parent, url, fetch }) {
  const page = url.searchParams.get("page");
  const search = url.searchParams.get("search");
  const filter = url.searchParams.get("filter");
  let news = [];
  let submissions = [];
  try {
    news = await newsroom(page, search, filter);
  } catch (error) {
    console.error("Failed to load data:", error);
    return { data: null, error: error.message || "An unknown error occurred" };
  }
  return {
    news,
    records: submissions
  };
}
const actions = {
  addnewsroom: async ({ request }) => {
    const formData = await request.formData();
    const fileName = formData.get("fileName");
    const body = Object.fromEntries(formData);
    try {
      console.log("Adding news item:", body);
      if (!body.newsLink) {
        body.newsLink = body.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/-$/, "");
      }
      const result = await addEvent(body, fileName);
      return { status: 200, message: result.message };
    } catch (error) {
      console.error("Error during news addition:", error);
      return fail(500, {
        error: true,
        message: error.message || "Failed to add news item"
      });
    }
  },
  updatenewsroom: async ({ request }) => {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    try {
      if (!body.newsLink) {
        body.newsLink = body.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/-$/, "");
      }
      const result = await updateEvent(body);
      return { status: 200, message: result.message };
    } catch (error) {
      console.error("Error during news update:", error);
      return fail(500, {
        error: true,
        message: error.message || "Failed to update news item"
      });
    }
  },
  deletenews: async ({ request }) => {
    const body = Object.fromEntries(await request.formData());
    try {
      const result = await deleteEvent(body);
      return result;
    } catch (error) {
      console.error("Error during user update:", error);
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bqo7HYsN.js')).default;
const server_id = "src/routes/admin/events/+page.server.js";
const imports = ["_app/immutable/nodes/5.CjkAFDAy.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/0A__LkGO.js","_app/immutable/chunks/CsqAPviS.js","_app/immutable/chunks/DfK6NDbX.js","_app/immutable/chunks/C588L-jF.js","_app/immutable/chunks/CzG5mwcR.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DQwrSZtH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=5-DHQOc7RU.js.map
