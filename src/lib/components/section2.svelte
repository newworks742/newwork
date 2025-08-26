<script>
	import Icon from "@iconify/svelte";
</script>
<body class="mx-auto p-4 relative">
    <!-- Background Image Container -->
    <div id="background-image" class="background-image object-contain" style="background-image: url('/product.png');"></div>
    
    <div id="background-container" class="transition-all duration-500 ease-in-out relative z-10">
        <div class="flex items-center justify-center ">
            <div class="flex max-w-4xl w-full gap-8">
                <!-- Left side - Laptop with image -->
                <div class="hidden lg:flex lg:w-1/2 items-center justify-center">
                    <div class="w-80 h-60 bg-gray-800 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden">
                        <div class="w-72 h-48 shadow-inner shadow-2xl bg-gray-500 rounded-lg flex items-center justify-center relative">
                            <div class="w-64 h-40  rounded overflow-hidden shadow-inner">
                                <img 
                                    id="laptop-image"
                                    src="/product.png" 
                                    alt="Current Display"
                                    class="w-full h-full object-cover transition-all duration-500"
                                />
                            </div>
                            <!-- Screen reflection effect -->
                            <!-- <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-5"></div> -->
                        </div>
                        <!-- Laptop bottom -->
                        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-700 rounded-t"></div>
                    </div>
                </div>

                <!-- Right side - Menu -->
                <div class="w-full lg:w-1/2">
                    <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
                        <!-- Header -->
                        <div class="relative bg-white px-6 py-5 border-b border-gray-100">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                <h2 class="text-lg font-semibold text-gray-900">What are you looking for?</h2>
                            </div>
                            <div class="absolute -top-2 -right-2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                                 <Icon icon="material-symbols:question-mark" width="24" height="24" class="text-white " />
                            </div>
                        </div>

                        <!-- Menu Items -->
                        <div class="bg-white">
                            <!-- Products - Show expanded by default -->
                            <a href="/products" class="menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2"
                               onmouseenter="changeContent('/product.png', '/product.png', 'products')"
                               onmouseleave="resetToDefault()">
                                  <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                   <Icon icon="codicon:lightbulb" width="24" height="24" class="text-white " />
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold text-gray-900 mb-1 text-lg">Products</h3>
                                    <div id="products-detail" class="menu-detail active">
                                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                                            Looking for something specific? Check out our comprehensive list of available products.
                                        </p>
                                        <div class="flex items-center text-primary-500 font-medium text-sm">
                                            Browse Products
                                            <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <!-- Services -->
                            <a href="/services" class="menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2"
                               onmouseenter="changeContent('/service.png', '/service.png', 'services')"
                               onmouseleave="resetToDefault()">
                                <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                    <Icon icon="mdi-light:settings" width="24" height="24" class="text-white " />
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold text-gray-900 mb-1 text-lg">Services</h3>
                                    <div id="services-detail" class="menu-detail">
                                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                                            Looking for something specific? Check out our current list of available services.
                                        </p>
                                        <div class="flex items-center text-primary-600 font-medium text-sm">
                                            Explore Services
                                            <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <!-- Academic -->
                            <a href="/academic" class="menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2"
                               onmouseenter="changeContent('/academic.png', '/academic.png', 'academic')"
                               onmouseleave="resetToDefault()">
                                <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                   <Icon icon="iconoir:graduation-cap-solid" width="24" height="24" class="text-white " />
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold text-gray-900 mb-1 text-lg">Academic</h3>
                                    <div id="academic-detail" class="menu-detail">
                                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                                            Embedded Machine Learning Education, Industry 4.0, and a Center of Excellence.
                                        </p>
                                        <div class="flex items-center text-primary-600 font-medium text-sm">
                                            Learn More
                                            <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <!-- Partnership -->
                            <a href="/partnership" class="menu-item group flex items-center px-6 py-4 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2"
                               onmouseenter="changeContent('/partner.png', '/partner.png', 'partnership')"
                               onmouseleave="resetToDefault()">
                                <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                   
                                    <Icon icon="mdi:partnership" width="24" height="24" class="text-white " />
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold text-gray-900 mb-1 text-lg">Partnership</h3>
                                    <div id="partnership-detail" class="menu-detail">
                                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                                            Looking to collaborate with a dynamic and innovative team? You're in the right place!
                                        </p>
                                        <div class="flex items-center text-primary-600 font-medium text-sm">
                                            Partner With Us
                                            <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>

        const defaultBg = '/product.png';
        const defaultLaptopImg = '/product.png';
        const defaultSection = 'products';

        window.changeContent = function(bgImageSrc, laptopImageSrc, activeSection) {
            // Change background image
            const backgroundImage = document.getElementById('background-image');
            if (backgroundImage) {
                backgroundImage.style.backgroundImage = `url('${bgImageSrc}')`;
            }
            
            // Change laptop image
            const laptopImage = document.getElementById('laptop-image');
            if (laptopImage) {
                laptopImage.src = laptopImageSrc;
            }
            
            // Handle content sections
            const sections = ['products', 'services', 'academic', 'partnership'];
            sections.forEach(section => {
                const detail = document.getElementById(`${section}-detail`);
                if (detail) {
                    if (section === activeSection) {
                        detail.classList.add('active');
                    } else {
                        detail.classList.remove('active');
                    }
                }
            });
        };

        window.resetToDefault = function() {
            window.changeContent(defaultBg, defaultLaptopImg, defaultSection);
        };

        document.addEventListener('DOMContentLoaded', function() {
            // Initialize with default content
            window.resetToDefault();
            
            // Initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    </script>
</body>
 <style>
        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            filter: grayscale(80%) brightness(0.5);
            transition: all 0.5s ease-in-out;
            z-index: -1;
        }
        
        .menu-detail {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
        }
        
        .menu-detail.active {
            max-height: 100px;
            opacity: 1;
        }
        
        .menu-item:hover .menu-detail {
            max-height: 200px;
            opacity: 1;
        }
    </style>