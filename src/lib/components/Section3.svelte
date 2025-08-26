<script>
    import { onMount } from 'svelte';

    let pocCount = 0;
    let collaborationsCount = 0;
    let integrationCount = 0;
    let trainingCount = 0;
    let centersCount = 0;
    let learnersCount = 0;
    let cardsVisible = [false, false, false, false, false, false];
    let componentElement;
    let animationStarted = false;

    const animateCounter = (target, current, increment, callback) => {
        if (current < target) {
            setTimeout(() => {
                callback(current + increment);
                animateCounter(target, current + increment, increment, callback);
            }, 50);
        }
    };

    const showCard = (index) => {
        cardsVisible[index] = true;
        cardsVisible = [...cardsVisible];
    };

    const startAnimations = () => {
        if (animationStarted) return;
        animationStarted = true;

        // Staggered card animations
        setTimeout(() => {
            showCard(0);
            animateCounter(5, 0, 1, (val) => pocCount = val);
        }, 500);

        setTimeout(() => {
            showCard(1);
            animateCounter(25, 0, 1, (val) => collaborationsCount = val);
        }, 700);

        setTimeout(() => {
            showCard(2);
            animateCounter(15, 0, 1, (val) => integrationCount = val);
        }, 900);

        setTimeout(() => {
            showCard(3);
            animateCounter(100, 0, 5, (val) => trainingCount = val);
        }, 1100);

        setTimeout(() => {
            showCard(4);
            animateCounter(20, 0, 1, (val) => centersCount = val);
        }, 1300);

        setTimeout(() => {
            showCard(5);
            animateCounter(5000, 0, 100, (val) => learnersCount = val);
        }, 1500);
    };

    const checkIntersection = () => {
        if (!componentElement || animationStarted) return;
        
        const rect = componentElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if 50% of the component is visible
        const componentCenter = rect.top + rect.height / 2;
        const isHalfVisible = componentCenter <= windowHeight && componentCenter >= 0;
        
        if (isHalfVisible) {
            startAnimations();
        }
    };

    onMount(() => {
        // Check immediately on mount
        checkIntersection();
        
        // Add scroll listener
        window.addEventListener('scroll', checkIntersection);
        window.addEventListener('resize', checkIntersection);
        
        return () => {
            window.removeEventListener('scroll', checkIntersection);
            window.removeEventListener('resize', checkIntersection);
        };
    });
</script>

<div bind:this={componentElement} class="w-full px-8 py-4 relative bg-gray-50">
    
    <div class="relative w-full max-w-6xl mx-auto">
        
        <!-- Central Hub - Reduced size with shadow -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20  hover:shadow-2xl shadow-2xl">
            <div class="w-20 h-20 bg-black rounded-2xl shadow-xl flex items-center justify-center">
                <img src="/DT.png" alt="DT" class="w-16 h-16 rounded-xl"/>
            </div>
        </div>
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 500">
            <line x1="400" y1="250" x2="150" y2="80" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line" style="animation-delay: 0.5s"/>
            <line x1="400" y1="250" x2="650" y2="80" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line" style="animation-delay: 0.7s"/>
            <line x1="400" y1="250" x2="120" y2="250" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line" style="animation-delay: 0.9s"/>
            <line x1="400" y1="250" x2="680" y2="250" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line" style="animation-delay: 1.1s"/>
            <line x1="400" y1="250" x2="150" y2="420" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line" style="animation-delay: 1.3s"/>
            <line x1="400" y1="250" x2="650" y2="420" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line" style="animation-delay: 1.5s"/>
        </svg>
        <div class="relative h-[500px]">
            
            <div class="absolute top-[20px] left-[50px] w-52 transition-all duration-700 {cardsVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
                <div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-2 text-center">
                        <div class="text-2xl font-bold mb-1">{pocCount}+</div>
                    </div>
                    <div class="p-4 text-center">
                        <div class="text-gray-700 font-medium text-sm leading-relaxed">
                            Proof-of-Concept (PoC)<br/>
                            Developments Supported
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute top-[20px] right-[50px] w-52 transition-all duration-700 {cardsVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
                <div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-2 text-center">
                        <div class="text-2xl font-bold mb-1">{collaborationsCount}+</div>
                    </div>
                    <div class="p-4 text-center">
                        <div class="text-gray-700 font-medium text-sm leading-relaxed">
                            Collaborations with R&D<br/>
                            Centers Across India
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute top-1/2 left-[20px] w-52 transform -translate-y-1/2 transition-all duration-700 {cardsVisible[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}">
                <div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div class="bg-gradient-to-r from-primary-700 to-primary-800 text-white p-2 text-center">
                        <div class="text-2xl font-bold mb-1">{integrationCount}+</div>
                    </div>

                    <div class="p-4 text-center">
                        <div class="text-gray-700 font-medium text-sm leading-relaxed">
                            Seamless System<br/>
                            Integration Projects<br/>
                            Completed
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute top-1/2 right-[20px] w-52 transform -translate-y-1/2 transition-all duration-700 {cardsVisible[3] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}">
                <div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div class="bg-gradient-to-r from-primary-700 to-primary-800 text-white p-2 text-center">
                        <div class="text-2xl font-bold mb-1">{trainingCount}+</div>
                    </div>
                    <div class="p-4 text-center">
                        <div class="text-gray-700 font-medium text-sm leading-relaxed">
                            Industry-Focused<br/>
                            Training Programs<br/>
                            Conducted
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute bottom-[0px] left-[50px] w-52 transition-all duration-700 {cardsVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}">
                <div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div class="bg-gradient-to-r from-primary-800 to-primary-900 text-white p-2 text-center">
                        <div class="text-2xl font-bold mb-1">{centersCount}+</div>
                    </div>
                    <!-- Content Section -->
                    <div class="p-4 text-center">
                        <div class="text-gray-700 font-medium text-sm leading-relaxed">
                            Centers of Excellence (CoEs)<br/>
                            Established Nationwide
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Right - Learners -->
            <div class="absolute bottom-[20px] right-[50px] w-52 transition-all duration-700 {cardsVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}">
                <div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <!-- Count Section -->
                    <div class="bg-gradient-to-r from-primary-800 to-primary-900 text-white p-2 text-center">
                        <div class="text-2xl font-bold mb-1">{learnersCount.toLocaleString()}+</div>
                    </div>
                    <!-- Content Section -->
                    <div class="p-4 text-center">
                        <div class="text-gray-700 font-medium text-sm leading-relaxed">
                            Learners Empowered via<br/>
                            SkillsBlock.in Platform
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes spread-lines {
        0% {
            stroke-dashoffset: 200;
            opacity: 0;
        }
        30% {
            opacity: 0.4;
        }
        100% {
            stroke-dashoffset: 0;
            opacity: 0.7;
        }
    }
    
    .animate-spread-line {
        animation: spread-lines 2s ease-out forwards;
        opacity: 0;
        stroke-dasharray: 6,4;
    }
</style>