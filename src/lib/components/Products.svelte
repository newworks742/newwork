<script>
	import Icon from '@iconify/svelte';
	import { PUBLIC_COMPBUY_IMAGE_PATH } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	export let data;
	console.log(data,'<--News data')

	let records = [];
	let totalCount = 0;
	let filteredRecords = [];

	$: if (data) {
		if (!searchQuery || searchQuery.trim().length === 0) {
			({ records, totalCount } = data);
		} else {
			records = filteredRecords;
			totalCount = filteredRecords?.length;
		}
	}

	let currentPage = parseInt($page.url.searchParams.get('page')) || 1;
	let searchQuery = $page.url.searchParams.get('search') || '';
	
	let timeout;
	
	const DOTS = '...';
	const VISIBLE_PAGES = 5;

	$: totalPages = isNaN(totalCount) ? 1 : Math.ceil(totalCount / 12);

	$: {
		if (data && data.records) {
			if (searchQuery && searchQuery.trim().length > 0) {
				const query = searchQuery.toLowerCase().trim();
				filteredRecords = data.records.filter(item => {
					const titleMatch = item.title && item.title.toLowerCase().includes(query);

					let keywordMatch = false;
					if (item.Keyword) {
						if (typeof item.Keyword === 'string') {
							// Split by comma and check each keyword
							const keywords = item.Keyword.split(',').map(k => k.trim().toLowerCase());
							keywordMatch = keywords.some(keyword => keyword.includes(query));
						} else if (Array.isArray(item.Keyword)) {
							keywordMatch = item.Keyword.some(keyword => 
								keyword.toLowerCase().includes(query)
							);
						}
					}

					const previewMatch = item.previewText && 
						stripHtml(item.previewText).toLowerCase().includes(query);

					return titleMatch || keywordMatch || previewMatch;
				});
			} else {
				filteredRecords = data?.records || [];
			}
		} else {
			filteredRecords = [];
		}
	}



	const changePage = (page) => {
		currentPage = page;
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set('page', currentPage);

		if (currentPage === 1) {
			newUrl.searchParams.delete('page');
		} else {
			newUrl.searchParams.set('page', currentPage);
		}

		goto(newUrl.toString(), {
		replaceState: true,
		keepfocus: true,
		noScroll: true  
		}).then(() => {
			scrollToTop();
		});
	};
	
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	
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

	$: pageNumbers = getPageRange(currentPage, totalPages);
	
	function handleKeyDown(e) {
		if (e.key === 'ArrowLeft' && currentPage > 1) {
			changePage(currentPage - 1);
		} else if (e.key === 'ArrowRight' && currentPage < totalPages) {
			changePage(currentPage + 1);
		}
	}
	
	function stripHtml(html) {
		if (!html) return '';
		if (typeof window === 'undefined') {
			return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
		}
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = html;
		return tempDiv.textContent || tempDiv.innerText || '';
	}
	
	function truncateText(text, maxLength) {
	if (!text) return '';
		if (typeof window === 'undefined') {
			const plainText = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
			return plainText;
		}
		const plainText = stripHtml(text);
		return plainText;
	}
</script>

<style>
	@keyframes float-left {
	0%, 100% { transform: translateZ(-20px) scale(0.95) rotate(-2deg); }
	50% { transform: translateZ(20px) scale(1.05) rotate(2deg); }
}

@keyframes float-right {
	0%, 100% { transform: translateZ(-20px) scale(0.95) rotate(2deg); }
	50% { transform: translateZ(20px) scale(1.05) rotate(-2deg); }
}

@keyframes pulse-glow {
	0%, 100% { filter: brightness(1) saturate(1); }
	50% { filter: brightness(1.1) saturate(1.2); }
}

.animate-float-left {
	animation: float-left 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;
}

.animate-float-right {
	animation: float-right 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;
}

.news-card:hover .animate-float-left,
.news-card:hover .animate-float-right {
	animation: none;
	transform: none;
	filter: none;
	transition: all 0.3s ease;
}

.news-card:hover .news-image {
	transform: scale(1.05);
}

.news-image {
	transition: transform 0.3s ease;
}
</style>

