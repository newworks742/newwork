import { c as create_ssr_component, v as validate_component, d as subscribe, a as add_attribute, b as each, e as escape } from './ssr-CjCjd7wL.js';
import { p as page } from './stores-BUIdY5jO.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { T as Toaster } from './Toaster-Bj36a-NJ.js';
import './Toaster.svelte_svelte_type_style_lang-Bw7PiNj0.js';
import { a as PUBLIC_COMPBUY_IMAGE_PATH } from './public-MGfKNYs-.js';
import { I as Icon } from './Icon-GgoLCHfK.js';
import './index-Brz-Ee1Z.js';
import './functions-DmKzDADE.js';

function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
function formatDate(dateString) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch (e) {
    console.error("Invalid date format:", dateString);
    return "";
  }
}
const Eventadmin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let records;
  let totalCount;
  let news;
  let currentPage;
  let totalPages;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let headers = [
    "Title",
    "Event Date",
    "Timing",
    "Short Description",
    "PreviewText",
    "Image",
    "Action"
  ];
  let searchQuery = $page.url.searchParams.get("search") || "";
  (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ records, totalCount, news } = data);
  currentPage = parseInt($page.url.searchParams.get("page")) || 1;
  totalPages = isNaN(totalCount) ? 1 : Math.ceil(totalCount / 10);
  $$unsubscribe_page();
  return `<section class="container mx-auto p-3"><div class="mb-4 flex items-center bg-gray-200 justify-between p-4 rounded-md shadow-lg"><h1 class="inline-flex text-2xl font-bold mr-5">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "flowbite:newspaper-solid",
      class: "inline-block text-4xl bg-gray-50 rounded-md p-1 shadow-md"
    },
    {},
    {}
  )} <span class="pt-0.5 ml-2" data-svelte-h="svelte-pnxgdi">Events List</span></h1> <div class="relative">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ri:search-line",
      class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
      width: "20",
      height: "20"
    },
    {},
    {}
  )} <input type="text" placeholder="Search by event Title..." class="max-w-2xl w-80 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-primary-500 px-8 py-2 pl-10 text-sm outline-none transition-all duration-200"${add_attribute("value", searchQuery, 0)}> ${searchQuery ? `<button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer rounded" style="color: #cb1919">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "oui:cross",
      width: "16",
      height: "16",
      class: "font-bold"
    },
    {},
    {}
  )}</button>` : ``}</div> <button class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition-all duration-300" data-svelte-h="svelte-1vdbw93">Add New Event</button> </div> ${`${news.records?.length && news.records.length > 0 ? `<div class="w-full overflow-auto rounded-md shadow-md scroll-bar"><table class="w-full border-collapse rounded text-sm"><thead><tr class="font-medium bg-gray-100 sticky top-0 whitespace-nowrap text-left">${each(headers, (header) => {
    return `<th class="px-4 py-2 text-center">${escape(header)}</th>`;
  })}</tr></thead> <tbody class="text-xs">${each(news.records, (item) => {
    return `<tr class="border-t border-gray-200 font-medium whitespace-nowrap"><td class="px-4 py-2 text-center">${escape(truncateText(item.title, 25))}</td> <td class="px-4 py-2 text-center">${escape(formatDate(item.startDate))} - ${escape(formatDate(item.endDate))}</td> <td class="px-4 py-2 text-center">${escape(item.startTime)} - ${escape(item.endTime)}</td> <td class="px-4 py-2 text-center">  <span class="text-gray-800 hover:underline cursor-pointer">${escape(truncateText(item?.shortDescription, 20))}</span> ${item?.shortDescription?.length > 20 ? `  <span class="text-blue-400 underline text-xs hover:text-blue-600 cursor-pointer whitespace-nowrap" data-svelte-h="svelte-1udggjx">Readmore
                      </span>` : ``}</td> <td class="px-4 py-2 text-center">${item?.previewText ? `<div class="flex items-center justify-between space-x-0 w-[200px]"><span class="truncate flex-1 overflow-hidden text-ellipsis whitespace-nowrap">${escape(truncateText(item.previewText.replace(/<[^>]*>/g, ""), 20))}</span>  ${item.previewText.length > 20 ? ` <span class="text-blue-400 underline text-xs hover:text-blue-600 cursor-pointer whitespace-nowrap" data-svelte-h="svelte-xhsia3">Readmore
                      </span>` : ``} </div>` : `<span data-svelte-h="svelte-1s4sarz">-</span>`}</td> <td class="px-4 py-2 text-center"><div class="flex flex-col items-center justify-center my-0.5"><img${add_attribute("src", `${PUBLIC_COMPBUY_IMAGE_PATH}/${item?.image}`, 0)}${add_attribute("alt", item?.title || "News image", 0)} class="h-10 w-10 rounded shadow mb-0.5">  </div></td> <td class="px-2 py-2 "><div class="flex items-center justify-around my-0.5"><button class="px-4 py-1 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 tra" data-svelte-h="svelte-r6ye3k">Edit</button> <button class="px-3.5 py-1 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700" data-svelte-h="svelte-11d7jid">Delete</button> </div></td> </tr>`;
  })}</tbody></table></div> ${totalPages > 1 ? `<div class="px-5 flex justify-between items-center mb-3 mt-4"><button ${currentPage === 1 ? "disabled" : ""} class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 disabled:bg-gray-200 disabled:border-gray-200">Previous</button> <span>Page ${escape(currentPage)} of ${escape(totalPages)}</span> <button ${currentPage === totalPages ? "disabled" : ""} class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 disabled:bg-gray-200 disabled:border-gray-200">Next</button></div>` : ``}` : `${news.records.length === 0 && searchQuery !== "" ? `<div class="h-60 w-full flex flex-col items-center justify-center border border-dashed rounded-md bg-gray-50 text-gray-500 shadow-inner">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:magnify-close",
      class: "w-12 h-12 text-gray-400 mb-3"
    },
    {},
    {}
  )} <h2 class="text-lg font-semibold" data-svelte-h="svelte-120pkky">No Results Found</h2> <p class="text-sm text-gray-400">No data found for <span class="font-medium text-black">&quot;${escape(searchQuery)}&quot;</span></p></div>` : `${news.records.length === 0 && !searchQuery ? `<div class="h-60 w-full flex flex-col items-center justify-center border border-dashed rounded-md bg-gray-50 text-gray-500 shadow-inner"><div class="mb-3">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:alert-circle-outline",
      class: "w-12 h-12 text-gray-400"
    },
    {},
    {}
  )}</div> <h2 class="text-lg font-semibold" data-svelte-h="svelte-o30z5i">No News Data Available</h2> </div>` : ``}`}`}`}</section> ${validate_component(Toaster, "Toaster").$$render(
    $$result,
    {
      position: "bottom-right",
      richColors: true
    },
    {},
    {}
  )} ${``} ${``} ${``} ${``} ${``} ${``} ${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(Eventadmin, "Newsadmin").$$render($$result, { data }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DEn-rPsu.js.map
