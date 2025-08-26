import { c as create_ssr_component, v as validate_component, d as subscribe, b as escape, e as each, a as add_attribute, t as null_to_empty } from './ssr-BN5qA9uw.js';
import { I as Icon } from './Icon-DA1KMwkX.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { p as page } from './stores-D7ZOzynx.js';
import './functions-DmKzDADE.js';

const css = {
  code: "@keyframes svelte-jxl47l-fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes svelte-jxl47l-slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}.partner-card.svelte-jxl47l.svelte-jxl47l{animation:svelte-jxl47l-fadeInUp 0.6s ease-out forwards;animation-fill-mode:both;transition:all 0.4s cubic-bezier(0.4, 0, 0.2, 1)}.partner-card.svelte-jxl47l.svelte-jxl47l:hover{transform:translateY(-8px);box-shadow:0 20px 40px rgba(0, 0, 0, 0.15)}.partner-logo.svelte-jxl47l.svelte-jxl47l{filter:grayscale(20%);transition:all 0.4s ease}.partner-card.svelte-jxl47l:hover .partner-logo.svelte-jxl47l{filter:grayscale(0%);transform:scale(1.05)}.content-text.svelte-jxl47l.svelte-jxl47l{line-height:1.7;word-break:break-word}.gradient-bg.svelte-jxl47l.svelte-jxl47l{background:linear-gradient(135deg, #667eea 0%, #764ba2 100%)}.glass-effect.svelte-jxl47l.svelte-jxl47l{backdrop-filter:blur(10px);background:rgba(255, 255, 255, 0.9)}@media(max-width: 640px){.partner-card.svelte-jxl47l.svelte-jxl47l{animation:svelte-jxl47l-slideIn 0.5s ease-out forwards}}",
  map: `{"version":3,"file":"partnersweb.svelte","sources":["partnersweb.svelte"],"sourcesContent":["<script>\\r\\n\\timport Icon from '@iconify/svelte';\\r\\n\\timport { goto } from '$app/navigation';\\r\\n\\timport { page } from '$app/stores';\\r\\n\\timport { browser } from '$app/environment';\\r\\n\\t\\r\\n\\texport let data;\\r\\n\\tconsole.log(data,'<--Partners data')\\r\\n\\r\\n\\tlet records = [];\\r\\n\\tlet totalCount = 0;\\r\\n\\tlet filteredRecords = [];\\r\\n\\r\\n\\t$: if (data) {\\r\\n\\t\\tif (!searchQuery || searchQuery.trim().length === 0) {\\r\\n\\t\\t\\t({ records, totalCount } = data);\\r\\n\\t\\t} else {\\r\\n\\t\\t\\trecords = filteredRecords;\\r\\n\\t\\t\\ttotalCount = filteredRecords?.length;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tlet currentPage = parseInt($page.url.searchParams.get('page')) || 1;\\r\\n\\tlet searchQuery = $page.url.searchParams.get('search') || '';\\r\\n\\t\\r\\n\\tlet timeout;\\r\\n\\t\\r\\n\\tconst DOTS = '...';\\r\\n\\tconst VISIBLE_PAGES = 5;\\r\\n\\r\\n\\t$: totalPages = isNaN(totalCount) ? 1 : Math.ceil(totalCount / 12);\\r\\n\\r\\n\\t$: {\\r\\n\\t\\tif (data && data.records) {\\r\\n\\t\\t\\tif (searchQuery && searchQuery.trim().length > 0) {\\r\\n\\t\\t\\t\\tconst query = searchQuery.toLowerCase().trim();\\r\\n\\t\\t\\t\\tfilteredRecords = data.records.filter(item => {\\r\\n\\t\\t\\t\\t\\tconst titleMatch = item.title && item.title.toLowerCase().includes(query);\\r\\n\\r\\n\\t\\t\\t\\t\\tlet keywordMatch = false;\\r\\n\\t\\t\\t\\t\\tif (item.Keyword) {\\r\\n\\t\\t\\t\\t\\t\\tif (typeof item.Keyword === 'string') {\\r\\n\\t\\t\\t\\t\\t\\t\\tconst keywords = item.Keyword.split(',').map(k => k.trim().toLowerCase());\\r\\n\\t\\t\\t\\t\\t\\t\\tkeywordMatch = keywords.some(keyword => keyword.includes(query));\\r\\n\\t\\t\\t\\t\\t\\t} else if (Array.isArray(item.Keyword)) {\\r\\n\\t\\t\\t\\t\\t\\t\\tkeywordMatch = item.Keyword.some(keyword => \\r\\n\\t\\t\\t\\t\\t\\t\\t\\tkeyword.toLowerCase().includes(query)\\r\\n\\t\\t\\t\\t\\t\\t\\t);\\r\\n\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t}\\r\\n\\r\\n\\t\\t\\t\\t\\tconst previewMatch = item.previewText && \\r\\n\\t\\t\\t\\t\\t\\tstripHtml(item.previewText).toLowerCase().includes(query);\\r\\n\\r\\n\\t\\t\\t\\t\\treturn titleMatch || keywordMatch || previewMatch;\\r\\n\\t\\t\\t\\t});\\r\\n\\t\\t\\t} else {\\r\\n\\t\\t\\t\\tfilteredRecords = data?.records || [];\\r\\n\\t\\t\\t}\\r\\n\\t\\t} else {\\r\\n\\t\\t\\tfilteredRecords = [];\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tconst changePage = (page) => {\\r\\n\\t\\tcurrentPage = page;\\r\\n\\t\\tconst newUrl = new URL(window.location.href);\\r\\n\\t\\tnewUrl.searchParams.set('page', currentPage);\\r\\n\\r\\n\\t\\tif (currentPage === 1) {\\r\\n\\t\\t\\tnewUrl.searchParams.delete('page');\\r\\n\\t\\t} else {\\r\\n\\t\\t\\tnewUrl.searchParams.set('page', currentPage);\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\tgoto(newUrl.toString(), {\\r\\n\\t\\treplaceState: true,\\r\\n\\t\\tkeepfocus: true,\\r\\n\\t\\tnoScroll: true  \\r\\n\\t\\t}).then(() => {\\r\\n\\t\\t\\tscrollToTop();\\r\\n\\t\\t});\\r\\n\\t};\\r\\n\\t\\r\\n\\tfunction scrollToTop() {\\r\\n\\t\\twindow.scrollTo({ top: 0, behavior: 'smooth' });\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction getPageRange(currentPageNum, totalPageCount) {\\r\\n\\t\\tconst totalPageNumbers = VISIBLE_PAGES;\\r\\n\\t\\t\\r\\n\\t\\tif (totalPageCount === 0) return [];\\r\\n\\t\\t\\r\\n\\t\\tif (totalPageNumbers >= totalPageCount) {\\r\\n\\t\\t\\treturn range(1, totalPageCount + 1);\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tconst leftSiblingIndex = Math.max(currentPageNum - Math.floor(VISIBLE_PAGES / 2), 1);\\r\\n\\t\\tconst rightSiblingIndex = Math.min(leftSiblingIndex + VISIBLE_PAGES - 1, totalPageCount);\\r\\n\\t\\t\\r\\n\\t\\tconst adjustedLeftSiblingIndex = Math.max(rightSiblingIndex - VISIBLE_PAGES + 1, 1);\\r\\n\\t  \\r\\n\\t\\tconst shouldShowLeftDots = adjustedLeftSiblingIndex > 2;\\r\\n\\t\\tconst shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;\\r\\n\\t\\t\\r\\n\\t\\tif (!shouldShowLeftDots && shouldShowRightDots) {\\r\\n\\t\\t\\tconst leftItemCount = VISIBLE_PAGES - 1;\\r\\n\\t\\t\\tconst leftRange = range(1, leftItemCount + 1);\\r\\n\\t\\t\\treturn [...leftRange, DOTS, totalPageCount];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tif (shouldShowLeftDots && !shouldShowRightDots) {\\r\\n\\t\\t\\tconst rightItemCount = VISIBLE_PAGES - 1;\\r\\n\\t\\t\\tconst rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount + 1);\\r\\n\\t\\t\\treturn [1, DOTS, ...rightRange];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\tif (shouldShowLeftDots && shouldShowRightDots) {\\r\\n\\t\\t\\tconst middleRange = range(adjustedLeftSiblingIndex, rightSiblingIndex + 1);\\r\\n\\t\\t\\treturn [1, DOTS, ...middleRange, DOTS, totalPageCount];\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\treturn range(adjustedLeftSiblingIndex, rightSiblingIndex + 1);\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction range(start, end) {\\r\\n\\t\\tconst length = end - start;\\r\\n\\t\\treturn Array.from({ length }, (_, i) => start + i);\\r\\n\\t}\\r\\n\\r\\n\\t$: pageNumbers = getPageRange(currentPage, totalPages);\\r\\n\\t\\r\\n\\tfunction handleKeyDown(e) {\\r\\n\\t\\tif (e.key === 'ArrowLeft' && currentPage > 1) {\\r\\n\\t\\t\\tchangePage(currentPage - 1);\\r\\n\\t\\t} else if (e.key === 'ArrowRight' && currentPage < totalPages) {\\r\\n\\t\\t\\tchangePage(currentPage + 1);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction stripHtml(html) {\\r\\n\\t\\tif (!html) return '';\\r\\n\\t\\tif (typeof window === 'undefined') {\\r\\n\\t\\t\\treturn html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();\\r\\n\\t\\t}\\r\\n\\t\\tconst tempDiv = document.createElement('div');\\r\\n\\t\\ttempDiv.innerHTML = html;\\r\\n\\t\\treturn tempDiv.textContent || tempDiv.innerText || '';\\r\\n\\t}\\r\\n\\t\\r\\n\\tfunction getFullContent(item) {\\r\\n\\t\\tif (!item) return '';\\r\\n\\t\\t\\r\\n\\t\\t// Try multiple content fields in order of preference\\r\\n\\t\\tconst contentSources = [\\r\\n\\t\\t\\titem.content,\\r\\n\\t\\t\\titem.previewText,\\r\\n\\t\\t\\titem.description,\\r\\n\\t\\t\\titem.summary\\r\\n\\t\\t];\\r\\n\\t\\t\\r\\n\\t\\tfor (let content of contentSources) {\\r\\n\\t\\t\\tif (content) {\\r\\n\\t\\t\\t\\treturn stripHtml(content);\\r\\n\\t\\t\\t}\\r\\n\\t\\t}\\r\\n\\t\\t\\r\\n\\t\\treturn '';\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n\\t@keyframes fadeInUp {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\topacity: 0;\\r\\n\\t\\t\\ttransform: translateY(20px);\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\topacity: 1;\\r\\n\\t\\t\\ttransform: translateY(0);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\t@keyframes slideIn {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\topacity: 0;\\r\\n\\t\\t\\ttransform: translateX(-20px);\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\topacity: 1;\\r\\n\\t\\t\\ttransform: translateX(0);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\t.partner-card {\\r\\n\\t\\tanimation: fadeInUp 0.6s ease-out forwards;\\r\\n\\t\\tanimation-fill-mode: both;\\r\\n\\t\\ttransition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\\r\\n\\t}\\r\\n\\r\\n\\t.partner-card:hover {\\r\\n\\t\\ttransform: translateY(-8px);\\r\\n\\t\\tbox-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\\r\\n\\t}\\r\\n\\r\\n\\t.partner-logo {\\r\\n\\t\\tfilter: grayscale(20%);\\r\\n\\t\\ttransition: all 0.4s ease;\\r\\n\\t}\\r\\n\\r\\n\\t.partner-card:hover .partner-logo {\\r\\n\\t\\tfilter: grayscale(0%);\\r\\n\\t\\ttransform: scale(1.05);\\r\\n\\t}\\r\\n\\r\\n\\t.content-text {\\r\\n\\t\\tline-height: 1.7;\\r\\n\\t\\tword-break: break-word;\\r\\n\\t}\\r\\n\\r\\n\\t.gradient-bg {\\r\\n\\t\\tbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\\r\\n\\t}\\r\\n\\r\\n\\t.glass-effect {\\r\\n\\t\\tbackdrop-filter: blur(10px);\\r\\n\\t\\tbackground: rgba(255, 255, 255, 0.9);\\r\\n\\t}\\r\\n\\r\\n\\t@media (max-width: 640px) {\\r\\n\\t\\t.partner-card {\\r\\n\\t\\t\\tanimation: slideIn 0.5s ease-out forwards;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<div class=\\"min-h-screen \\">\\r\\n\\t<div class=\\"w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12\\">\\r\\n\\t\\t{#if !records || (records?.length === 0 && !searchQuery)}\\r\\n\\t\\t\\t<div class=\\"flex flex-col items-center justify-center py-16 sm:py-20\\">\\r\\n\\t\\t\\t\\t<div class=\\"glass-effect rounded-2xl p-8 sm:p-12 text-center shadow-xl max-w-md mx-auto border border-white/20\\">\\r\\n\\t\\t\\t\\t\\t<Icon icon=\\"ph:handshake\\" width=\\"64\\" height=\\"64\\" class=\\"text-indigo-400 mx-auto mb-6\\" />\\r\\n\\t\\t\\t\\t\\t<h3 class=\\"text-xl sm:text-2xl font-bold text-gray-900 mb-4\\">No Partners Available</h3>\\r\\n\\t\\t\\t\\t\\t<p class=\\"text-gray-600 leading-relaxed\\">\\r\\n\\t\\t\\t\\t\\t\\tWe're building partnerships. Check back soon to see our network.\\r\\n\\t\\t\\t\\t\\t</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t{:else if searchQuery && records.length === 0}\\r\\n\\t\\t\\t<div class=\\"flex flex-col items-center justify-center py-16 sm:py-20\\">\\r\\n\\t\\t\\t\\t<div class=\\"glass-effect rounded-2xl p-8 sm:p-12 text-center shadow-xl max-w-md mx-auto border border-white/20\\">\\r\\n\\t\\t\\t\\t\\t<Icon icon=\\"ph:magnifying-glass\\" width=\\"64\\" height=\\"64\\" class=\\"text-indigo-400 mx-auto mb-6\\" />\\r\\n\\t\\t\\t\\t\\t<h3 class=\\"text-xl sm:text-2xl font-bold text-gray-900 mb-4\\">No Partners Found</h3>\\r\\n\\t\\t\\t\\t\\t<p class=\\"text-gray-600 mb-3 leading-relaxed\\">\\r\\n\\t\\t\\t\\t\\t\\tNo partners match <strong class=\\"text-indigo-600\\">\\"{searchQuery}\\"</strong>\\r\\n\\t\\t\\t\\t\\t</p>\\r\\n\\t\\t\\t\\t\\t<p class=\\"text-sm text-gray-500\\">Try different search terms</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t{:else}\\r\\n\\t\\t\\t<!-- Header -->\\r\\n           <div class=\\"bg-[url('/banner6.png')] bg-center\\">\\r\\n\\r\\n\\t<div class=\\"text-center  sm:mb-16 py-16 bg-black/50\\">\\r\\n\\t\\t<h1 class=\\"text-3xl md:text-4xl font-bold text-primary-500 t mb-4 sm:mb-6\\">\\r\\n\\t\\t\\tOur Partners\\r\\n\\t\\t</h1>\\r\\n\\t\\t<p class=\\"text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed\\">\\r\\n\\t\\t\\tTrusted organizations and industry leaders working with us to drive innovation forward\\r\\n\\t\\t</p>\\r\\n\\t</div>\\r\\n\\r\\n</div>\\r\\n\\r\\n\\r\\n\\t\\t\\t<!-- Partners Grid - Responsive Layout -->\\r\\n\\t\\t\\t<div class=\\"space-y-4        sm:space-y-12  sm:mb-16\\">\\r\\n\\t\\t\\t\\t{#each records as item, index (item._id || item.id)}\\r\\n\\t\\t\\t\\t\\t<div \\r\\n\\t\\t\\t\\t\\t\\tclass=\\"partner-card glass-effect rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/30\\"\\r\\n\\t\\t\\t\\t\\t\\tstyle=\\"animation-delay: {index * 0.1}s\\">\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"grid grid-cols-1 lg:grid-cols-2 gap-0\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<!-- Logo Section -->\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"relative overflow-hidden  p-8 sm:p-12 flex items-center justify-center\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"w-full max-w-sm\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<img\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsrc={item.image}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\talt={item?.title || 'Partner logo'}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full h-auto  partner-logo\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tloading=\\"lazy\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:error={(e) => {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\te.target.src = '/DT.png';\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}/>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<!-- Decorative Elements -->\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<!-- <div class=\\"absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-xl\\"></div> -->\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<!-- <div class=\\"absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl\\"></div> -->\\r\\n\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t\\t<!-- Content Section -->\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"p-6 sm:p-8 lg:p-12 flex flex-col justify-center\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mb-4 sm:mb-6\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<h2 class=\\"text-2xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{item?.title || 'Partner Name'}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</h2>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if item?.location || item?.subtitle}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\"text-base  text-primary-600 font-medium \\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{item?.location || item?.subtitle || ''}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</p>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if getFullContent(item)}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"prose prose-gray max-w-none\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\"text-gray-700 text-base  leading-relaxed content-text mb-6\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{getFullContent(item)}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</p>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<!-- Keywords/Tags -->\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if item?.Keyword}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex flex-wrap gap-2 mb-6\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#each (typeof item.Keyword === 'string' ? item.Keyword.split(',') : item.Keyword) as keyword}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{keyword.trim()}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</span>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<!-- Action Button (if needed) -->\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if item?.website || item?.link}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mt-auto\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<a \\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\thref={item?.website || item?.link}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttarget=\\"_blank\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\trel=\\"noopener noreferrer\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<span>Learn More</span>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:arrow-up-right\\" class=\\"ml-2 w-4 h-4\\" />\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</a>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t<!-- Pagination -->\\r\\n\\t\\t\\t{#if totalPages > 1}\\r\\n\\t\\t\\t\\t<!-- Mobile Pagination -->\\r\\n\\t\\t\\t\\t<div class=\\"flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 lg:hidden\\">\\r\\n\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage - 1)}\\r\\n\\t\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-xl shadow-lg border border-white/30 text-gray-700 font-semibold transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed\\">\\r\\n\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:arrow-left\\" class=\\"w-5 h-5\\" />\\r\\n\\t\\t\\t\\t\\t\\t<span>Previous</span>\\r\\n\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t<div class=\\"glass-effect px-6 py-3 rounded-xl shadow-lg border border-white/30\\">\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"text-lg font-bold text-gray-800\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t{currentPage} / {totalPages}\\r\\n\\t\\t\\t\\t\\t\\t</span>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage + 1)}\\r\\n\\t\\t\\t\\t\\t\\tdisabled={currentPage === totalPages}\\r\\n\\t\\t\\t\\t\\t\\tclass=\\"w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-xl shadow-lg border border-white/30 text-gray-700 font-semibold transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed\\">\\r\\n\\t\\t\\t\\t\\t\\t<span>Next</span>\\r\\n\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:arrow-right\\" class=\\"w-5 h-5\\" />\\r\\n\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t\\t<!-- Desktop Pagination -->\\r\\n\\t\\t\\t\\t<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->\\r\\n\\t\\t\\t\\t<nav\\r\\n\\t\\t\\t\\t\\taria-label=\\"Pagination\\"\\r\\n\\t\\t\\t\\t\\tclass=\\"hidden lg:flex justify-center\\"\\r\\n\\t\\t\\t\\t\\ton:keydown={handleKeyDown}>\\r\\n\\t\\t\\t\\t\\t<div class=\\"flex items-center space-x-2 glass-effect rounded-xl p-2 shadow-lg border border-white/30\\">\\r\\n\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(1)}\\r\\n\\t\\t\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"First page\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-double-left-bold\\" class=\\"w-5 h-5\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage - 1)}\\r\\n\\t\\t\\t\\t\\t\\t\\tdisabled={currentPage === 1}\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"Previous page\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-left-bold\\" class=\\"w-5 h-5\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t{#each pageNumbers as pageNum}\\r\\n\\t\\t\\t\\t\\t\\t\\t{#if pageNum === DOTS}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"px-3 py-2 text-gray-400 text-lg font-bold\\">{DOTS}</span>\\r\\n\\t\\t\\t\\t\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(pageNum)}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass={\`min-w-[3rem] h-12 rounded-lg text-lg font-bold transition-all duration-300 \${\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tpageNum === currentPage\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'text-gray-700 hover:bg-white/50'\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tdisabled={pageNum === currentPage}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\taria-label={\`Page \${pageNum}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\taria-current={pageNum === currentPage ? 'page' : undefined}>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{pageNum}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(currentPage + 1)}\\r\\n\\t\\t\\t\\t\\t\\t\\tdisabled={currentPage >= totalPages}\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"Next page\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-right-bold\\" class=\\"w-5 h-5\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t\\t<button\\r\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed\\"\\r\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => changePage(totalPages)}\\r\\n\\t\\t\\t\\t\\t\\t\\tdisabled={currentPage >= totalPages}\\r\\n\\t\\t\\t\\t\\t\\t\\taria-label=\\"Last page\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<Icon icon=\\"ph:caret-double-right-bold\\" class=\\"w-5 h-5\\" />\\r\\n\\t\\t\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t</nav>\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t{/if}\\r\\n\\t</div>\\r\\n</div>"],"names":[],"mappings":"AA4KC,WAAW,sBAAS,CACnB,IAAK,CACJ,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,IAAI,CAC3B,CACA,EAAG,CACF,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,CAAC,CACxB,CACD,CAEA,WAAW,qBAAQ,CAClB,IAAK,CACJ,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,KAAK,CAC5B,CACA,EAAG,CACF,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,CAAC,CACxB,CACD,CAEA,yCAAc,CACb,SAAS,CAAE,sBAAQ,CAAC,IAAI,CAAC,QAAQ,CAAC,QAAQ,CAC1C,mBAAmB,CAAE,IAAI,CACzB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CACjD,CAEA,yCAAa,MAAO,CACnB,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAC3C,CAEA,yCAAc,CACb,MAAM,CAAE,UAAU,GAAG,CAAC,CACtB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACtB,CAEA,2BAAa,MAAM,CAAC,2BAAc,CACjC,MAAM,CAAE,UAAU,EAAE,CAAC,CACrB,SAAS,CAAE,MAAM,IAAI,CACtB,CAEA,yCAAc,CACb,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,UACb,CAEA,wCAAa,CACZ,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAC7D,CAEA,yCAAc,CACb,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CACpC,CAEA,MAAO,YAAY,KAAK,CAAE,CACzB,yCAAc,CACb,SAAS,CAAE,qBAAO,CAAC,IAAI,CAAC,QAAQ,CAAC,QAClC,CACD"}`
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
function getFullContent(item) {
  if (!item) return "";
  const contentSources = [item.content, item.previewText, item.description, item.summary];
  for (let content of contentSources) {
    if (content) {
      return stripHtml(content);
    }
  }
  return "";
}
const Partnersweb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalPages;
  let pageNumbers;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  console.log(data, "<--Partners data");
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
  return `<div class="min-h-screen "><div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">${!records || records?.length === 0 && !searchQuery ? `<div class="flex flex-col items-center justify-center py-16 sm:py-20"><div class="glass-effect rounded-2xl p-8 sm:p-12 text-center shadow-xl max-w-md mx-auto border border-white/20 svelte-jxl47l">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:handshake",
      width: "64",
      height: "64",
      class: "text-indigo-400 mx-auto mb-6"
    },
    {},
    {}
  )} <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4" data-svelte-h="svelte-vka2js">No Partners Available</h3> <p class="text-gray-600 leading-relaxed" data-svelte-h="svelte-ejgpsh">We&#39;re building partnerships. Check back soon to see our network.</p></div></div>` : `${searchQuery && records.length === 0 ? `<div class="flex flex-col items-center justify-center py-16 sm:py-20"><div class="glass-effect rounded-2xl p-8 sm:p-12 text-center shadow-xl max-w-md mx-auto border border-white/20 svelte-jxl47l">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:magnifying-glass",
      width: "64",
      height: "64",
      class: "text-indigo-400 mx-auto mb-6"
    },
    {},
    {}
  )} <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4" data-svelte-h="svelte-1ay2uzr">No Partners Found</h3> <p class="text-gray-600 mb-3 leading-relaxed">No partners match <strong class="text-indigo-600">&quot;${escape(searchQuery)}&quot;</strong></p> <p class="text-sm text-gray-500" data-svelte-h="svelte-1oogqyr">Try different search terms</p></div></div>` : ` <div class="bg-[url('/banner6.png')] bg-center" data-svelte-h="svelte-1l8p76o"><div class="text-center sm:mb-16 py-16 bg-black/50"><h1 class="text-3xl md:text-4xl font-bold text-primary-500 t mb-4 sm:mb-6">Our Partners</h1> <p class="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">Trusted organizations and industry leaders working with us to drive innovation forward</p></div></div>  <div class="space-y-4 sm:space-y-12 sm:mb-16">${each(records, (item, index) => {
    return `<div class="partner-card glass-effect rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/30 svelte-jxl47l" style="${"animation-delay: " + escape(index * 0.1, true) + "s"}"><div class="grid grid-cols-1 lg:grid-cols-2 gap-0"> <div class="relative overflow-hidden p-8 sm:p-12 flex items-center justify-center"><div class="w-full max-w-sm"><img${add_attribute("src", item.image, 0)}${add_attribute("alt", item?.title || "Partner logo", 0)} class="w-full h-auto partner-logo svelte-jxl47l" loading="lazy"></div>   </div>  <div class="p-6 sm:p-8 lg:p-12 flex flex-col justify-center"><div class="mb-4 sm:mb-6"><h2 class="text-2xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">${escape(item?.title || "Partner Name")}</h2> ${item?.location || item?.subtitle ? `<p class="text-base text-primary-600 font-medium ">${escape(item?.location || item?.subtitle || "")} </p>` : ``}</div> ${getFullContent(item) ? `<div class="prose prose-gray max-w-none"><p class="text-gray-700 text-base leading-relaxed content-text mb-6 svelte-jxl47l">${escape(getFullContent(item))}</p> </div>` : ``}  ${item?.Keyword ? `<div class="flex flex-wrap gap-2 mb-6">${each(
      typeof item.Keyword === "string" ? item.Keyword.split(",") : item.Keyword,
      (keyword) => {
        return `<span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">${escape(keyword.trim())} </span>`;
      }
    )} </div>` : ``}  ${item?.website || item?.link ? `<div class="mt-auto"><a${add_attribute("href", item?.website || item?.link, 0)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"><span data-svelte-h="svelte-3q99z1">Learn More</span> ${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ph:arrow-up-right",
        class: "ml-2 w-4 h-4"
      },
      {},
      {}
    )}</a> </div>` : ``} </div></div> </div>`;
  })}</div>  ${totalPages > 1 ? ` <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 lg:hidden"><button ${currentPage === 1 ? "disabled" : ""} class="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-xl shadow-lg border border-white/30 text-gray-700 font-semibold transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed svelte-jxl47l">${validate_component(Icon, "Icon").$$render($$result, { icon: "ph:arrow-left", class: "w-5 h-5" }, {}, {})} <span data-svelte-h="svelte-qh4n5b">Previous</span></button> <div class="glass-effect px-6 py-3 rounded-xl shadow-lg border border-white/30 svelte-jxl47l"><span class="text-lg font-bold text-gray-800">${escape(currentPage)} / ${escape(totalPages)}</span></div> <button ${currentPage === totalPages ? "disabled" : ""} class="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-xl shadow-lg border border-white/30 text-gray-700 font-semibold transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed svelte-jxl47l"><span data-svelte-h="svelte-1pet1fv">Next</span> ${validate_component(Icon, "Icon").$$render($$result, { icon: "ph:arrow-right", class: "w-5 h-5" }, {}, {})}</button></div>   <nav aria-label="Pagination" class="hidden lg:flex justify-center"><div class="flex items-center space-x-2 glass-effect rounded-xl p-2 shadow-lg border border-white/30 svelte-jxl47l"><button class="p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" ${currentPage === 1 ? "disabled" : ""} aria-label="First page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-double-left-bold",
      class: "w-5 h-5"
    },
    {},
    {}
  )}</button> <button class="p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" ${currentPage === 1 ? "disabled" : ""} aria-label="Previous page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-left-bold",
      class: "w-5 h-5"
    },
    {},
    {}
  )}</button> ${each(pageNumbers, (pageNum) => {
    return `${pageNum === DOTS ? `<span class="px-3 py-2 text-gray-400 text-lg font-bold">${escape(DOTS)}</span>` : `<button class="${escape(
      null_to_empty(`min-w-[3rem] h-12 rounded-lg text-lg font-bold transition-all duration-300 ${pageNum === currentPage ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg" : "text-gray-700 hover:bg-white/50"}`),
      true
    ) + " svelte-jxl47l"}" ${pageNum === currentPage ? "disabled" : ""}${add_attribute("aria-label", `Page ${pageNum}`, 0)}${add_attribute("aria-current", pageNum === currentPage ? "page" : void 0, 0)}>${escape(pageNum)} </button>`}`;
  })} <button class="p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" ${currentPage >= totalPages ? "disabled" : ""} aria-label="Next page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-right-bold",
      class: "w-5 h-5"
    },
    {},
    {}
  )}</button> <button class="p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" ${currentPage >= totalPages ? "disabled" : ""} aria-label="Last page">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:caret-double-right-bold",
      class: "w-5 h-5"
    },
    {},
    {}
  )}</button></div></nav>` : ``}`}`}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(Partnersweb, "Partners").$$render($$result, { data }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5flncD3D.js.map