<div class="w-full lg:w-11/12 max-w-7xl mx-auto px-4 sm:py-2">
	{#if !records || (records?.length === 0 && !searchQuery)}
		<div class="mt-8 flex flex-col items-center bg-white rounded-lg shadow-md justify-center p-8 text-center">
			<Icon icon="ph:newspaper" width="72" height="72" class="text-primary-500 mb-4" />
			<h3 class="sm:text-xl text-lg font-medium text-gray-900 mb-2">No news available</h3>
			<p class="text-gray-500 max-w-md sm:text-sm text-xs">
				There are currently no news items to display. Please check back later.
			</p>
		</div>
	{:else if searchQuery && records.length === 0}
		<div class="mt-8 flex flex-col items-center bg-white rounded-lg shadow-md justify-center p-8 text-center overflow-hidden overflow-x-auto">
			<Icon icon="ph:newspaper-clipping" width="72" height="72" class="text-primary-500 mb-4" />
			<h3 class="sm:text-xl text-lg font-medium text-gray-900 mb-2">No news found matching your search</h3>
			<p class="text-gray-500 max-w-md overflow-x-auto ">
				We couldn't find any news with titles matching "{searchQuery}". Please try a different
				search term or
			</p>
		</div>
	{:else}
		<!-- Mobile Grid Layout -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6 mb-12">
			{#each records as item, index (item._id || item.id)}
				<!-- <a
					href={`events/${item.newsLink}`} -->
					<div class="flex flex-col h-full bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-4px] news-card">
					<div class="relative aspect-[3/2] overflow-hidden">
						<img
							src={`${item.image}`}
							alt={item?.title || 'News image'}
							class="w-full h-full object-cover news-image {index % 2 === 0 ? 'animate-float-left' : 'animate-float-right'}"
							loading="lazy"
							on:error={(e) => {
								e.target.src = '/DT.png';
							}}/>
					</div>
					<div class="flex flex-col flex-grow p-5">
						<h2 class="font-bold text-lg mb-3 line-clamp-2 text-gray-800">
							{item?.title || 'Untitled News'}
						</h2>
						<p class="text-gray-600 mb-4 flex-grow line-clamp-3 text-justify">
							{truncateText(item?.content || 'No description available')}
						</p>
					</div>
					</div>
				<!-- </a> -->
			{/each}
		</div>

		<!-- Desktop Alternating Layout -->
		<div class="hidden md:flex flex-col gap-8 mb-12">
			{#each records as item, index (item._id || item.id)}
				<!-- <a
					href={`events/${item.newsLink}`} -->
                    <div class="flex {index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:translate-y-[-2px] news-card group">
					
					
					<!-- Image Section -->
					<div class="w-1/2 lg:w-2/5 relative overflow-hidden">
						<div class="aspect-[4/3] relative p-5  shadow-xl">
							<img
								src={`${item.image}`}
								alt={item?.title || 'News image'}
								class="w-full h-full object-cover news-image {index % 2 === 0 ? 'animate-float-left' : 'animate-float-right'}"
								loading="lazy"
								on:error={(e) => {
									e.target.src = '/DT.png';
								}}/>
						</div>
					</div>
					
					<!-- Content Section -->
					<div class="w-1/2 lg:w-3/5 flex flex-col justify-center p-8 lg:p-12">
						<h2 class="font-bold text-2xl lg:text-3xl mb-4 text-gray-800 line-clamp-3 group-hover:text-primary-600 transition-colors duration-300">
							{item?.title || 'Untitled News'}
						</h2>
						<p class="text-gray-600 text-lg leading-relaxed line-clamp-4 mb-6">
							{truncateText(item?.content || 'No description available')}
						</p>
					
					</div>
				<!-- </a> -->
                 </div>
			{/each}
		</div>

		{#if totalPages > 1}
			<div class="flex justify-between items-center mb-3 mt-4 md:hidden">
				<button
					on:click={() => changePage(currentPage - 1)}
					disabled={currentPage === 1}
					class="px-5 py-1.5 bg-primary-600 border-1 disabled:bg-gray-200 disabled:border-gray-200 disabled:hover:text-white disabled:cursor-not-allowed border-primary-700 text-white rounded hover:bg-white hover:text-gray-700">
					Previous
				</button>
				<span>Page {currentPage} of {totalPages}</span>
				<button
					on:click={() => changePage(currentPage + 1)}
					disabled={currentPage === totalPages}
					class="px-5 py-1.5 bg-primary-600 border-1 disabled:bg-gray-200 disabled:border-gray-200 disabled:hover:text-white disabled:cursor-not-allowed border-primary-700 text-white rounded hover:bg-white hover:text-gray-700">
					Next
				</button>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<nav
				aria-label="Pagination"
				class="hidden md:flex justify-center mt-12 mb-6"
				on:keydown={handleKeyDown}>
				<div class="flex items-center justify-center gap-1.5 flex-wrap">
					<button
						class="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						on:click={() => changePage(1)}
						disabled={currentPage === 1}
						aria-label="First page">
						<Icon icon="ph:caret-double-left-bold" class="w-4 h-4" />
					</button>
					<button
						class="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						on:click={() => changePage(currentPage - 1)}
						disabled={currentPage === 1}
						aria-label="Previous page">
						<Icon icon="ph:caret-left-bold" class="w-4 h-4" />
					</button>
					{#each pageNumbers as page}
						{#if page === DOTS}
							<span class="px-2 py-1 text-gray-500 text-sm font-medium">{DOTS}</span>
						{:else}
							<button
								on:click={() => changePage(page)}
								class={`flex h-8 min-w-[2rem] items-center justify-center rounded-md text-sm font-medium shadow-sm border transition-all duration-200 ${
									page === currentPage
										? 'bg-primary-500 text-white border-primary-500 hover:bg-primary-600'
										: 'bg-white text-gray-800 border-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500'
								}`}
								disabled={page === currentPage}
								aria-label={`Page ${page}`}
								aria-current={page === currentPage ? 'page' : undefined}>
								{page}
							</button>
						{/if}
					{/each}
					<button
						class="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						on:click={() => changePage(currentPage + 1)}
						disabled={currentPage >= totalPages}
						aria-label="Next page">
						<Icon icon="ph:caret-right-bold" class="w-4 h-4" />
					</button>
					<button
						class="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium shadow-sm border-1 border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						on:click={() => changePage(totalPages)}
						disabled={currentPage >= totalPages}
						aria-label="Last page">
						<Icon icon="ph:caret-double-right-bold" class="w-4 h-4" />
					</button>
				</div>
			</nav>
		{/if}
	{/if}
</div>