import { c as deletepartners, e as editpartners, f as createpartners } from './mongoActions-EAD_oq8-.js';
import { g as getAllpartners } from './mongoLoads-BzQOnEVI.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

const load = async () => {
  try {
    const { allBlogs } = await getAllpartners();
    return { allBlogs };
  } catch (error) {
    return {
      allBlogs: [],
      error: "Unexpected error loading blogs"
    };
  }
};
const actions = {
  createpartner: async ({ request }) => {
    try {
      const formData = await request.formData();
      console.log(formData, "formData");
      const imageFile = formData.get("image");
      const content = formData.content;
      const body = Object.fromEntries(formData.entries());
      if (imageFile && imageFile.size > 0) {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const base64Image = imageBuffer.toString("base64");
        body.image = `data:${imageFile.type};base64,${base64Image}`;
      }
      const response = await createpartners(body);
      return {
        success: true,
        message: response.message
      };
    } catch (error) {
      console.error("Error handling Blogs form:", error);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again later."
      };
    }
  },
  editpartner: async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const body = Object.fromEntries(formData.entries());
      const blogId = body.id || params.id;
      if (!blogId) {
        return {
          success: false,
          error: "Blog ID is required to update the blog."
        };
      }
      const response = await editpartners(blogId, body);
      return {
        success: true,
        message: response.message
        // response.message should be from your API or DB update response
      };
    } catch (error) {
      console.error("Error editing blog:", error);
      return {
        success: false,
        error: "Failed to update blog. Please try again."
      };
    }
  },
  deletepartner: async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const body = Object.fromEntries(formData.entries());
      const blogId = body.id || params.id;
      if (!blogId) {
        return {
          success: false,
          error: "Blog ID is required to delete the blog."
        };
      }
      const response = await deletepartners(blogId);
      return {
        success: response.success,
        message: response.message
      };
    } catch (error) {
      console.error("Error deleting blog:", error);
      return {
        success: false,
        error: "Failed to delete blog. Please try again."
      };
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CB1k08RY.js')).default;
const server_id = "src/routes/admin/partners/+page.server.js";
const imports = ["_app/immutable/nodes/6.prucGeua.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BoqYbZC7.js","_app/immutable/chunks/B5PH7vek.js","_app/immutable/chunks/BtG5aEW1.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/CzG5mwcR.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DQwrSZtH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=6-RoZ4-i1K.js.map
