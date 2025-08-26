import { c as create_ssr_component, a as add_attribute, v as validate_component, f as createEventDispatcher, b as escape, e as each } from './ssr-BN5qA9uw.js';
import { t as tick } from './scheduler-CyGjWP_R.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { T as Toaster } from './Toaster-Bi5s3x0e.js';
import './Toaster.svelte_svelte_type_style_lang-DuhBMABn.js';
import { I as Icon } from './Icon-DA1KMwkX.js';
import './index-DISo2uF1.js';
import './functions-DmKzDADE.js';

const BlogList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isEditing = false } = $$props;
  let { blogToEdit = null } = $$props;
  let { showForm = false } = $$props;
  createEventDispatcher();
  let title = "";
  let content = "";
  let image = "";
  let imageType = "url";
  let editorContainer;
  async function initializeForm() {
    await tick();
    if (isEditing && blogToEdit) {
      title = blogToEdit.title || "";
      blogToEdit.category || "";
      image = blogToEdit.image || "";
      content = blogToEdit.content || "";
      imageType = image?.startsWith("http") ? "url" : "upload";
    } else {
      title = "";
      image = "";
      content = "";
      imageType = "url";
    }
  }
  if ($$props.isEditing === void 0 && $$bindings.isEditing && isEditing !== void 0) $$bindings.isEditing(isEditing);
  if ($$props.blogToEdit === void 0 && $$bindings.blogToEdit && blogToEdit !== void 0) $$bindings.blogToEdit(blogToEdit);
  if ($$props.showForm === void 0 && $$bindings.showForm && showForm !== void 0) $$bindings.showForm(showForm);
  {
    if (showForm) {
      initializeForm();
    }
  }
  return `<div${add_attribute(
    "class",
    showForm ? "fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center" : "hidden",
    0
  )}><div class="bg-white p-6 rounded-lg shadow-lg w-8/12 h-[530px] overflow-y-auto relative z-50"><h2 class="text-xl font-bold mb-4">${escape(isEditing ? "Edit Product" : "Create New Product")}</h2> <form class="space-y-4" method="POST"${add_attribute("action", isEditing ? "?/editblog" : "?/createblogs", 0)} enctype="multipart/form-data"><input name="title" placeholder="Title" class="w-full p-2 border rounded" required${add_attribute("value", title, 0)}> ${blogToEdit ? `<input name="id" type="hidden"${add_attribute("value", blogToEdit.id, 0)}>` : ``} <div class="border border-t rounded bg-white h-52"${add_attribute("this", editorContainer, 0)}></div> <input type="hidden" name="content"${add_attribute("value", content, 0)}> <div class="space-y-2"> <label class="font-semibold" data-svelte-h="svelte-lkup85">Image Input Type:</label> <div class="flex gap-4"><label><input type="radio" value="url"${"url" === imageType ? add_attribute("checked", true, 1) : ""}> URL</label> <label><input type="radio" value="upload"${"upload" === imageType ? add_attribute("checked", true, 1) : ""}> Upload</label></div> ${imageType === "url" ? `<input type="text" name="image" placeholder="Image URL" class="w-full p-2 border rounded" required${add_attribute("value", image, 0)}>` : ` <input type="file" name="image" accept="image/*" class="w-full p-2 border rounded" ${!isEditing ? "required" : ""}>`}</div> <div class="flex justify-end gap-2"><button type="button" class="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100" data-svelte-h="svelte-16i6ppw">Cancel</button> <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">${escape(isEditing ? "Update" : "Submit")}</button></div></form> <div class="mt-6 border-t pt-4"><h3 class="text-lg font-semibold mb-2" data-svelte-h="svelte-1pwhgft">Preview</h3> ${image ? ` <img${add_attribute("src", image, 0)} alt="Preview Image" class="w-40 h-40 rounded border mb-4">` : ``} </div></div></div> ${validate_component(Toaster, "Toaster").$$render(
    $$result,
    {
      position: "bottom-right",
      richColors: true
    },
    {},
    {}
  )}`;
});
const AllBlogs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredBlogs;
  let { blogData } = $$props;
  let { searchQuery = "" } = $$props;
  createEventDispatcher();
  if ($$props.blogData === void 0 && $$bindings.blogData && blogData !== void 0) $$bindings.blogData(blogData);
  if ($$props.searchQuery === void 0 && $$bindings.searchQuery && searchQuery !== void 0) $$bindings.searchQuery(searchQuery);
  filteredBlogs = blogData?.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || blog.content.toLowerCase().includes(searchQuery.toLowerCase()) || blog.content.toLowerCase().includes(searchQuery.toLowerCase()));
  return `<div class="w-full border-t-1 border-b-1 border-l-1 overflow-auto rounded scroll-bar"><table class="w-full border-r-1 border-collapse rounded text-sm"><thead data-svelte-h="svelte-1w5ldww"><tr class="font-medium bg-gray-100 sticky top-0 text-left"><th class="px-4 py-2 border">Title</th> <th class="px-4 py-2 border">Description</th> <th class="px-4 py-2 border">Image</th> <th class="px-4 py-2 border">Actions</th></tr></thead> <tbody>${each(filteredBlogs, (blog) => {
    return `<tr class="border-t border-gray-300 text-left align-top"><td class="px-4 py-3">${escape(blog.title.slice(0, 100))}...</td> <td class="px-4 py-3"><!-- HTML_TAG_START -->${blog.content.slice(0, 100)}<!-- HTML_TAG_END -->...</td> <td class="px-4 py-3"> <img${add_attribute("src", blog.image, 0)} class="h-16 w-16 border rounded object-cover"></td> <td class="px-4 py-3 my-3 flex items-center justify-center"><div class="flex gap-2 items-center"> <button class="bg-gray-700 text-white px-2 py-1 rounded hover:bg-white hover:text-gray-700 border border-gray-700 flex items-center gap-1">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ic:sharp-mode-edit",
        class: "text-xl"
      },
      {},
      {}
    )}</button>  <form method="POST" action="?/deleteblog"><input type="hidden" name="id"${add_attribute("value", blog.id, 0)}> <button type="submit" class="bg-gray-700 text-white px-2 py-1 rounded hover:bg-white hover:text-gray-700 border border-gray-700 flex items-center gap-1">${validate_component(Icon, "Icon").$$render($$result, { icon: "bi:trash", class: "text-xl" }, {}, {})} </button></form> </div></td> </tr>`;
  })}</tbody></table></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let isEditing = false;
  let blogToEdit = null;
  let showForm = false;
  let searchQuery = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="mb-4 flex flex-wrap items-center gap-4 bg-gray-300 justify-between p-4 rounded"><h1 class="text-2xl font-bold w-full sm:w-auto" data-svelte-h="svelte-57wn1m">Products</h1> <input type="text" placeholder="Search Blogs..." class="border-gray-300 rounded-md shadow-sm w-full sm:w-80 focus:ring-0"${add_attribute("value", searchQuery, 0)}> <button class="bg-gray-700 text-white border px-5 py-1 rounded hover:bg-white hover:text-gray-700 border-gray-700 w-full sm:w-auto" data-svelte-h="svelte-r96z7c">Add New Product</button></div> ${validate_component(BlogList, "BlogList").$$render($$result, { isEditing, blogToEdit, showForm }, {}, {})} ${validate_component(AllBlogs, "AllBlogs").$$render($$result, { blogData: data.allBlogs, searchQuery }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BSQgv1O0.js.map
