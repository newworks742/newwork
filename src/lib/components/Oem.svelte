<script>
	import Icon from '@iconify/svelte';
	import { onMount, tick } from 'svelte';

	// OEM company data with logos and links
	const oemCompanies = [
		{
			logoFile: 'crobot technologies.png',
			name: 'Crobot Technologies',
			url: 'https://crobottech.com/'
		},
		{
			logoFile: 'Digilent.png',
			name: 'Digilent',
			url: 'https://digilent.com'
		},
		{
			logoFile: 'Mantiswave.png',
			name: 'Mantiswave',
			url: 'https://mantiswave.com'
		},
		{
			logoFile: 'NI.png',
			name: 'National Instruments',
			url: 'https://ni.com'
		},
		{
			logoFile: 'ST.png',
			name: 'STMicroelectronics',
			url: 'https://st.com'
		},
		{
			logoFile: 'Tmytek.png',
			name: 'Tmytek',
			url: 'https://tmytek.com'
		},
		{
			logoFile: 'Viavi.png',
			name: 'Viavi Solutions',
			url: 'https://viavisolutions.com'
		}
	];

	// Generate order details from the company data
	const orderDetails = oemCompanies.map((company, i) => ({
		id: i + 1,
		logo: `/oem/${company.logoFile}`,
		manName: company.name,
		url: company.url,
		urlName: company.name.toLowerCase().replace(/\s+/g, '-')
	}));

	const totalProducts = orderDetails.length;
	const clonedBefore = [...orderDetails];
	const clonedAfter = [...orderDetails];
	const allProducts = [...clonedBefore, ...orderDetails, ...clonedAfter];

	// Current index in the allProducts array (start with the original products section)
	let absoluteIndex = totalProducts; // Start at the first of the original products
	let isTransitioning = false;

	// Number of cards to display at once (responsive)
	let cardsToShow = 4;

	// Update cards to show based on window width
	function updateCardsToShow() {
		const width = window.innerWidth;
		if (width < 640) {
			// mobile
			cardsToShow = 1;
		} else if (width < 768) {
			// small tablet
			cardsToShow = 2;
		} else if (width < 1024) {
			// tablet/small laptop
			cardsToShow = 3;
		} else {
			// desktop
			cardsToShow = 4;
		}
	}

	// Track the DOM element for the carousel container
	let carouselElement;
	let carouselTrack;

	// Calculate the CSS transform based on the current index
	$: translateX = -1 * (absoluteIndex * (100 / cardsToShow));

	// Handle next button click
	async function nextSlide() {
		if (isTransitioning) return;

		isTransitioning = true;
		absoluteIndex++;

		// If we've reached the clone section at the end, invisibly reset to the original section
		if (absoluteIndex >= totalProducts * 2) {
			// Wait for the transition to finish
			setTimeout(async () => {
				// Remove transition temporarily
				carouselTrack.style.transition = 'none';
				// Jump to the equivalent position in the original section
				absoluteIndex = absoluteIndex - totalProducts;
				// Apply the transform immediately
				carouselTrack.style.transform = `translateX(${-1 * (absoluteIndex * (100 / cardsToShow))}%)`;
				// Force a browser reflow
				void carouselTrack.offsetWidth;
				// Restore the transition
				carouselTrack.style.transition = 'transform 500ms ease-in-out';
				isTransitioning = false;
			}, 500);
		} else {
			setTimeout(() => {
				isTransitioning = false;
			}, 500);
		}
	}

	// Handle previous button click
	async function prevSlide() {
		if (isTransitioning) return;

		isTransitioning = true;
		absoluteIndex--;

		// If we've reached the clone section at the start, invisibly reset to the original section
		if (absoluteIndex < totalProducts) {
			// Wait for the transition to finish
			setTimeout(async () => {
				// Remove transition temporarily
				carouselTrack.style.transition = 'none';
				// Jump to the equivalent position in the original section
				absoluteIndex = absoluteIndex + totalProducts;
				// Apply the transform immediately
				carouselTrack.style.transform = `translateX(${-1 * (absoluteIndex * (100 / cardsToShow))}%)`;
				// Force a browser reflow
				void carouselTrack.offsetWidth;
				// Restore the transition
				carouselTrack.style.transition = 'transform 500ms ease-in-out';
				isTransitioning = false;
			}, 500);
		} else {
			setTimeout(() => {
				isTransitioning = false;
			}, 500);
		}
	}

	// Auto-play functionality
	let autoplayInterval;
	const autoplayDelay = 3000; // Increased to 3 seconds for better UX

	// Function to calculate what slide we're on for the indicators
	$: currentSlideIndex = (absoluteIndex - totalProducts + totalProducts) % totalProducts;

	onMount(() => {
		updateCardsToShow();

		// Get reference to carousel track element
		carouselTrack = carouselElement.querySelector('.carousel-track');

		// Update on resize
		window.addEventListener('resize', updateCardsToShow);

		// Start automatic sliding
		autoplayInterval = setInterval(() => {
			nextSlide();
		}, autoplayDelay);

		return () => {
			window.removeEventListener('resize', updateCardsToShow);
			if (autoplayInterval) clearInterval(autoplayInterval);
		};
	});

	// Handle click on logo (alternative to href if you need custom behavior)
	function handleLogoClick(product, event) {
		// You can add custom analytics or other logic here before navigation
		console.log(`Clicking on ${product.manName}`);
		// The href attribute will handle the actual navigation
	}
