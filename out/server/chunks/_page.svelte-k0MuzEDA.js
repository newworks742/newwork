import { c as create_ssr_component, v as validate_component, d as subscribe, a as add_attribute, b as escape, e as each, t as null_to_empty } from './ssr-BN5qA9uw.js';
import { I as Icon } from './Icon-DA1KMwkX.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { p as page } from './stores-D7ZOzynx.js';
import './functions-DmKzDADE.js';

const css = {
  code: ".line-clamp-2.svelte-3w61u{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.line-clamp-3.svelte-3w61u{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.svelte-3w61u::-webkit-scrollbar{width:6px}.svelte-3w61u::-webkit-scrollbar-track{background:#f1f1f1;border-radius:3px}.svelte-3w61u::-webkit-scrollbar-thumb{background:#c1c1c1;border-radius:3px}.svelte-3w61u::-webkit-scrollbar-thumb:hover{background:#a8a8a8}",
  map: `{"version":3,"file":"Newshome.svelte","sources":["Newshome.svelte"],"sourcesContent":["<script>\\r\\n\\timport Icon from '@iconify/svelte';\\r\\n\\timport { goto } from '$app/navigation';\\r\\n\\timport { page } from '$app/stores';\\r\\n\\timport { browser } from '$app/environment';\\r\\n\\t\\r\\n\\texport let data;\\r\\nlet PUBLIC_COMPBUY_IMAGE_PATH = \\"Digitoad\\"\\r\\n\\tlet records = [];\\r\\n\\tlet totalCount = 0;\\r\\n\\tlet filteredRecords = [];\\r\\n\\r\\n\\t$: if (data) {\\r\\n\\t\\tif (!searchQuery || searchQuery.trim().length === 0) {\\r\\n\\t\\t\\t({ records, totalCount } = data);\\r\\n\\t\\t} else {\\r\\n\\t\\t\\trecords = filteredRecords;\\r\\n\\t\\t\\ttotalCount = filteredRecords?.length;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tlet currentPage = parseInt($page.url.searchParams.get('page')) || 1;\\r\\n\\tlet searchQuery = $page.url.searchParams.get('search') || '';\\r\\n\\t\\r\\n\\tlet timeout;\\r\\n\\t\\r\\n\\tconst DOTS = '...';\\r\\n\\tconst VISIBLE_PAGES = 5;\\r\\n\\r\\n\\t$: totalPages = isNaN(totalCount) ? 1 : Math.ceil(totalCount / 12);\\r\\n\\r\\n\\t$: {\\r\\n\\t\\tif (data && data.records) {\\r\\n\\t\\t\\tif (searchQuery && searchQuery.trim().length > 0) {\\r\\n\\t\\t\\t\\tconst query = searchQuery.toLowerCase().trim();\\r\\n\\t\\t\\t\\tfilteredRecords = data.records.filter(item => {\\r\\n\\t\\t\\t\\t\\tconst titleMatch = item.title && item.title.toLowerCase().includes(query);\\r\\n\\r\\n\\t\\t\\t\\t\\tlet keywordMatch = false;\\r\\n\\t\\t\\t\\t\\tif (item.Keyword) {\\r\\n\\t\\t\\t\\t\\t\\tif (typeof item.Keyword === 'string') {\\r\\n\\t\\t\\t\\t\\t\\t\\tconst keywords = item.Keyword.split(',').map(k => k.trim().toLowerCase());\\r\\n\\t\\t\\t\\t\\t\\t\\tkeywordMatch = keywords.some(keyword => keyword.includes(query));\\r\\n\\t\\t\\t\\t\\t\\t} else if (Array.isArray(item.Keyword)) {\\r\\n\\t\\t\\t\\t\\t\\t\\tkeywordMatch = item.Keyword.some(keyword => \\r\\n\\t\\t\\t\\t\\t\\t\\t\\tkeyword.toLowerCase().includes(query)\\r\\n\\t\\t\\t\\t\\t\\t\\t);\\r\\n\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t}\\r\\n\\r\\n\\t\\t\\t\\t\\tconst previewMatch = item.previewText && \\r\\n\\t\\t\\t\\t\\t\\tstripHtml(item.previewText).toLowerCase().includes(query);\\r\\n\\r\\n\\t\\t\\t\\t\\treturn titleMatch || keywordMatch || previewMatch;\\r\\n\\t\\t\\t\\t});\\r\\n\\t\\t\\t} else {\\r\\n\\t\\t\\t\\tfilteredRecords = data?.records || [];\\r\\n\\t\\t\\t}\\r\\n\\t\\t} else {\\r\\n\\t\\t\\tfilteredRecords = [];\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tconst handleSearch = (e) => {\\r\\n\\t\\tclearTimeout(timeout);\\r\\n\\t\\ttimeout = setTimeout(() => {\\r\\n\\t\\t\\tconst query = searchQuery.trim();\\r\\n\\t\\t\\tconst newUrl = new URL(window.location.href);\\r\\n\\t\\t\\tnewUrl.searchParams.delete('page');\\r\\n\\t\\t\\tnewUrl.searchParams.delete('filter');\\r\\n\\r\\n\\t\\t\\tif (query.length > 0) {\\r\\n\\t\\t\\t\\tnewUrl.searchParams.set('search', query);\\r\\n\\t\\t\\t} else {\\r\\n\\t\\t\\t\\tnewUrl.searchParams.delete('search');\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\tgoto(newUrl.toString(), {\\r\\n\\t\\t\\t\\tinvalidateAll: true,\\r\\n\\t\\t\\t\\treplaceState: true,\\r\\n\\t\\t\\t\\tkeepfocus: true,\\r\\n\\t\\t\\t\\tnoScroll: true\\r\\n\\t\\t\\t});\\r\\n\\t\\t}, 800);\\r\\n\\t};\\r\\n\\r\\n\\tconst cancelSearch = () => {\\r\\n\\t\\tconst newUrl = new URL(window.location.href);\\r\\n\\t\\tnewUrl.searchParams.delete('search');\\r\\n\\t\\tnewUrl.searchParams.delete('page');\\r\\n\\t  searchQuery = '';\\r\\n\\t\\tgoto(newUrl.toString(), {\\r\\n\\t\\t\\treplaceState: true,\\r\\n\\t\\t\\tkeepfocus: true,\\r\\n\\t\\t\\tnoScroll: true,\\r\\n\\t\\t\\tinvalidateAll: true\\r\\n\\t\\t});\\r\\n\\t};\\r\\n\\r\\n\\tconst changePage = (page) => {\\r\\n\\t\\tcurrentPage = page;\\r\\n\\t\\tconst newUrl = new URL(window.location.href);\\r\\n\\t\\tnewUrl.searchParams.set('page', currentPage);\\r\\n\\r\\n\\t\\tif (currentPage === 1) {\\r\\n\\t\\t\\tnewUrl.searchParams.delete('page');\\r\\n\\t\\t} else {\\r\\n\\t\\t\\tnewUrl.searchParams.set('page', currentPage);\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\tgoto(newUrl.toString(), {\\r\\n\\t\\treplaceState: true,\\r\\n\\t\\tkeepfocus: true,\\r\\n\\t\\tnoScroll: true  \\r\\n\\t\\t}).then(() => {\\r\\n\\t\\t\\tscrollToTop();\\r\\n\\t\\t});\\r\\n\\t};\\r\\n\\t\\r\\n\\tfunction scrollToTop() {\\r\\n\\t\\twindow.scrollTo({ top: 0, behavior: 'smooth' });\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction getPageRange(currentPageNum, totalPageCount) {\\r\\n\\t\\tconst totalPageNumbers = VISIBLE_PAGES;\\r\\n\\t\\t\\r\\n\\t\\tif (totalPageCount === 0) return [];\\r\\n\\t\\t\\r\\n\\t\\tif (totalPageNumbers >= totalPageCount) {\\r\\n\\t\\t\\treturn range(1, totalPageCount + 1);\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tconst leftSiblingIndex = Math.max(currentPageNum - Math.floor(VISIBLE_PAGES / 2), 1);\\r\\n\\t\\tconst rightSiblingIndex = Math.min(leftSiblingIndex + VISIBLE_PAGES - 1, totalPageCount);\\r\\n\\t\\t\\r\\n\\t\\tconst adjustedLeftSiblingIndex = Math.max(rightSiblingIndex - VISIBLE_PAGES + 1, 1);\\r\\n\\t  \\r\\n\\t\\tconst shouldShowLeftDots = adjustedLeftSiblingIndex > 2;\\r\\n\\t\\tconst shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;\\r\\n\\t\\t\\r\\n\\t\\tif (!shouldShowLeftDots && shouldShowRightDots) {\\r\\n\\t\\t\\tconst leftItemCount = VISIBLE_PAGES - 1;\\r\\n\\t\\t\\tconst leftRange = range(1, leftItemCount + 1);\\r\\n\\t\\t\\treturn [...leftRange, DOTS, totalPageCount];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tif (shouldShowLeftDots && !shouldShowRightDots) {\\r\\n\\t\\t\\tconst rightItemCount = VISIBLE_PAGES - 1;\\r\\n\\t\\t\\tconst rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount + 1);\\r\\n\\t\\t\\treturn [1, DOTS, ...rightRange];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tif (shouldShowLeftDots && shouldShowRightDots) {\\r\\n\\t\\t\\tconst middleRange = range(adjustedLeftSiblingIndex, rightSiblingIndex + 1);\\r\\n\\t\\t\\treturn [1, DOTS, ...middleRange, DOTS, totalPageCount];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\treturn range(adjustedLeftSiblingIndex, rightSiblingIndex + 1);\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction range(start, end) {\\r\\n\\t\\tconst length = end - start;\\r\\n\\t\\treturn Array.from({ length }, (_, i) => start + i);\\r\\n\\t}\\r\\n\\r\\n\\t$: pageNumbers = getPageRange(currentPage, totalPages);\\r\\n\\t\\r\\n\\tfunction handleKeyDown(e) {\\r\\n\\t\\tif (e.key === 'ArrowLeft' && currentPage > 1) {\\r\\n\\t\\t\\tchangePage(currentPage - 1);\\r\\n\\t\\t} else if (e.key === 'ArrowRight' && currentPage < totalPages) {\\r\\n\\t\\t\\tchangePage(currentPage + 1);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction stripHtml(html) {\\r\\n\\t\\tif (!html) return '';\\r\\n\\t\\tif (typeof window === 'undefined') {\\r\\n\\t\\t\\treturn html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();\\r\\n\\t\\t}\\r\\n\\t\\tconst tempDiv = document.createElement('div');\\r\\n\\t\\ttempDiv.innerHTML = html;\\r\\n\\t\\treturn tempDiv.textContent || tempDiv.innerText || '';\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction truncateText(text, maxLength) {\\r\\n\\tif (!text) return '';\\r\\n\\t\\tif (typeof window === 'undefined') {\\r\\n\\t\\t\\tconst plainText = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();\\r\\n\\t\\t\\treturn plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;\\r\\n\\t\\t}\\r\\n\\t\\tconst plainText = stripHtml(text);\\r\\n\\t\\treturn plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;\\r\\n\\t}\\r\\n\\r\\n\\tfunction formatDate(dateString) {\\r\\n\\t\\tif (!dateString) return '';\\r\\n\\t\\ttry {\\r\\n\\t\\t\\treturn new Date(dateString).toLocaleDateString('en-US', {\\r\\n\\t\\t\\t\\tyear: 'numeric',\\r\\n\\t\\t\\t\\tmonth: 'long',\\r\\n\\t\\t\\t\\tday: 'numeric'\\r\\n\\t\\t\\t});\\r\\n\\t\\t} catch (e) {\\r\\n\\t\\t\\tconsole.error('Invalid date format:', dateString);\\r\\n\\t\\t\\treturn '';\\r\\n\\t\\t}\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<!-- Enhanced Container with Better Spacing -->\\r\\n<div class=\\"min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100\\">\\r\\n\\t<div class=\\"w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12\\">\\r\\n\\t\\t<!-- Enhanced Header Section -->\\r\\n\\t\\t<div class=\\"flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 lg:mb-12\\">\\r\\n\\t\\t\\t<div class=\\"space-y-2\\">\\r\\n\\t\\t\\t\\t<h1 class=\\"text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent\\">\\r\\n\\t\\t\\t\\t\\tEvents\\r\\n\\t\\t\\t\\t</h1>\\r\\n\\t\\t\\t\\t<p class=\\"text-gray-600 text-sm sm:text-base\\">Discover upcoming events and stay updated</p>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t\\t\\r\\n\\t\\t\\t<!-- Enhanced Search Box -->\\r\\n\\t\\t\\t<div class=\\"w-full lg:w-80 xl:w-96 relative group\\">\\r\\n\\t\\t\\t\\t<div class=\\"relative flex items-center\\">\\r\\n\\t\\t\\t\\t\\t<Icon \\r\\n\\t\\t\\t\\t\\t\\ticon=\\"ph:magnifying-glass\\" \\r\\n\\t\\t\\t\\t\\t\\tclass=\\"absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200\\" \\r\\n\\t\\t\\t\\t\\t\\twidth=\\"20\\" \\r\\n\\t\\t\\t\\t\\t\\theight=\\"20\\"\\r\\n\\t\\t\\t\\t\\t/>\\r\\n\\t\\t\\t\\t\\t<input\\r\\n\\t\\t\\t\\t\\t\\ttype=\\"text\\"\\r\\n\\t\\t\\t\\t\\t\\tplaceholder=\\"Search events by title or keywords...\\"\\r\\n\\t\\t\\t\\t\\t\\tbind:value={searchQuery}\\r\\n\\t\\t\\t\\t\\t\\ton:input={(e) => handleSearch(e)}\\r\\n\\t\\t\\t\\t\\t\\ton:keydown={(e) => {\\r\\n\\t\\t\\t\\t\\t\\t\\tif (e.key === 'Enter') {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\thandleSearch(e);\\r\\n\\t\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t\\t}}\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl text-sm bg-white/80 backdrop-blur-sm outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-400\\"\\r\\n\\t\\t\\t\\t\\t\\taria-label=\\"Search Events by title or keywords\\"\\r\\n\\t\\t\\t\\t\\t/>\\r\\n\\t\\t\\t\\t\\t{#if searchQuery}\\r\\n\\t\\t\\t\\t\\t\\t<button \\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-red-100 hover:text-red-600 transition-all duration-200 group\\"\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"Clear search\\" \\r\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"button\\" \\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={cancelSearch}\\r\\n\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:x-bold\\" class=\\"text-sm text-gray-500 group-hover:text-red-600\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\r\\n\\t\\t<!-- Empty States with Enhanced Design -->\\r\\n\\t\\t{#if !records || (records?.length === 0 && !searchQuery)}\\r\\n\\t\\t\\t<div class=\\"mt-12 flex flex-col items-center bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 justify-center p-12 text-center max-w-2xl mx-auto\\">\\r\\n\\t\\t\\t\\t<div class=\\"w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6\\">\\r\\n\\t\\t\\t\\t\\t<Icon icon=\\"ph:calendar-blank\\" width=\\"48\\" height=\\"48\\" class=\\"text-primary-600\\" />\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<h3 class=\\"text-2xl sm:text-3xl font-bold text-gray-800 mb-3\\">No Events Available</h3>\\r\\n\\t\\t\\t\\t<p class=\\"text-gray-600 max-w-md text-base sm:text-lg leading-relaxed\\">\\r\\n\\t\\t\\t\\t\\tThere are currently no events to display. Please check back later for exciting upcoming events.\\r\\n\\t\\t\\t\\t</p>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t{:else if searchQuery && records.length === 0}\\r\\n\\t\\t\\t<div class=\\"mt-12 flex flex-col items-center bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 justify-center p-12 text-center max-w-2xl mx-auto\\">\\r\\n\\t\\t\\t\\t<div class=\\"w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-6\\">\\r\\n\\t\\t\\t\\t\\t<Icon icon=\\"ph:magnifying-glass\\" width=\\"48\\" height=\\"48\\" class=\\"text-orange-600\\" />\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<h3 class=\\"text-2xl sm:text-3xl font-bold text-gray-800 mb-3\\">No Results Found</h3>\\r\\n\\t\\t\\t\\t<p class=\\"text-gray-600 max-w-md text-base leading-relaxed mb-4\\">\\r\\n\\t\\t\\t\\t\\tWe couldn't find any events matching <span class=\\"font-semibold text-gray-800\\">\\"{searchQuery}\\"</span>. Try a different search term or explore all events.\\r\\n\\t\\t\\t\\t</p>\\r\\n\\t\\t\\t\\t<button \\r\\n\\t\\t\\t\\t\\tclass=\\"bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl\\" \\r\\n\\t\\t\\t\\t\\ton:click={cancelSearch}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\tClear Search\\r\\n\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t{:else}\\r\\n\\t\\t\\t<!-- Enhanced Events Grid -->\\r\\n\\t\\t\\t<div class=\\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 mb-16\\">\\r\\n\\t\\t\\t\\t{#each records as item (item._id || item.id)}\\r\\n\\t\\t\\t\\t\\t<a\\r\\n\\t\\t\\t\\t\\t\\thref={\`events/\${item.newsLink}\`}\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"group flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary-200 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2\\"\\r\\n\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t<!-- Enhanced Image Section -->\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<img\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tsrc={\`\${PUBLIC_COMPBUY_IMAGE_PATH}/part/\${item?.image}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\talt={item?.title || 'Event image'}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tloading=\\"lazy\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\ton:error={(e) => {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\te.target.src = '/DT.png';\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\r\\n\\t\\t\\t\\t\\t\\t\\t/>\\r\\n\\t\\t\\t\\t\\t\\t\\t<!-- Gradient Overlay -->\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300\\"></div>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t\\t<!-- Date Badge -->\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center space-x-2\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:calendar-dots\\" class=\\"text-primary-500\\" width=\\"16\\" height=\\"16\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"text-xs font-semibold text-gray-700\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</span>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t\\t\\t\\t<!-- Enhanced Content Section -->\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"flex flex-col flex-grow p-6\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<h2 class=\\"font-bold text-xl sm:text-2xl mb-4 line-clamp-2 text-gray-800 group-hover:text-primary-600 transition-colors duration-300 leading-tight\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{item?.title || 'Untitled Event'}\\r\\n\\t\\t\\t\\t\\t\\t\\t</h2>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t\\t<p class=\\"text-gray-600 mb-6 flex-grow line-clamp-3 text-sm sm:text-base leading-relaxed\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if browser}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{truncateText(item?.previewText || 'No description available', 120)}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t\\t\\t</p>\\r\\n\\r\\n\\t\\t\\t\\t\\t\\t\\t<!-- Enhanced Date Range -->\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"mt-auto pt-4 border-t border-gray-200/70\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center justify-between\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center text-sm text-gray-500\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:clock\\" class=\\"mr-2 text-primary-500\\" width=\\"16\\" height=\\"16\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"font-medium\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{formatDate(item.startDate)}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if item.endDate && item.endDate !== item.startDate}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t- {formatDate(item.endDate)}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</span>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:arrow-right\\" class=\\"text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0\\" width=\\"18\\" height=\\"18\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t</a>\\r\\n\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t<!-- Enhanced Pagination -->\\r\\n\\t\\t\\t{#if totalPages > 1}\\r\\n\\t\\t\\t\\t<!-- Mobile Pagination -->\\r\\n\\t\\t\\t\\t<div class=\\"flex justify-between items-center mb-6 md:hidden bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100\\">\\r\\n\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage - 1)}\\r\\n\\t\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none\\"\\r\\n\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-left\\" class=\\"mr-2\\" width=\\"16\\" height=\\"16\\" />\\r\\n\\t\\t\\t\\t\\t\\tPrevious\\r\\n\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col items-center\\">\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"text-sm text-gray-600 mb-1\\">Page</span>\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"font-bold text-lg text-gray-800\\">{currentPage} of {totalPages}</span>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage + 1)}\\r\\n\\t\\t\\t\\t\\t\\tdisabled={currentPage === totalPages}\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none\\"\\r\\n\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\tNext\\r\\n\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-right\\" class=\\"ml-2\\" width=\\"16\\" height=\\"16\\" />\\r\\n\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t\\t<!-- Desktop Pagination -->\\r\\n\\t\\t\\t\\t<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->\\r\\n\\t\\t\\t\\t<nav\\r\\n\\t\\t\\t\\t\\taria-label=\\"Pagination\\"\\r\\n\\t\\t\\t\\t\\tclass=\\"hidden md:flex justify-center\\"\\r\\n\\t\\t\\t\\t\\ton:keydown={handleKeyDown}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t<div class=\\"flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100\\">\\r\\n\\t\\t\\t\\t\\t\\t<!-- First Page -->\\r\\n\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(1)}\\r\\n\\t\\t\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"First page\\"\\r\\n\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-double-left-bold\\" class=\\"w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t<!-- Previous Page -->\\r\\n\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage - 1)}\\r\\n\\t\\t\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"Previous page\\"\\r\\n\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-left-bold\\" class=\\"w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t<!-- Page Numbers -->\\r\\n\\t\\t\\t\\t\\t\\t{#each pageNumbers as page}\\r\\n\\t\\t\\t\\t\\t\\t\\t{#if page === DOTS}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"px-3 py-2 text-gray-500 text-sm font-medium\\">{DOTS}</span>\\r\\n\\t\\t\\t\\t\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(page)}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass={\`flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg text-sm font-medium shadow-sm border transition-all duration-300 \${\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tpage === currentPage\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500 shadow-lg'\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'bg-white/80 text-gray-800 border-gray-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg'\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tdisabled={page === currentPage}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\taria-label={\`Page \${page}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\taria-current={page === currentPage ? 'page' : undefined}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{page}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t<!-- Next Page -->\\r\\n\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage + 1)}\\r\\n\\t\\t\\t\\t\\t\\t\\tdisabled={currentPage >= totalPages}\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"Next page\\"\\r\\n\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-right-bold\\" class=\\"w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t<!-- Last Page -->\\r\\n\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(totalPages)}\\r\\n\\t\\t\\t\\t\\t\\t\\tdisabled={currentPage >= totalPages}\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"Last page\\"\\r\\n\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-double-right-bold\\" class=\\"w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t</nav>\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t{/if}\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.line-clamp-2 {\\r\\n\\t\\tdisplay: -webkit-box;\\r\\n\\t\\t-webkit-line-clamp: 2;\\r\\n\\t\\t-webkit-box-orient: vertical;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n\\t\\r\\n\\t.line-clamp-3 {\\r\\n\\t\\tdisplay: -webkit-box;\\r\\n\\t\\t-webkit-line-clamp: 3;\\r\\n\\t\\t-webkit-box-orient: vertical;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n\\t\\r\\n\\r\\n\\t\\r\\n\\t/* Custom scrollbar for webkit browsers */\\r\\n\\t::-webkit-scrollbar {\\r\\n\\t\\twidth: 6px;\\r\\n\\t}\\r\\n\\t\\r\\n\\t::-webkit-scrollbar-track {\\r\\n\\t\\tbackground: #f1f1f1;\\r\\n\\t\\tborder-radius: 3px;\\r\\n\\t}\\r\\n\\t\\r\\n\\t::-webkit-scrollbar-thumb {\\r\\n\\t\\tbackground: #c1c1c1;\\r\\n\\t\\tborder-radius: 3px;\\r\\n\\t}\\r\\n\\t\\r\\n\\t::-webkit-scrollbar-thumb:hover {\\r\\n\\t\\tbackground: #a8a8a8;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAqcC,0BAAc,CACb,OAAO,CAAE,WAAW,CACpB,kBAAkB,CAAE,CAAC,CACrB,kBAAkB,CAAE,QAAQ,CAC5B,QAAQ,CAAE,MACX,CAEA,0BAAc,CACb,OAAO,CAAE,WAAW,CACpB,kBAAkB,CAAE,CAAC,CACrB,kBAAkB,CAAE,QAAQ,CAC5B,QAAQ,CAAE,MACX,cAKA,mBAAoB,CACnB,KAAK,CAAE,GACR,cAEA,yBAA0B,CACzB,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAChB,cAEA,yBAA0B,CACzB,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAChB,cAEA,yBAAyB,MAAO,CAC/B,UAAU,CAAE,OACb"}`
};
let PUBLIC_COMPBUY_IMAGE_PATH = "Digitoad";
const DOTS = "...";
const VISIBLE_PAGES = 5;
function getPageRange(currentPageNum, totalPageCount) {
  const totalPageNumbers = VISIBLE_PAGES;
  if (totalPageCount === 0) return [];
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount + 1);
  }
  const leftSiblingIndex = Math.max(currentPageNum - Math.floor(VISIBLE_PAGES / 2), 1);
  const rightSiblingIndex = Math.min(leftSiblingIndex + VISIBLE_PAGES - 1, totalPageCount);
  const adjustedLeftSiblingIndex = Math.max(rightSiblingIndex - VISIBLE_PAGES + 1, 1);
  const shouldShowLeftDots = adjustedLeftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = VISIBLE_PAGES - 1;
    const leftRange = range(1, leftItemCount + 1);
    return [...leftRange, DOTS, totalPageCount];
  }
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = VISIBLE_PAGES - 1;
    const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount + 1);
    return [1, DOTS, ...rightRange];
  }
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(adjustedLeftSiblingIndex, rightSiblingIndex + 1);
    return [1, DOTS, ...middleRange, DOTS, totalPageCount];
  }
  return range(adjustedLeftSiblingIndex, rightSiblingIndex + 1);
}
function range(start, end) {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}
function stripHtml(html) {
  if (!html) return "";
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
  }
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
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
const Newshome = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalPages;
  let pageNumbers;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let records = [];
  let totalCount = 0;
  let filteredRecords = [];
  let currentPage = parseInt($page.url.searchParams.get("page")) || 1;
  let searchQuery = $page.url.searchParams.get("search") || "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  {
    {
      if (data && data.records) {
        if (searchQuery && searchQuery.trim().length > 0) {
          const query = searchQuery.toLowerCase().trim();
          filteredRecords = data.records.filter((item) => {
            const titleMatch = item.title && item.title.toLowerCase().includes(query);
            let keywordMatch = false;
            if (item.Keyword) {
              if (typeof item.Keyword === "string") {
                const keywords = item.Keyword.split(",").map((k) => k.trim().toLowerCase());
                keywordMatch = keywords.some((keyword) => keyword.includes(query));
              } else if (Array.isArray(item.Keyword)) {
                keywordMatch = item.Keyword.some((keyword) => keyword.toLowerCase().includes(query));
              }
            }
            const previewMatch = item.previewText && stripHtml(item.previewText).toLowerCase().includes(query);
            return titleMatch || keywordMatch || previewMatch;
          });
        } else {
          filteredRecords = data?.records || [];
        }
      } else {
        filteredRecords = [];
      }
    }
  }
  {
    if (data) {
      if (!searchQuery || searchQuery.trim().length === 0) {
        ({ records, totalCount } = data);
      } else {
        records = filteredRecords;
        totalCount = filteredRecords?.length;
      }
    }
  }
  totalPages = isNaN(totalCount) ? 1 : Math.ceil(totalCount / 12);
  pageNumbers = getPageRange(currentPage, totalPages);
  $$unsubscribe_page();
  return ` <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 svelte-3w61u"><div class="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 svelte-3w61u"> <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 lg:mb-12 svelte-3w61u"><div class="space-y-2 svelte-3w61u" data-svelte-h="svelte-dche31"><h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent svelte-3w61u">Events</h1> <p class="text-gray-600 text-sm sm:text-base svelte-3w61u">Discover upcoming events and stay updated</p></div>  <div class="w-full lg:w-80 xl:w-96 relative group svelte-3w61u"><div class="relative flex items-center svelte-3w61u">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:magnifying-glass",
      class: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200",
      width: "20",
      height: "20"
    },
    {},
    {}
  )} <input type="text" placeholder="Search events by title or keywords..." class="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl text-sm bg-white/80 backdrop-blur-sm outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-400 svelte-3w61u" aria-label="Search Events by title or keywords"${add_attribute("value", searchQuery, 0)}> ${searchQuery ? `<button class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-red-100 hover:text-red-600 transition-all duration-200 group svelte-3w61u" aria-label="Clear search" type="button">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:x-bold",
      class: "text-sm text-gray-500 group-hover:text-red-600"
    },
    {},
    {}
  )}</button>` : ``}</div></div></div>  ${!records || records?.length === 0 && !searchQuery ? `<div class="mt-12 flex flex-col items-center bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 justify-center p-12 text-center max-w-2xl mx-auto svelte-3w61u"><div class="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6 svelte-3w61u">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:calendar-blank",
      width: "48",
      height: "48",
      class: "text-primary-600"
    },
    {},
    {}
  )}</div> <h3 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 svelte-3w61u" data-svelte-h="svelte-1wqcph">No Events Available</h3> <p class="text-gray-600 max-w-md text-base sm:text-lg leading-relaxed svelte-3w61u" data-svelte-h="svelte-f7sreb">There are currently no events to display. Please check back later for exciting upcoming events.</p></div>` : `${searchQuery && records.length === 0 ? `<div class="mt-12 flex flex-col items-center bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 justify-center p-12 text-center max-w-2xl mx-auto svelte-3w61u"><div class="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-6 svelte-3w61u">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:magnifying-glass",
      width: "48",
      height: "48",
      class: "text-orange-600"
    },
    {},
    {}
  )}</div> <h3 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 svelte-3w61u" data-svelte-h="svelte-1ytbwr7">No Results Found</h3> <p class="text-gray-600 max-w-md text-base leading-relaxed mb-4 svelte-3w61u">We couldn&#39;t find any events matching <span class="font-semibold text-gray-800 svelte-3w61u">&quot;${escape(searchQuery)}&quot;</span>. Try a different search term or explore all events.</p> <button class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl svelte-3w61u" data-svelte-h="svelte-1j50ake">Clear Search</button></div>` : ` <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 mb-16 svelte-3w61u">${each(records, (item) => {
    return `<a${add_attribute("href", `events/${item.newsLink}`, 0)} class="group flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary-200 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 svelte-3w61u"> <div class="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 svelte-3w61u"><img${add_attribute("src", `${PUBLIC_COMPBUY_IMAGE_PATH}/part/${item?.image}`, 0)}${add_attribute("alt", item?.title || "Event image", 0)} class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 svelte-3w61u" loading="lazy">  <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 svelte-3w61u"></div>  <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg svelte-3w61u"><div class="flex items-center space-x-2 svelte-3w61u">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ph:calendar-dots",
        class: "text-primary-500",
        width: "16",
        height: "16"
      },
      {},
      {}
    )} <span class="text-xs font-semibold text-gray-700 svelte-3w61u">${escape(new Date(item.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }))} </span></div> </div></div>  <div class="flex flex-col flex-grow p-6 svelte-3w61u"><h2 class="font-bold text-xl sm:text-2xl mb-4 line-clamp-2 text-gray-800 group-hover:text-primary-600 transition-colors duration-300 leading-tight svelte-3w61u">${escape(item?.title || "Untitled Event")}</h2> <p class="text-gray-600 mb-6 flex-grow line-clamp-3 text-sm sm:text-base leading-relaxed svelte-3w61u">${``}</p>  <div class="mt-auto pt-4 border-t border-gray-200/70 svelte-3w61u"><div class="flex items-center justify-between svelte-3w61u"><div class="flex items-center text-sm text-gray-500 svelte-3w61u">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ph:clock",
        class: "mr-2 text-primary-500",
        width: "16",
        height: "16"
      },
      {},
      {}
    )} <span class="font-medium svelte-3w61u">${escape(formatDate(item.startDate))} ${item.endDate && item.endDate !== item.startDate ? `- ${escape(formatDate(item.endDate))}` : ``} </span></div> ${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ph:arrow-right",
        class: "text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0",
        width: "18",
        height: "18"
      },
      {},
      {}
    )}</div> </div></div> </a>`;
  })}</div>  ${totalPages > 1 ? ` <div class="flex justify-between items-center mb-6 md:hidden bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 svelte-3w61u"><button ${currentPage === 1 ? "disabled" : ""} class="flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none svelte-3w61u">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-left",
      class: "mr-2",
      width: "16",
      height: "16"
    },
    {},
    {}
  )}
						Previous</button> <div class="flex flex-col items-center svelte-3w61u"><span class="text-sm text-gray-600 mb-1 svelte-3w61u" data-svelte-h="svelte-dzqwvz">Page</span> <span class="font-bold text-lg text-gray-800 svelte-3w61u">${escape(currentPage)} of ${escape(totalPages)}</span></div> <button ${currentPage === totalPages ? "disabled" : ""} class="flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none svelte-3w61u">Next
						${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-right",
      class: "ml-2",
      width: "16",
      height: "16"
    },
    {},
    {}
  )}</button></div>   <nav aria-label="Pagination" class="hidden md:flex justify-center svelte-3w61u"><div class="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100 svelte-3w61u"> <button class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700 svelte-3w61u" ${currentPage === 1 ? "disabled" : ""} aria-label="First page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-double-left-bold",
      class: "w-4 h-4"
    },
    {},
    {}
  )}</button>  <button class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700 svelte-3w61u" ${currentPage === 1 ? "disabled" : ""} aria-label="Previous page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-left-bold",
      class: "w-4 h-4"
    },
    {},
    {}
  )}</button>  ${each(pageNumbers, (page2) => {
    return `${page2 === DOTS ? `<span class="px-3 py-2 text-gray-500 text-sm font-medium svelte-3w61u">${escape(DOTS)}</span>` : `<button class="${escape(
      null_to_empty(`flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg text-sm font-medium shadow-sm border transition-all duration-300 ${page2 === currentPage ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500 shadow-lg" : "bg-white/80 text-gray-800 border-gray-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg"}`),
      true
    ) + " svelte-3w61u"}" ${page2 === currentPage ? "disabled" : ""}${add_attribute("aria-label", `Page ${page2}`, 0)}${add_attribute("aria-current", page2 === currentPage ? "page" : void 0, 0)}>${escape(page2)} </button>`}`;
  })}  <button class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700 svelte-3w61u" ${currentPage >= totalPages ? "disabled" : ""} aria-label="Next page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-right-bold",
      class: "w-4 h-4"
    },
    {},
    {}
  )}</button>  <button class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700 svelte-3w61u" ${currentPage >= totalPages ? "disabled" : ""} aria-label="Last page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-double-right-bold",
      class: "w-4 h-4"
    },
    {},
    {}
  )}</button></div></nav>` : ``}`}`}</div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { firstComponent, secondComponent } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1fr704y_START -->${$$result.title = `<title>Digitoad | Events page</title>`, ""}<meta name="description" content=""><!-- HEAD_svelte-1fr704y_END -->`, ""} <div>${validate_component(Newshome, "Event").$$render($$result, { data }, {}, {})}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-k0MuzEDA.js.map
