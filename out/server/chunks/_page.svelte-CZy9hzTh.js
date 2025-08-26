import { c as create_ssr_component, v as validate_component, d as subscribe, e as escape, b as each, a as add_attribute, t as null_to_empty } from './ssr-CjCjd7wL.js';
import { I as Icon } from './Icon-GgoLCHfK.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { p as page } from './stores-BUIdY5jO.js';
import './functions-DmKzDADE.js';

const css = {
  code: "@keyframes svelte-1nhooh4-float-left{0%,100%{transform:translateZ(-20px) scale(0.95) rotate(-2deg)}50%{transform:translateZ(20px) scale(1.05) rotate(2deg)}}@keyframes svelte-1nhooh4-float-right{0%,100%{transform:translateZ(-20px) scale(0.95) rotate(2deg)}50%{transform:translateZ(20px) scale(1.05) rotate(-2deg)}}@keyframes svelte-1nhooh4-pulse-glow{0%,100%{filter:brightness(1) saturate(1)}50%{filter:brightness(1.1) saturate(1.2)}}.animate-float-left.svelte-1nhooh4.svelte-1nhooh4{animation:svelte-1nhooh4-float-left 4s ease-in-out infinite, svelte-1nhooh4-pulse-glow 3s ease-in-out infinite}.animate-float-right.svelte-1nhooh4.svelte-1nhooh4{animation:svelte-1nhooh4-float-right 4s ease-in-out infinite, svelte-1nhooh4-pulse-glow 3s ease-in-out infinite}.news-card.svelte-1nhooh4:hover .animate-float-left.svelte-1nhooh4,.news-card.svelte-1nhooh4:hover .animate-float-right.svelte-1nhooh4{animation:none;transform:none;filter:none;transition:all 0.3s ease}.news-card.svelte-1nhooh4:hover .news-image.svelte-1nhooh4{transform:scale(1.05)}.news-image.svelte-1nhooh4.svelte-1nhooh4{transition:transform 0.3s ease}",
  map: `{"version":3,"file":"Products.svelte","sources":["Products.svelte"],"sourcesContent":["<script>\\r\\n\\timport Icon from '@iconify/svelte';\\r\\n\\timport { PUBLIC_COMPBUY_IMAGE_PATH } from '$env/static/public';\\r\\n\\timport { goto } from '$app/navigation';\\r\\n\\timport { page } from '$app/stores';\\r\\n\\timport { browser } from '$app/environment';\\r\\n\\t\\r\\n\\texport let data;\\r\\n\\tconsole.log(data,'<--News data')\\r\\n\\r\\n\\tlet records = [];\\r\\n\\tlet totalCount = 0;\\r\\n\\tlet filteredRecords = [];\\r\\n\\r\\n\\t$: if (data) {\\r\\n\\t\\tif (!searchQuery || searchQuery.trim().length === 0) {\\r\\n\\t\\t\\t({ records, totalCount } = data);\\r\\n\\t\\t} else {\\r\\n\\t\\t\\trecords = filteredRecords;\\r\\n\\t\\t\\ttotalCount = filteredRecords?.length;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tlet currentPage = parseInt($page.url.searchParams.get('page')) || 1;\\r\\n\\tlet searchQuery = $page.url.searchParams.get('search') || '';\\r\\n\\t\\r\\n\\tlet timeout;\\r\\n\\t\\r\\n\\tconst DOTS = '...';\\r\\n\\tconst VISIBLE_PAGES = 5;\\r\\n\\r\\n\\t$: totalPages = isNaN(totalCount) ? 1 : Math.ceil(totalCount / 12);\\r\\n\\r\\n\\t$: {\\r\\n\\t\\tif (data && data.records) {\\r\\n\\t\\t\\tif (searchQuery && searchQuery.trim().length > 0) {\\r\\n\\t\\t\\t\\tconst query = searchQuery.toLowerCase().trim();\\r\\n\\t\\t\\t\\tfilteredRecords = data.records.filter(item => {\\r\\n\\t\\t\\t\\t\\tconst titleMatch = item.title && item.title.toLowerCase().includes(query);\\r\\n\\r\\n\\t\\t\\t\\t\\tlet keywordMatch = false;\\r\\n\\t\\t\\t\\t\\tif (item.Keyword) {\\r\\n\\t\\t\\t\\t\\t\\tif (typeof item.Keyword === 'string') {\\r\\n\\t\\t\\t\\t\\t\\t\\t// Split by comma and check each keyword\\r\\n\\t\\t\\t\\t\\t\\t\\tconst keywords = item.Keyword.split(',').map(k => k.trim().toLowerCase());\\r\\n\\t\\t\\t\\t\\t\\t\\tkeywordMatch = keywords.some(keyword => keyword.includes(query));\\r\\n\\t\\t\\t\\t\\t\\t} else if (Array.isArray(item.Keyword)) {\\r\\n\\t\\t\\t\\t\\t\\t\\tkeywordMatch = item.Keyword.some(keyword => \\r\\n\\t\\t\\t\\t\\t\\t\\t\\tkeyword.toLowerCase().includes(query)\\r\\n\\t\\t\\t\\t\\t\\t\\t);\\r\\n\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t}\\r\\n\\r\\n\\t\\t\\t\\t\\tconst previewMatch = item.previewText && \\r\\n\\t\\t\\t\\t\\t\\tstripHtml(item.previewText).toLowerCase().includes(query);\\r\\n\\r\\n\\t\\t\\t\\t\\treturn titleMatch || keywordMatch || previewMatch;\\r\\n\\t\\t\\t\\t});\\r\\n\\t\\t\\t} else {\\r\\n\\t\\t\\t\\tfilteredRecords = data?.records || [];\\r\\n\\t\\t\\t}\\r\\n\\t\\t} else {\\r\\n\\t\\t\\tfilteredRecords = [];\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\r\\n\\r\\n\\tconst changePage = (page) => {\\r\\n\\t\\tcurrentPage = page;\\r\\n\\t\\tconst newUrl = new URL(window.location.href);\\r\\n\\t\\tnewUrl.searchParams.set('page', currentPage);\\r\\n\\r\\n\\t\\tif (currentPage === 1) {\\r\\n\\t\\t\\tnewUrl.searchParams.delete('page');\\r\\n\\t\\t} else {\\r\\n\\t\\t\\tnewUrl.searchParams.set('page', currentPage);\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\tgoto(newUrl.toString(), {\\r\\n\\t\\treplaceState: true,\\r\\n\\t\\tkeepfocus: true,\\r\\n\\t\\tnoScroll: true  \\r\\n\\t\\t}).then(() => {\\r\\n\\t\\t\\tscrollToTop();\\r\\n\\t\\t});\\r\\n\\t};\\r\\n\\t\\r\\n\\tfunction scrollToTop() {\\r\\n\\t\\twindow.scrollTo({ top: 0, behavior: 'smooth' });\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction getPageRange(currentPageNum, totalPageCount) {\\r\\n\\t\\tconst totalPageNumbers = VISIBLE_PAGES;\\r\\n\\t\\t\\r\\n\\t\\tif (totalPageCount === 0) return [];\\r\\n\\t\\t\\r\\n\\t\\tif (totalPageNumbers >= totalPageCount) {\\r\\n\\t\\t\\treturn range(1, totalPageCount + 1);\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tconst leftSiblingIndex = Math.max(currentPageNum - Math.floor(VISIBLE_PAGES / 2), 1);\\r\\n\\t\\tconst rightSiblingIndex = Math.min(leftSiblingIndex + VISIBLE_PAGES - 1, totalPageCount);\\r\\n\\t\\t\\r\\n\\t\\tconst adjustedLeftSiblingIndex = Math.max(rightSiblingIndex - VISIBLE_PAGES + 1, 1);\\r\\n\\t  \\r\\n\\t\\tconst shouldShowLeftDots = adjustedLeftSiblingIndex > 2;\\r\\n\\t\\tconst shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;\\r\\n\\t\\t\\r\\n\\t\\tif (!shouldShowLeftDots && shouldShowRightDots) {\\r\\n\\t\\t\\tconst leftItemCount = VISIBLE_PAGES - 1;\\r\\n\\t\\t\\tconst leftRange = range(1, leftItemCount + 1);\\r\\n\\t\\t\\treturn [...leftRange, DOTS, totalPageCount];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tif (shouldShowLeftDots && !shouldShowRightDots) {\\r\\n\\t\\t\\tconst rightItemCount = VISIBLE_PAGES - 1;\\r\\n\\t\\t\\tconst rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount + 1);\\r\\n\\t\\t\\treturn [1, DOTS, ...rightRange];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tif (shouldShowLeftDots && shouldShowRightDots) {\\r\\n\\t\\t\\tconst middleRange = range(adjustedLeftSiblingIndex, rightSiblingIndex + 1);\\r\\n\\t\\t\\treturn [1, DOTS, ...middleRange, DOTS, totalPageCount];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\treturn range(adjustedLeftSiblingIndex, rightSiblingIndex + 1);\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction range(start, end) {\\r\\n\\t\\tconst length = end - start;\\r\\n\\t\\treturn Array.from({ length }, (_, i) => start + i);\\r\\n\\t}\\r\\n\\r\\n\\t$: pageNumbers = getPageRange(currentPage, totalPages);\\r\\n\\t\\r\\n\\tfunction handleKeyDown(e) {\\r\\n\\t\\tif (e.key === 'ArrowLeft' && currentPage > 1) {\\r\\n\\t\\t\\tchangePage(currentPage - 1);\\r\\n\\t\\t} else if (e.key === 'ArrowRight' && currentPage < totalPages) {\\r\\n\\t\\t\\tchangePage(currentPage + 1);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction stripHtml(html) {\\r\\n\\t\\tif (!html) return '';\\r\\n\\t\\tif (typeof window === 'undefined') {\\r\\n\\t\\t\\treturn html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();\\r\\n\\t\\t}\\r\\n\\t\\tconst tempDiv = document.createElement('div');\\r\\n\\t\\ttempDiv.innerHTML = html;\\r\\n\\t\\treturn tempDiv.textContent || tempDiv.innerText || '';\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction truncateText(text, maxLength) {\\r\\n\\tif (!text) return '';\\r\\n\\t\\tif (typeof window === 'undefined') {\\r\\n\\t\\t\\tconst plainText = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();\\r\\n\\t\\t\\treturn plainText;\\r\\n\\t\\t}\\r\\n\\t\\tconst plainText = stripHtml(text);\\r\\n\\t\\treturn plainText;\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n\\t@keyframes float-left {\\r\\n\\t0%, 100% { transform: translateZ(-20px) scale(0.95) rotate(-2deg); }\\r\\n\\t50% { transform: translateZ(20px) scale(1.05) rotate(2deg); }\\r\\n}\\r\\n\\r\\n@keyframes float-right {\\r\\n\\t0%, 100% { transform: translateZ(-20px) scale(0.95) rotate(2deg); }\\r\\n\\t50% { transform: translateZ(20px) scale(1.05) rotate(-2deg); }\\r\\n}\\r\\n\\r\\n@keyframes pulse-glow {\\r\\n\\t0%, 100% { filter: brightness(1) saturate(1); }\\r\\n\\t50% { filter: brightness(1.1) saturate(1.2); }\\r\\n}\\r\\n\\r\\n.animate-float-left {\\r\\n\\tanimation: float-left 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;\\r\\n}\\r\\n\\r\\n.animate-float-right {\\r\\n\\tanimation: float-right 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;\\r\\n}\\r\\n\\r\\n.news-card:hover .animate-float-left,\\r\\n.news-card:hover .animate-float-right {\\r\\n\\tanimation: none;\\r\\n\\ttransform: none;\\r\\n\\tfilter: none;\\r\\n\\ttransition: all 0.3s ease;\\r\\n}\\r\\n\\r\\n.news-card:hover .news-image {\\r\\n\\ttransform: scale(1.05);\\r\\n}\\r\\n\\r\\n.news-image {\\r\\n\\ttransition: transform 0.3s ease;\\r\\n}\\r\\n</style>\\r\\n\\r\\n<div class=\\"w-full lg:w-11/12 max-w-7xl mx-auto px-4 sm:py-2\\">\\r\\n\\t{#if !records || (records?.length === 0 && !searchQuery)}\\r\\n\\t\\t<div class=\\"mt-8 flex flex-col items-center bg-white rounded-lg shadow-md justify-center p-8 text-center\\">\\r\\n\\t\\t\\t<Icon icon=\\"ph:newspaper\\" width=\\"72\\" height=\\"72\\" class=\\"text-primary-500 mb-4\\" />\\r\\n\\t\\t\\t<h3 class=\\"sm:text-xl text-lg font-medium text-gray-900 mb-2\\">No news available</h3>\\r\\n\\t\\t\\t<p class=\\"text-gray-500 max-w-md sm:text-sm text-xs\\">\\r\\n\\t\\t\\t\\tThere are currently no news items to display. Please check back later.\\r\\n\\t\\t\\t</p>\\r\\n\\t\\t</div>\\r\\n\\t{:else if searchQuery && records.length === 0}\\r\\n\\t\\t<div class=\\"mt-8 flex flex-col items-center bg-white rounded-lg shadow-md justify-center p-8 text-center overflow-hidden overflow-x-auto\\">\\r\\n\\t\\t\\t<Icon icon=\\"ph:newspaper-clipping\\" width=\\"72\\" height=\\"72\\" class=\\"text-primary-500 mb-4\\" />\\r\\n\\t\\t\\t<h3 class=\\"sm:text-xl text-lg font-medium text-gray-900 mb-2\\">No news found matching your search</h3>\\r\\n\\t\\t\\t<p class=\\"text-gray-500 max-w-md overflow-x-auto \\">\\r\\n\\t\\t\\t\\tWe couldn't find any news with titles matching \\"{searchQuery}\\". Please try a different\\r\\n\\t\\t\\t\\tsearch term or\\r\\n\\t\\t\\t</p>\\r\\n\\t\\t</div>\\r\\n\\t{:else}\\r\\n\\t\\t<!-- Mobile Grid Layout -->\\r\\n\\t\\t<div class=\\"grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6 mb-12\\">\\r\\n\\t\\t\\t{#each records as item, index (item._id || item.id)}\\r\\n\\t\\t\\t\\t<!-- <a\\r\\n\\t\\t\\t\\t\\thref={\`events/\${item.newsLink}\`} -->\\r\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col h-full bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-4px] news-card\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\"relative aspect-[3/2] overflow-hidden\\">\\r\\n\\t\\t\\t\\t\\t\\t<img\\r\\n\\t\\t\\t\\t\\t\\t\\tsrc={\`\${item.image}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\talt={item?.title || 'News image'}\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full h-full object-cover news-image {index % 2 === 0 ? 'animate-float-left' : 'animate-float-right'}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\tloading=\\"lazy\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:error={(e) => {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\te.target.src = '/DT.png';\\r\\n\\t\\t\\t\\t\\t\\t\\t}}/>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col flex-grow p-5\\">\\r\\n\\t\\t\\t\\t\\t\\t<h2 class=\\"font-bold text-lg mb-3 line-clamp-2 text-gray-800\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t{item?.title || 'Untitled News'}\\r\\n\\t\\t\\t\\t\\t\\t</h2>\\r\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-gray-600 mb-4 flex-grow line-clamp-3 text-justify\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t{truncateText(item?.content || 'No description available')}\\r\\n\\t\\t\\t\\t\\t\\t</p>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<!-- </a> -->\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</div>\\r\\n\\r\\n\\t\\t<!-- Desktop Alternating Layout -->\\r\\n\\t\\t<div class=\\"hidden md:flex flex-col gap-8 mb-12\\">\\r\\n\\t\\t\\t{#each records as item, index (item._id || item.id)}\\r\\n\\t\\t\\t\\t<!-- <a\\r\\n\\t\\t\\t\\t\\thref={\`events/\${item.newsLink}\`} -->\\r\\n                    <div class=\\"flex {index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:translate-y-[-2px] news-card group\\">\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t<!-- Image Section -->\\r\\n\\t\\t\\t\\t\\t<div class=\\"w-1/2 lg:w-2/5 relative overflow-hidden\\">\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"aspect-[4/3] relative p-5  shadow-xl\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<img\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tsrc={\`\${item.image}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\talt={item?.title || 'News image'}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full h-full object-cover news-image {index % 2 === 0 ? 'animate-float-left' : 'animate-float-right'}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tloading=\\"lazy\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\ton:error={(e) => {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\te.target.src = '/DT.png';\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t}}/>\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t<!-- Content Section -->\\r\\n\\t\\t\\t\\t\\t<div class=\\"w-1/2 lg:w-3/5 flex flex-col justify-center p-8 lg:p-12\\">\\r\\n\\t\\t\\t\\t\\t\\t<h2 class=\\"font-bold text-2xl lg:text-3xl mb-4 text-gray-800 line-clamp-3 group-hover:text-primary-600 transition-colors duration-300\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t{item?.title || 'Untitled News'}\\r\\n\\t\\t\\t\\t\\t\\t</h2>\\r\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-gray-600 text-lg leading-relaxed line-clamp-4 mb-6\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t{truncateText(item?.content || 'No description available')}\\r\\n\\t\\t\\t\\t\\t\\t</p>\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<!-- </a> -->\\r\\n                 </div>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</div>\\r\\n\\r\\n\\t\\t{#if totalPages > 1}\\r\\n\\t\\t\\t<div class=\\"flex justify-between items-center mb-3 mt-4 md:hidden\\">\\r\\n\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\ton:click={() => changePage(currentPage - 1)}\\r\\n\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\tclass=\\"px-5 py-1.5 bg-primary-600 border-1 disabled:bg-gray-200 disabled:border-gray-200 disabled:hover:text-white disabled:cursor-not-allowed border-primary-700 text-white rounded hover:bg-white hover:text-gray-700\\">\\r\\n\\t\\t\\t\\t\\tPrevious\\r\\n\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t<span>Page {currentPage} of {totalPages}</span>\\r\\n\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\ton:click={() => changePage(currentPage + 1)}\\r\\n\\t\\t\\t\\t\\tdisabled={currentPage === totalPages}\\r\\n\\t\\t\\t\\t\\tclass=\\"px-5 py-1.5 bg-primary-600 border-1 disabled:bg-gray-200 disabled:border-gray-200 disabled:hover:text-white disabled:cursor-not-allowed border-primary-700 text-white rounded hover:bg-white hover:text-gray-700\\">\\r\\n\\t\\t\\t\\t\\tNext\\r\\n\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t\\t<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->\\r\\n\\t\\t\\t<nav\\r\\n\\t\\t\\t\\taria-label=\\"Pagination\\"\\r\\n\\t\\t\\t\\tclass=\\"hidden md:flex justify-center mt-12 mb-6\\"\\r\\n\\t\\t\\t\\ton:keydown={handleKeyDown}>\\r\\n\\t\\t\\t\\t<div class=\\"flex items-center justify-center gap-1.5 flex-wrap\\">\\r\\n\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed\\"\\r\\n\\t\\t\\t\\t\\t\\ton:click={() => changePage(1)}\\r\\n\\t\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\t\\taria-label=\\"First page\\">\\r\\n\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-double-left-bold\\" class=\\"w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed\\"\\r\\n\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage - 1)}\\r\\n\\t\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\t\\taria-label=\\"Previous page\\">\\r\\n\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-left-bold\\" class=\\"w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t{#each pageNumbers as page}\\r\\n\\t\\t\\t\\t\\t\\t{#if page === DOTS}\\r\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"px-2 py-1 text-gray-500 text-sm font-medium\\">{DOTS}</span>\\r\\n\\t\\t\\t\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(page)}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tclass={\`flex h-8 min-w-[2rem] items-center justify-center rounded-md text-sm font-medium shadow-sm border transition-all duration-200 \${\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tpage === currentPage\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'bg-primary-500 text-white border-primary-500 hover:bg-primary-600'\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'bg-white text-gray-800 border-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500'\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tdisabled={page === currentPage}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\taria-label={\`Page \${page}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\taria-current={page === currentPage ? 'page' : undefined}>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{page}\\r\\n\\t\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed\\"\\r\\n\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage + 1)}\\r\\n\\t\\t\\t\\t\\t\\tdisabled={currentPage >= totalPages}\\r\\n\\t\\t\\t\\t\\t\\taria-label=\\"Next page\\">\\r\\n\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-right-bold\\" class=\\"w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed\\"\\r\\n\\t\\t\\t\\t\\t\\ton:click={() => changePage(totalPages)}\\r\\n\\t\\t\\t\\t\\t\\tdisabled={currentPage >= totalPages}\\r\\n\\t\\t\\t\\t\\t\\taria-label=\\"Last page\\">\\r\\n\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-double-right-bold\\" class=\\"w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</nav>\\r\\n\\t\\t{/if}\\r\\n\\t{/if}\\r\\n</div>"],"names":[],"mappings":"AAsKC,WAAW,yBAAW,CACtB,EAAE,CAAE,IAAK,CAAE,SAAS,CAAE,WAAW,KAAK,CAAC,CAAC,MAAM,IAAI,CAAC,CAAC,OAAO,KAAK,CAAG,CACnE,GAAI,CAAE,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,MAAM,IAAI,CAAC,CAAC,OAAO,IAAI,CAAG,CAC7D,CAEA,WAAW,0BAAY,CACtB,EAAE,CAAE,IAAK,CAAE,SAAS,CAAE,WAAW,KAAK,CAAC,CAAC,MAAM,IAAI,CAAC,CAAC,OAAO,IAAI,CAAG,CAClE,GAAI,CAAE,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,MAAM,IAAI,CAAC,CAAC,OAAO,KAAK,CAAG,CAC9D,CAEA,WAAW,yBAAW,CACrB,EAAE,CAAE,IAAK,CAAE,MAAM,CAAE,WAAW,CAAC,CAAC,CAAC,SAAS,CAAC,CAAG,CAC9C,GAAI,CAAE,MAAM,CAAE,WAAW,GAAG,CAAC,CAAC,SAAS,GAAG,CAAG,CAC9C,CAEA,iDAAoB,CACnB,SAAS,CAAE,yBAAU,CAAC,EAAE,CAAC,WAAW,CAAC,QAAQ,CAAC,CAAC,yBAAU,CAAC,EAAE,CAAC,WAAW,CAAC,QAC1E,CAEA,kDAAqB,CACpB,SAAS,CAAE,0BAAW,CAAC,EAAE,CAAC,WAAW,CAAC,QAAQ,CAAC,CAAC,yBAAU,CAAC,EAAE,CAAC,WAAW,CAAC,QAC3E,CAEA,yBAAU,MAAM,CAAC,kCAAmB,CACpC,yBAAU,MAAM,CAAC,mCAAqB,CACrC,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACtB,CAEA,yBAAU,MAAM,CAAC,0BAAY,CAC5B,SAAS,CAAE,MAAM,IAAI,CACtB,CAEA,yCAAY,CACX,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,IAC5B"}`
};
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
function truncateText(text, maxLength) {
  if (!text) return "";
  if (typeof window === "undefined") {
    const plainText2 = text.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
    return plainText2;
  }
  const plainText = stripHtml(text);
  return plainText;
}
const Products = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalPages;
  let pageNumbers;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  console.log(data, "<--News data");
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
  return `<div class="w-full lg:w-11/12 max-w-7xl mx-auto px-4 sm:py-2">${!records || records?.length === 0 && !searchQuery ? `<div class="mt-8 flex flex-col items-center bg-white rounded-lg shadow-md justify-center p-8 text-center">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:newspaper",
      width: "72",
      height: "72",
      class: "text-primary-500 mb-4"
    },
    {},
    {}
  )} <h3 class="sm:text-xl text-lg font-medium text-gray-900 mb-2" data-svelte-h="svelte-1kodsu3">No news available</h3> <p class="text-gray-500 max-w-md sm:text-sm text-xs" data-svelte-h="svelte-buvhyy">There are currently no news items to display. Please check back later.</p></div>` : `${searchQuery && records.length === 0 ? `<div class="mt-8 flex flex-col items-center bg-white rounded-lg shadow-md justify-center p-8 text-center overflow-hidden overflow-x-auto">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:newspaper-clipping",
      width: "72",
      height: "72",
      class: "text-primary-500 mb-4"
    },
    {},
    {}
  )} <h3 class="sm:text-xl text-lg font-medium text-gray-900 mb-2" data-svelte-h="svelte-a5bywe">No news found matching your search</h3> <p class="text-gray-500 max-w-md overflow-x-auto ">We couldn&#39;t find any news with titles matching &quot;${escape(searchQuery)}&quot;. Please try a different
				search term or</p></div>` : ` <div class="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6 mb-12">${each(records, (item, index) => {
    return ` <div class="flex flex-col h-full bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-4px] news-card svelte-1nhooh4"><div class="relative aspect-[3/2] overflow-hidden"><img${add_attribute("src", `${item.image}`, 0)}${add_attribute("alt", item?.title || "News image", 0)} class="${"w-full h-full object-cover news-image " + escape(
      index % 2 === 0 ? "animate-float-left" : "animate-float-right",
      true
    ) + " svelte-1nhooh4"}" loading="lazy"></div> <div class="flex flex-col flex-grow p-5"><h2 class="font-bold text-lg mb-3 line-clamp-2 text-gray-800">${escape(item?.title || "Untitled News")}</h2> <p class="text-gray-600 mb-4 flex-grow line-clamp-3 text-justify">${escape(truncateText(item?.content || "No description available"))}</p> </div></div> `;
  })}</div>  <div class="hidden md:flex flex-col gap-8 mb-12">${each(records, (item, index) => {
    return ` <div class="${"flex " + escape(index % 2 === 0 ? "flex-row" : "flex-row-reverse", true) + " bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:translate-y-[-2px] news-card group svelte-1nhooh4"}"> <div class="w-1/2 lg:w-2/5 relative overflow-hidden"><div class="aspect-[4/3] relative p-5 shadow-xl"><img${add_attribute("src", `${item.image}`, 0)}${add_attribute("alt", item?.title || "News image", 0)} class="${"w-full h-full object-cover news-image " + escape(
      index % 2 === 0 ? "animate-float-left" : "animate-float-right",
      true
    ) + " svelte-1nhooh4"}" loading="lazy"> </div></div>  <div class="w-1/2 lg:w-3/5 flex flex-col justify-center p-8 lg:p-12"><h2 class="font-bold text-2xl lg:text-3xl mb-4 text-gray-800 line-clamp-3 group-hover:text-primary-600 transition-colors duration-300">${escape(item?.title || "Untitled News")}</h2> <p class="text-gray-600 text-lg leading-relaxed line-clamp-4 mb-6">${escape(truncateText(item?.content || "No description available"))} </p></div>  </div>`;
  })}</div> ${totalPages > 1 ? `<div class="flex justify-between items-center mb-3 mt-4 md:hidden"><button ${currentPage === 1 ? "disabled" : ""} class="px-5 py-1.5 bg-primary-600 border-1 disabled:bg-gray-200 disabled:border-gray-200 disabled:hover:text-white disabled:cursor-not-allowed border-primary-700 text-white rounded hover:bg-white hover:text-gray-700">Previous</button> <span>Page ${escape(currentPage)} of ${escape(totalPages)}</span> <button ${currentPage === totalPages ? "disabled" : ""} class="px-5 py-1.5 bg-primary-600 border-1 disabled:bg-gray-200 disabled:border-gray-200 disabled:hover:text-white disabled:cursor-not-allowed border-primary-700 text-white rounded hover:bg-white hover:text-gray-700">Next</button></div>  <nav aria-label="Pagination" class="hidden md:flex justify-center mt-12 mb-6"><div class="flex items-center justify-center gap-1.5 flex-wrap"><button class="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed" ${currentPage === 1 ? "disabled" : ""} aria-label="First page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-double-left-bold",
      class: "w-4 h-4"
    },
    {},
    {}
  )}</button> <button class="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed" ${currentPage === 1 ? "disabled" : ""} aria-label="Previous page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-left-bold",
      class: "w-4 h-4"
    },
    {},
    {}
  )}</button> ${each(pageNumbers, (page2) => {
    return `${page2 === DOTS ? `<span class="px-2 py-1 text-gray-500 text-sm font-medium">${escape(DOTS)}</span>` : `<button class="${escape(
      null_to_empty(`flex h-8 min-w-[2rem] items-center justify-center rounded-md text-sm font-medium shadow-sm border transition-all duration-200 ${page2 === currentPage ? "bg-primary-500 text-white border-primary-500 hover:bg-primary-600" : "bg-white text-gray-800 border-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500"}`),
      true
    ) + " svelte-1nhooh4"}" ${page2 === currentPage ? "disabled" : ""}${add_attribute("aria-label", `Page ${page2}`, 0)}${add_attribute("aria-current", page2 === currentPage ? "page" : void 0, 0)}>${escape(page2)} </button>`}`;
  })} <button class="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed" ${currentPage >= totalPages ? "disabled" : ""} aria-label="Next page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-right-bold",
      class: "w-4 h-4"
    },
    {},
    {}
  )}</button> <button class="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed" ${currentPage >= totalPages ? "disabled" : ""} aria-label="Last page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-double-right-bold",
      class: "w-4 h-4"
    },
    {},
    {}
  )}</button></div></nav>` : ``}`}`}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(Products, "Products").$$render($$result, { data }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CZy9hzTh.js.map