</script>

<div class="mx-auto mt-8">
	<div class="flex justify-between items-center mb-2">
		<h1
			class="pb-6 sm:text-xl text-lg font-bold uppercase text-gray-900 relative after:content-[''] after:absolute after:bottom-4 after:left-0 after:w-24 after:h-1 after:bg-primary-600"
		>
			Our OEM partners
		</h1>

		<!-- Navigation buttons (uncomment if you want manual controls) -->
		<!-- <div class="flex gap-3">
			<button
				on:click={prevSlide}
				class="bg-white text-primary-800 p-2 rounded-md shadow hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
				aria-label="Previous slide"
				disabled={isTransitioning}
			>
				<Icon icon="heroicons:chevron-left-solid" width="24" height="24" />
			</button>

			<button
				on:click={nextSlide}
				class="bg-white text-primary-800 p-2 rounded-md shadow hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
				aria-label="Next slide"
				disabled={isTransitioning}
			>
				<Icon icon="heroicons:chevron-right-solid" width="24" height="24" />
			</button>
		</div> -->
	</div>
	<!-- <p class="text-base mb-4">We've been at the forefront of shaping the future of AI and work. Whether for startups or Fortune 500 companies, we're empowering our members to envision new possibilities in their work.</p> -->

	<div class="relative overflow-hidden" bind:this={carouselElement}>
		<div
			class="carousel-track flex transition-transform duration-500 ease-in-out"
			style="transform: translateX({translateX}%)"
		>
			{#each allProducts as product, i}
				<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 flex-shrink-0">
					<a
						href={product.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block bg-white rounded-lg shadow overflow-hidden h-full border hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
						title="Visit {product.manName}"
					>
						<div
							class="h-20 px-5 py-2 overflow-hidden group-hover:bg-gray-50 transition-colors duration-300"
						>
							<img
								src={product.logo}
								alt={product.manName}
								onerror="this.src='/DT.png'"
								class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
								loading={i < totalProducts * 2 ? 'eager' : 'lazy'}
							/>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>

	<!-- Optional: Slide indicators -->
	<div class="flex justify-center mt-4 space-x-2">
		{#each Array(totalProducts) as _, i}
			<button
				class="w-2 h-2 rounded-full transition-colors duration-200 {currentSlideIndex === i
					? 'bg-primary-600'
					: 'bg-gray-300'}"
				on:click={() => {
					if (!isTransitioning) {
						absoluteIndex = totalProducts + i;
					}
				}}
				aria-label="Go to slide {i + 1}"
			/>
		{/each}
	</div>
</div>
