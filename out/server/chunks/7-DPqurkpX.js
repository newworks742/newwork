import { g as deleteproduct, h as editproduct, i as createproduct } from './mongoActions-EAD_oq8-.js';
import { a as getAllProducts } from './mongoLoads-BzQOnEVI.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

const load = async () => {
  try {
    const { allBlogs, error } = await getAllProducts();
    return { allBlogs, error };
  } catch (error) {
    console.error("Error in load:", error);
    return {
      allBlogs: [],
      error: "Unexpected error loading blogs"
    };
  }
};
const actions = {
  //   createblogs: async ({ request }) => {
  //     try {
  //       const formData = await request.formData();
  //       console.log(formData,"formData");
  //       const body = Object.fromEntries(formData.entries());
  //       // Convert image to base64 string
  // if (imageFile && imageFile.size > 0) {
  //   const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  //   const base64Image = imageBuffer.toString('base64');
  //   body.image = {
  //     data: base64Image, // Store as base64 string
  //     contentType: imageFile.type,
  //     filename: imageFile.name,
  //     size: imageFile.size,
  //     uploadDate: new Date()
  //   };
  // }
  //       const response = await createproduct(body);
  //       return {
  //         success: true,
  //         message: response.message,
  //       };
  //     } catch (error) {
  //       console.error('Error handling Blogs form:', error);
  //       return {
  //         success: false,
  //         error: 'An unexpected error occurred. Please try again later.'
  //       };
  //     }
  //   },
  createblogs: async ({ request }) => {
    try {
      const formData = await request.formData();
      console.log(formData, "formData");
      const imageFile = formData.get("image");
      const body = Object.fromEntries(formData.entries());
      if (imageFile && imageFile.size > 0) {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const base64Image = imageBuffer.toString("base64");
        body.image = `data:${imageFile.type};base64,${base64Image}`;
      }
      const response = await createproduct(body);
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
  editblog: async ({ request, params }) => {
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
      const response = await editproduct(blogId, body);
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
  deleteblog: async ({ request, params }) => {
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
      const response = await deleteproduct(blogId);
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

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BSQgv1O0.js')).default;
const server_id = "src/routes/admin/products/+page.server.js";
const imports = ["_app/immutable/nodes/7.DPfU5Liq.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DfK6NDbX.js","_app/immutable/chunks/CsqAPviS.js","_app/immutable/chunks/C588L-jF.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/CzG5mwcR.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DQwrSZtH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=7-DPqurkpX.js.map
