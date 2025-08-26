import { c as create_ssr_component, v as validate_component, d as subscribe, a as add_attribute, b as each, e as escape } from './ssr-CjCjd7wL.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { p as page } from './stores-BUIdY5jO.js';
import { I as Icon } from './Icon-GgoLCHfK.js';
import './functions-DmKzDADE.js';

const Contactadmin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalCount;
  let contacts;
  let currentPage;
  let totalPages;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  console.log(data, "contactdata");
  let headers = [
    "User Name",
    "Email",
    "Phone",
    "Subject",
    "Message",
    "Date",
    "Actions",
    "Status"
  ];
  let searchQuery = $page.url.searchParams.get("search") || "";
  $page.url.searchParams.get("filter") || "unread";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ totalCount, contacts } = data);
  currentPage = parseInt($page.url.searchParams.get("page")) || 1;
  totalPages = isNaN(totalCount) ? 1 : Math.ceil(totalCount / 10);
  $$unsubscribe_page();
  return `<section class="container mx-auto p-3"><div class="mb-4 flex items-center bg-gray-200 justify-between p-4 rounded-md shadow-md"><h1 class="inline-flex text-2xl font-bold mr-5">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ic:baseline-contact-phone",
      class: "inline-block text-3xl bg-gray-50 rounded-md p-1 shadow-md"
    },
    {},
    {}
  )} <span class="pt-0.5 ml-2" data-svelte-h="svelte-tfnfdz">Contact Us List</span></h1> <div class="relative"><input type="text" placeholder="Search..." class="block border-gray-200 rounded-lg w-80 focus:ring-0 focus:border-primary-500 border-1 transition duration-300"${add_attribute("value", searchQuery, 0)}> <button class="${"absolute top-2.5 right-2 " + escape(searchQuery.length > 1 ? "" : "hidden", true)}">${validate_component(Icon, "Icon").$$render($$result, { icon: "charm:cross", class: "text-2xl" }, {}, {})}</button></div> <select class="block border-gray-300 px-2 rounded-md border-1 focus:ring-0 focus:border-primary-500 transition duration-300 shadow-sm"><option value="all" data-svelte-h="svelte-421o1o">All</option><option value="unread" data-svelte-h="svelte-pji9bi">Unread</option><option value="responded" data-svelte-h="svelte-rkcdku">Responded</option><option value="spam" data-svelte-h="svelte-tuglwu">Spam</option></select></div> ${`${data?.records?.length ? `<div class="w-full overflow-auto rounded-md shadow-md scroll-bar"><table class="w-full border-collapse text-sm"><thead><tr class="text-sm font-medium bg-gray-100 sticky top-0 whitespace-nowrap">${each(headers, (header) => {
    return `<th class="px-4 py-2">${escape(header)}</th>`;
  })}</tr></thead> <tbody class="text-xs">${each(data?.records, (item) => {
    return `<tr class="border-t-1 font-medium whitespace-nowrap"><td class="px-4 py-2">${escape(item.name || "-")}</td>  <td class="px-4 py-2">${escape(item.email)}</td> <td class="px-4 py-2">${escape(item.phone)}</td> <td class="px-4 py-2">${escape(item.subject)}</td> <td class="px-4 py-2">${escape(item.message.length > 30 ? item.message.slice(0, 30) + "..." : item.message)}</td> <td class="px-4 py-2">${escape(new Date(item.createdAt).toLocaleDateString("en-GB"))}</td> <td class="px-6 py-1"><button class="px-3 py-1 border-1 rounded border-gray-700 bg-gray-700 text-white hover:bg-white hover:text-gray-700 transition duration-300" data-svelte-h="svelte-1qncob7">View Details
								</button></td> <td class="px-4 py-1"><form action="?/status" method="POST"><input type="hidden" name="userId"${add_attribute("value", item._id, 0)}> <select class="rounded text-xs p-1.5 focus:ring-0 focus:border-primary-500 border-1 transition duration-300" name="status"><option value="unread" data-svelte-h="svelte-pji9bi">Unread</option><option value="responded" data-svelte-h="svelte-rkcdku">Responded</option><option value="spam" data-svelte-h="svelte-tuglwu">Spam</option></select> </form></td> </tr>`;
  })}</tbody></table></div> <div class="${"" + escape(totalCount < 10 ? "hidden" : "", true) + " px-5 flex justify-between items-center mb-3 mt-4"}"><button ${currentPage === 1 ? "disabled" : ""} class="px-5 py-1.5 bg-gray-700 border-1 disabled:bg-gray-200 disabled:border-gray-200 disabled:hover:text-white disabled:cursor-not-allowed border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition duration-300">Previous</button> <span>Page ${escape(currentPage)} of ${escape(totalPages)}</span> <button ${currentPage === totalPages ? "disabled" : ""} class="px-5 py-1.5 bg-gray-700 border-1 disabled:bg-gray-200 disabled:border-gray-200 disabled:hover:text-white disabled:cursor-not-allowed border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition duration-300">Next</button></div>` : `${!searchQuery.trim() ? `<div class="h-60 w-full pt-20 text-center text-gray-500" data-svelte-h="svelte-7yi070">No Data available</div>` : `<div class="h-60 w-full pt-20 text-center text-gray-500">No Data found for <span class="font-medium text-black">&quot;${escape(searchQuery)}&quot;</span></div>`}`}`}</section> ${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data, "aaaaaaaaaa");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(Contactadmin, "Contactadmin").$$render($$result, { data }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-2a_a8U5X.js.map
