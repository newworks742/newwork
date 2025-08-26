<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	export let data;
	console.log(data,'<--Partners data')

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
	
	function getFullContent(item) {
		if (!item) return '';
		
		// Try multiple content fields in order of preference
		const contentSources = [
			item.content,
			item.previewText,
			item.description,
			item.summary
		];
		
		for (let content of contentSources) {
			if (content) {
				return stripHtml(content);
			}
		}
		
		return '';
	}
</script>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.partner-card {
		animation: fadeInUp 0.6s ease-out forwards;
		animation-fill-mode: both;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.partner-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	.partner-logo {
		filter: grayscale(20%);
		transition: all 0.4s ease;
	}

	.partner-card:hover .partner-logo {
		filter: grayscale(0%);
		transform: scale(1.05);
	}

	.content-text {
		line-height: 1.7;
		word-break: break-word;
	}

	.gradient-bg {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.glass-effect {
		backdrop-filter: blur(10px);
		background: rgba(255, 255, 255, 0.9);
	}

	@media (max-width: 640px) {
		.partner-card {
			animation: slideIn 0.5s ease-out forwards;
		}
	}
</style>

<div class="min-h-screen ">
	<div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
		{#if !records || (records?.length === 0 && !searchQuery)}
			<div class="flex flex-col items-center justify-center py-16 sm:py-20">
				<div class="glass-effect rounded-2xl p-8 sm:p-12 text-center shadow-xl max-w-md mx-auto border border-white/20">
					<Icon icon="ph:handshake" width="64" height="64" class="text-indigo-400 mx-auto mb-6" />
					<h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No Partners Available</h3>
					<p class="text-gray-600 leading-relaxed">
						We're building partnerships. Check back soon to see our network.
					</p>
				</div>
			</div>
		{:else if searchQuery && records.length === 0}
			<div class="flex flex-col items-center justify-center py-16 sm:py-20">
				<div class="glass-effect rounded-2xl p-8 sm:p-12 text-center shadow-xl max-w-md mx-auto border border-white/20">
					<Icon icon="ph:magnifying-glass" width="64" height="64" class="text-indigo-400 mx-auto mb-6" />
					<h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No Partners Found</h3>
					<p class="text-gray-600 mb-3 leading-relaxed">
						No partners match <strong class="text-indigo-600">"{searchQuery}"</strong>
					</p>
					<p class="text-sm text-gray-500">Try different search terms</p>
				</div>
			</div>
		{:else}
			<!-- Header -->
           <div class="bg-[url('/banner6.png')] bg-center">

	<div class="text-center  sm:mb-16 py-16 bg-black/50">
		<h1 class="text-3xl md:text-4xl font-bold text-primary-500 t mb-4 sm:mb-6">
			Our Partners
		</h1>
		<p class="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
			Trusted organizations and industry leaders working with us to drive innovation forward
		</p>
	</div>

</div>


			<!-- Partners Grid - Responsive Layout -->
			<div class="space-y-4        sm:space-y-12  sm:mb-16">
				{#each records as item, index (item._id || item.id)}
					<div 
						class="partner-card glass-effect rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/30"
						style="animation-delay: {index * 0.1}s">
						
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
							<!-- Logo Section -->
							<div class="relative overflow-hidden  p-8 sm:p-12 flex items-center justify-center">
								<div class="w-full max-w-sm">
									<img
										src={item.image}
										alt={item?.title || 'Partner logo'}
										class="w-full h-auto  partner-logo"
										loading="lazy"
										on:error={(e) => {
											e.target.src = '/DT.png';
										}}/>
								</div>
								<!-- Decorative Elements -->
								<!-- <div class="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-xl"></div> -->
								<!-- <div class="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl"></div> -->
							</div>
							
							<!-- Content Section -->
							<div class="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
								<div class="mb-4 sm:mb-6">
									<h2 class="text-2xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
										{item?.title || 'Partner Name'}
									</h2>
									{#if item?.location || item?.subtitle}
										<p class="text-base  text-primary-600 font-medium ">
											{item?.location || item?.subtitle || ''}
										</p>
									{/if}
								</div>
								
								{#if getFullContent(item)}
									<div class="prose prose-gray max-w-none">
										<p class="text-gray-700 text-base  leading-relaxed content-text mb-6">
											{getFullContent(item)}
										</p>
									</div>
								{/if}

								<!-- Keywords/Tags -->
								{#if item?.Keyword}
									<div class="flex flex-wrap gap-2 mb-6">
										{#each (typeof item.Keyword === 'string' ? item.Keyword.split(',') : item.Keyword) as keyword}
											<span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
												{keyword.trim()}
											</span>
										{/each}
									</div>
								{/if}

								<!-- Action Button (if needed) -->
								{#if item?.website || item?.link}
									<div class="mt-auto">
										<a 
											href={item?.website || item?.link}
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
											<span>Learn More</span>
											<Icon icon="ph:arrow-up-right" class="ml-2 w-4 h-4" />
										</a>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<!-- Mobile Pagination -->
				<div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 lg:hidden">
					<button
						on:click={() => changePage(currentPage - 1)}
						disabled={currentPage === 1}
						class="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-xl shadow-lg border border-white/30 text-gray-700 font-semibold transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
						<Icon icon="ph:arrow-left" class="w-5 h-5" />
						<span>Previous</span>
					</button>
					
					<div class="glass-effect px-6 py-3 rounded-xl shadow-lg border border-white/30">
						<span class="text-lg font-bold text-gray-800">
							{currentPage} / {totalPages}
						</span>
					</div>
					
					<button
						on:click={() => changePage(currentPage + 1)}
						disabled={currentPage === totalPages}
						class="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-xl shadow-lg border border-white/30 text-gray-700 font-semibold transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
						<span>Next</span>
						<Icon icon="ph:arrow-right" class="w-5 h-5" />
					</button>
				</div>

				<!-- Desktop Pagination -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<nav
					aria-label="Pagination"
					class="hidden lg:flex justify-center"
					on:keydown={handleKeyDown}>
					<div class="flex items-center space-x-2 glass-effect rounded-xl p-2 shadow-lg border border-white/30">
						<button
							class="p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							on:click={() => changePage(1)}
							disabled={currentPage === 1}
							aria-label="First page">
							<Icon icon="ph:caret-double-left-bold" class="w-5 h-5" />
						</button>
						
						<button
							class="p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							on:click={() => changePage(currentPage - 1)}
							disabled={currentPage === 1}
							aria-label="Previous page">
							<Icon icon="ph:caret-left-bold" class="w-5 h-5" />
						</button>
						
						{#each pageNumbers as pageNum}
							{#if pageNum === DOTS}
								<span class="px-3 py-2 text-gray-400 text-lg font-bold">{DOTS}</span>
							{:else}
								<button
									on:click={() => changePage(pageNum)}
									class={`min-w-[3rem] h-12 rounded-lg text-lg font-bold transition-all duration-300 ${
										pageNum === currentPage
											? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
											: 'text-gray-700 hover:bg-white/50'
									}`}
									disabled={pageNum === currentPage}
									aria-label={`Page ${pageNum}`}
									aria-current={pageNum === currentPage ? 'page' : undefined}>
									{pageNum}
								</button>
							{/if}
						{/each}
						
						<button
							class="p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							on:click={() => changePage(currentPage + 1)}
							disabled={currentPage >= totalPages}
							aria-label="Next page">
							<Icon icon="ph:caret-right-bold" class="w-5 h-5" />
						</button>
						
						<button
							class="p-3 rounded-lg text-gray-600 hover:bg-white/50 hover:text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							on:click={() => changePage(totalPages)}
							disabled={currentPage >= totalPages}
							aria-label="Last page">
							<Icon icon="ph:caret-double-right-bold" class="w-5 h-5" />
						</button>
					</div>
				</nav>
			{/if}
		{/if}
	</div>
</div>