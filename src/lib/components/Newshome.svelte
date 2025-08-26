<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	export let data;
let PUBLIC_COMPBUY_IMAGE_PATH = "Digitoad"
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

	const handleSearch = (e) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			const query = searchQuery.trim();
			const newUrl = new URL(window.location.href);
			newUrl.searchParams.delete('page');
			newUrl.searchParams.delete('filter');

			if (query.length > 0) {
				newUrl.searchParams.set('search', query);
			} else {
				newUrl.searchParams.delete('search');
			}
			goto(newUrl.toString(), {
				invalidateAll: true,
				replaceState: true,
				keepfocus: true,
				noScroll: true
			});
		}, 800);
	};

	const cancelSearch = () => {
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.delete('search');
		newUrl.searchParams.delete('page');
	  searchQuery = '';
		goto(newUrl.toString(), {
			replaceState: true,
			keepfocus: true,
			noScroll: true,
			invalidateAll: true
		});
	};

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
			return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;
		}
		const plainText = stripHtml(text);
		return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;
	}

	function formatDate(dateString) {
		if (!dateString) return '';
		try {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch (e) {
			console.error('Invalid date format:', dateString);
			return '';
		}
	}
</script>

<!-- Enhanced Container with Better Spacing -->
<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
	<div class="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
		<!-- Enhanced Header Section -->
		<div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 lg:mb-12">
			<div class="space-y-2">
				<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
					Events
				</h1>
				<p class="text-gray-600 text-sm sm:text-base">Discover upcoming events and stay updated</p>
			</div>
			
			<!-- Enhanced Search Box -->
			<div class="w-full lg:w-80 xl:w-96 relative group">
				<div class="relative flex items-center">
					<Icon 
						icon="ph:magnifying-glass" 
						class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" 
						width="20" 
						height="20"
					/>
					<input
						type="text"
						placeholder="Search events by title or keywords..."
						bind:value={searchQuery}
						on:input={(e) => handleSearch(e)}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleSearch(e);
							}
						}}
						class="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl text-sm bg-white/80 backdrop-blur-sm outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-400"
						aria-label="Search Events by title or keywords"
					/>
					{#if searchQuery}
						<button 
							class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-red-100 hover:text-red-600 transition-all duration-200 group"
							aria-label="Clear search" 
							type="button" 
							on:click={cancelSearch}
						>
							<Icon icon="ph:x-bold" class="text-sm text-gray-500 group-hover:text-red-600" />
						</button>
					{/if}
				</div>
			</div>
		</div>

		<!-- Empty States with Enhanced Design -->
		{#if !records || (records?.length === 0 && !searchQuery)}
			<div class="mt-12 flex flex-col items-center bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 justify-center p-12 text-center max-w-2xl mx-auto">
				<div class="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
					<Icon icon="ph:calendar-blank" width="48" height="48" class="text-primary-600" />
				</div>
				<h3 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">No Events Available</h3>
				<p class="text-gray-600 max-w-md text-base sm:text-lg leading-relaxed">
					There are currently no events to display. Please check back later for exciting upcoming events.
				</p>
			</div>
		{:else if searchQuery && records.length === 0}
			<div class="mt-12 flex flex-col items-center bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 justify-center p-12 text-center max-w-2xl mx-auto">
				<div class="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-6">
					<Icon icon="ph:magnifying-glass" width="48" height="48" class="text-orange-600" />
				</div>
				<h3 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">No Results Found</h3>
				<p class="text-gray-600 max-w-md text-base leading-relaxed mb-4">
					We couldn't find any events matching <span class="font-semibold text-gray-800">"{searchQuery}"</span>. Try a different search term or explore all events.
				</p>
				<button 
					class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl" 
					on:click={cancelSearch}
				>
					Clear Search
				</button>
			</div>
		{:else}
			<!-- Enhanced Events Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 mb-16">
				{#each records as item (item._id || item.id)}
					<a
						href={`events/${item.newsLink}`}
						class="group flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary-200 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
					>
						<!-- Enhanced Image Section -->
						<div class="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
							<img
								src={`${PUBLIC_COMPBUY_IMAGE_PATH}/part/${item?.image}`}
								alt={item?.title || 'Event image'}
								class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
								loading="lazy"
								on:error={(e) => {
									e.target.src = '/DT.png';
								}}
							/>
							<!-- Gradient Overlay -->
							<div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							
							<!-- Date Badge -->
							<div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
								<div class="flex items-center space-x-2">
									<Icon icon="ph:calendar-dots" class="text-primary-500" width="16" height="16" />
									<span class="text-xs font-semibold text-gray-700">
										{new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
									</span>
								</div>
							</div>
						</div>

						<!-- Enhanced Content Section -->
						<div class="flex flex-col flex-grow p-6">
							<h2 class="font-bold text-xl sm:text-2xl mb-4 line-clamp-2 text-gray-800 group-hover:text-primary-600 transition-colors duration-300 leading-tight">
								{item?.title || 'Untitled Event'}
							</h2>
							
							<p class="text-gray-600 mb-6 flex-grow line-clamp-3 text-sm sm:text-base leading-relaxed">
								{#if browser}
									{truncateText(item?.previewText || 'No description available', 120)}
								{/if}
							</p>

							<!-- Enhanced Date Range -->
							<div class="mt-auto pt-4 border-t border-gray-200/70">
								<div class="flex items-center justify-between">
									<div class="flex items-center text-sm text-gray-500">
										<Icon icon="ph:clock" class="mr-2 text-primary-500" width="16" height="16" />
										<span class="font-medium">
											{formatDate(item.startDate)}
											{#if item.endDate && item.endDate !== item.startDate}
												- {formatDate(item.endDate)}
											{/if}
										</span>
									</div>
									<Icon icon="ph:arrow-right" class="text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" width="18" height="18" />
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>

			<!-- Enhanced Pagination -->
			{#if totalPages > 1}
				<!-- Mobile Pagination -->
				<div class="flex justify-between items-center mb-6 md:hidden bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100">
					<button
						on:click={() => changePage(currentPage - 1)}
						disabled={currentPage === 1}
						class="flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
					>
						<Icon icon="ph:caret-left" class="mr-2" width="16" height="16" />
						Previous
					</button>
					
					<div class="flex flex-col items-center">
						<span class="text-sm text-gray-600 mb-1">Page</span>
						<span class="font-bold text-lg text-gray-800">{currentPage} of {totalPages}</span>
					</div>
					
					<button
						on:click={() => changePage(currentPage + 1)}
						disabled={currentPage === totalPages}
						class="flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
					>
						Next
						<Icon icon="ph:caret-right" class="ml-2" width="16" height="16" />
					</button>
				</div>

				<!-- Desktop Pagination -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<nav
					aria-label="Pagination"
					class="hidden md:flex justify-center"
					on:keydown={handleKeyDown}
				>
					<div class="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100">
						<!-- First Page -->
						<button
							class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700"
							on:click={() => changePage(1)}
							disabled={currentPage === 1}
							aria-label="First page"
						>
							<Icon icon="ph:caret-double-left-bold" class="w-4 h-4" />
						</button>
						
						<!-- Previous Page -->
						<button
							class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700"
							on:click={() => changePage(currentPage - 1)}
							disabled={currentPage === 1}
							aria-label="Previous page"
						>
							<Icon icon="ph:caret-left-bold" class="w-4 h-4" />
						</button>
						
						<!-- Page Numbers -->
						{#each pageNumbers as page}
							{#if page === DOTS}
								<span class="px-3 py-2 text-gray-500 text-sm font-medium">{DOTS}</span>
							{:else}
								<button
									on:click={() => changePage(page)}
									class={`flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg text-sm font-medium shadow-sm border transition-all duration-300 ${
										page === currentPage
											? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500 shadow-lg'
											: 'bg-white/80 text-gray-800 border-gray-200 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg'
									}`}
									disabled={page === currentPage}
									aria-label={`Page ${page}`}
									aria-current={page === currentPage ? 'page' : undefined}
								>
									{page}
								</button>
							{/if}
						{/each}
						
						<!-- Next Page -->
						<button
							class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700"
							on:click={() => changePage(currentPage + 1)}
							disabled={currentPage >= totalPages}
							aria-label="Next page"
						>
							<Icon icon="ph:caret-right-bold" class="w-4 h-4" />
						</button>
						
						<!-- Last Page -->
						<button
							class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm border border-gray-200 bg-white/80 text-gray-700 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-gray-700"
							on:click={() => changePage(totalPages)}
							disabled={currentPage >= totalPages}
							aria-label="Last page"
						>
							<Icon icon="ph:caret-double-right-bold" class="w-4 h-4" />
						</button>
					</div>
				</nav>
			{/if}
		{/if}
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	

	
	/* Custom scrollbar for webkit browsers */
	::-webkit-scrollbar {
		width: 6px;
	}
	
	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3px;
	}
	
	::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3px;
	}
	
	::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
</style>