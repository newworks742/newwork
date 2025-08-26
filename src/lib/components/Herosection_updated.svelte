<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import heroData from '$lib/data/herosection.json';
    
    const { heroSliderData, sliderSettings } = heroData;
    
    let currentIndex = 0;
    let interval;
    let titleInterval;
    
    // Get current slide data
    $: currentSlide = heroSliderData[currentIndex];
    $: isContentLeft = currentIndex % 2 === 0; // Alternate content position
    
    // Typewriter effect for title
    let displayedTitle = '';
    let isTyping = false;
    
    function typewriterEffect(text) {
        if (isTyping) return;
        
        isTyping = true;
        displayedTitle = '';
        let charIndex = 0;
        
        const typeChar = () => {
            if (charIndex < text.length) {
                displayedTitle += text[charIndex];
                charIndex++;
                setTimeout(typeChar, 30); 
            } else {
                isTyping = false;
            }
        };
        
        typeChar();
    }
    
    // Trigger typewriter effect when slide changes
    $: if (currentSlide && currentSlide.content.title) {
        typewriterEffect(currentSlide.content.title);
    }
    
    onMount(() => {
        // Initialize first title
        if (heroSliderData[0]) {
            typewriterEffect(heroSliderData[0].content.title);
        }
        
        // Slide interval
        interval = setInterval(() => {
            currentIndex = currentIndex === heroSliderData.length - 1 ? 0 : currentIndex + 1;
        }, sliderSettings.autoplaySpeed);
    });
    
    onDestroy(() => {
        if (interval) clearInterval(interval);
        if (titleInterval) clearInterval(titleInterval);
    });
    
    function goToSlide(index) {
        currentIndex = index;
    }
    
    // Custom transition function for horizontal slide
    function slideTransition(node, { direction = 'left', duration = 800 }) {
        const startX = direction === 'left' ? -100 : 100;
        
        return {
            duration,
            css: (t) => {
                const x = startX * (1 - t);
                return `
                    transform: translateX(${x}%);
                    opacity: ${t};
                `;
            }
        };
    }
</script>

<div class="relative w-full max-w-7xl mx-auto overflow-hidden">
    <!-- Background Video Container -->
    <div class="absolute inset-0 z-0">
        {#each heroSliderData as slide, index}
            {#if index === currentIndex}
                <video
                    autoplay
                    muted
                    loop
                    playsinline
                    class="absolute inset-0 w-full h-full object-cover object-center"
                    transition:fade={{ duration: 2000 }}
                >
                    <source src={slide.video} type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            {/if}
        {/each}
    </div>
    
    <!-- Overlay to darken video -->
    <div class="absolute inset-0 bg-black bg-opacity-50 z-5"></div>
    
    <div class="relative w-full min-h-[400px] lg:min-h-[400px] lg:max-h-[500px] z-10 flex items-center py-8">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                <!-- Content Section -->
                <div class={`${isContentLeft ? 'lg:order-1' : 'lg:order-2'} text-white z-20 flex flex-col justify-center`}>
                    {#key currentIndex}
                        <div in:slideTransition={{ 
                            direction: isContentLeft ? 'left' : 'right', 
                            duration: 2000 
                        }}>
                            <!-- Title with reduced spacing -->
                            <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 min-h-[80px] sm:min-h-[100px] lg:min-h-[100px]">
                                <span class="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                                    {displayedTitle}
                                </span>
                            </h1>
                            
                            <!-- Description with proper spacing -->
                            <p class="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 max-w-2xl font-light">
                                {currentSlide.content.description}
                            </p>
                        </div>
                    {/key}
                </div>
                
                <!-- Image Section with Consistent Sizing -->
                <div class={`${isContentLeft ? 'lg:order-2' : 'lg:order-1'} relative flex items-center justify-center`}>
                    {#key currentIndex}
                        <div 
                            in:slideTransition={{ 
                                direction: isContentLeft ? 'right' : 'left', 
                                duration: 2000 
                            }} 
                            class="relative w-full mx-auto"
                        >
                            <!-- Decorative background -->
                            <div class="absolute -inset-4 rounded-2xl blur-xl"></div>
                            <div class="relative">
                                <!-- Large screens - Fixed consistent size -->
                                <div class="hidden lg:block">
                                    <div class="w-[400px] h-[300px] mx-auto rounded-2xl overflow-hidden   ">
                                        <img 
                                            src={currentSlide.image} 
                                            alt="Slide {currentIndex + 1}" 
                                            class="w-full h-full object-contain hover:scale-105 transition-transform duration-700 p-2"
                                        />
                                    </div>
                                </div>
                                
                                <!-- Medium screens - Fixed consistent size -->
                                <div class="hidden sm:block lg:hidden">
                                    <div class="w-[350px] h-[260px] mx-auto rounded-2xl overflow-hidden  bg-gray-900/20 backdrop-blur-sm">
                                        <img 
                                            src={currentSlide.image} 
                                            alt="Slide {currentIndex + 1}" 
                                            class="w-full h-full object-contain hover:scale-105 transition-transform duration-700 p-2"
                                        />
                                    </div>
                                </div>
                                
                                <!-- Small screens - Fixed consistent size -->
                                <div class="block sm:hidden">
                                    <div class="w-[280px] h-[210px] mx-auto rounded-xl overflow-hidden  bg-gray-900/20 backdrop-blur-sm">
                                        <img 
                                            src={currentSlide.image} 
                                            alt="Slide {currentIndex + 1}" 
                                            class="w-full h-full object-contain p-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/key}
                </div>
            </div>
        </div>
    </div>
    
    <!-- Navigation Dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
        {#each heroSliderData as _, index}
            <button
                on:click={() => goToSlide(index)}
                class={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                        ? 'bg-white scale-125 shadow-lg' 
                        : 'bg-white/40 hover:bg-white/70 hover:scale-110'
                }`}
                aria-label="Go to slide {index + 1}"
            />
        {/each}
    </div>
</div>