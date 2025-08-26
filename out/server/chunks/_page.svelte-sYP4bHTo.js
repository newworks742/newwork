import { c as create_ssr_component, v as validate_component, o as onDestroy, b as each, a as add_attribute, e as escape } from './ssr-CjCjd7wL.js';
import { I as Icon } from './Icon-GgoLCHfK.js';
import './functions-DmKzDADE.js';

const heroSliderData = [
  {
    id: 1,
    video: "/vission AI.mp4",
    image: "/hero1.png",
    content: {
      title: "Mantis Private 5G Network-in-a-Box: Protable,Powerful, and Ready for the Future",
      subtitle: "Portable, Powerful, and Ready for the Future",
      description: "Revolutionary portable 5G network solutions that deliver enterprise-grade connectivity anywhere you need it."
    }
  },
  {
    id: 2,
    video: "/bgvideo.mp4",
    image: "/hero2.png",
    content: {
      title: "Innovative Test and Measurement Solutions for the Next Generation Engineers",
      subtitle: "Next Generation Engineering",
      description: "Advanced testing and measurement solutions designed for the next generation of engineers and researchers."
    }
  },
  {
    id: 3,
    video: "/vission AI.mp4",
    image: "/hero3.png",
    content: {
      title: "Unlock the power of Logic, Learning, and prototyping with  Versatile FPGA Boards.",
      subtitle: "Logic, Learning, and Prototyping",
      description: "Unlock the power of Logic, Learning, and prototyping with  Versatile FPGA Boards."
    }
  },
  {
    id: 4,
    video: "/bgvideo.mp4",
    image: "/hero4.png",
    content: {
      title: "Transforming Research, Testing, and Automation with scalable NI solutions.",
      subtitle: "Research, Testing, and Automation",
      description: "Transforming Research, Testing, and Automation with scalable NI solutions."
    }
  },
  {
    id: 5,
    video: "/vission AI.mp4",
    image: "/hero5.png",
    content: {
      title: "Edge AI & IoT Developer Kit and Industrial IoT Nodes for accelerated Learning, Research, and Industrial Innovation",
      subtitle: "Accelerated Innovation",
      description: "Industrial IoT nodes designed for accelerated learning, research, and breakthrough industrial innovation."
    }
  },
  {
    id: 6,
    video: "/bgvideo.mp4",
    image: "/hero6.png",
    content: {
      title: "5G mmWave Developer Kit for Academic and R&D",
      subtitle: "Academic and R&D Excellence",
      description: "Professional-grade 5G mmWave development tools specifically designed for academic and R&D applications."
    }
  },
  {
    id: 7,
    video: "/vission AI.mp4",
    image: "/hero7.png",
    content: {
      title: "Embedded Vision AI Developer Kit for accelerated Learning, Research,and Industrial Innovation",
      subtitle: "Accelerated AI Development",
      description: "Complete embedded vision AI solutions for accelerated learning, research, and industrial innovation."
    }
  },
  {
    id: 8,
    video: "/bgvideo.mp4",
    image: "/hero8.png",
    content: {
      title: "Tulip Robotics:AI Driven Autonomous Mobile Robotics System Labs",
      subtitle: "AI Driven Autonomous Systems",
      description: "Unlock the future of AI, vision, and autonomous mobility with our advanced platform."
    }
  }
];
const heroData = {
  heroSliderData
};
const Herosection_updated = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentSlide;
  let isContentLeft;
  const { heroSliderData: heroSliderData2 } = heroData;
  let currentIndex = 0;
  let displayedTitle = "";
  let isTyping = false;
  function typewriterEffect(text) {
    if (isTyping) return;
    isTyping = true;
    displayedTitle = "";
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
  onDestroy(() => {
  });
  currentSlide = heroSliderData2[currentIndex];
  isContentLeft = currentIndex % 2 === 0;
  {
    if (currentSlide && currentSlide.content.title) {
      typewriterEffect(currentSlide.content.title);
    }
  }
  return `<div class="relative w-full max-w-7xl mx-auto overflow-hidden"> <div class="absolute inset-0 z-0">${each(heroSliderData2, (slide, index) => {
    return `${index === currentIndex ? `<video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover object-center"><source${add_attribute("src", slide.video, 0)} type="video/mp4">
                    Your browser does not support the video tag.
                </video>` : ``}`;
  })}</div>  <div class="absolute inset-0 bg-black bg-opacity-50 z-5"></div> <div class="relative w-full min-h-[400px] lg:min-h-[400px] lg:max-h-[500px] z-10 flex items-center py-8"><div class="container mx-auto px-6 lg:px-8"><div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full"> <div${add_attribute("class", `${isContentLeft ? "lg:order-1" : "lg:order-2"} text-white z-20 flex flex-col justify-center`, 0)}><div> <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 min-h-[80px] sm:min-h-[100px] lg:min-h-[100px]"><span class="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">${escape(displayedTitle)}</span></h1>  <p class="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 max-w-2xl font-light">${escape(currentSlide.content.description)}</p></div></div>  <div${add_attribute("class", `${isContentLeft ? "lg:order-2" : "lg:order-1"} relative flex items-center justify-center`, 0)}><div class="relative w-full mx-auto"> <div class="absolute -inset-4 rounded-2xl blur-xl"></div> <div class="relative"> <div class="hidden lg:block"><div class="w-[400px] h-[300px] mx-auto rounded-2xl overflow-hidden "><img${add_attribute("src", currentSlide.image, 0)} alt="${"Slide " + escape(currentIndex + 1, true)}" class="w-full h-full object-contain hover:scale-105 transition-transform duration-700 p-2"></div></div>  <div class="hidden sm:block lg:hidden"><div class="w-[350px] h-[260px] mx-auto rounded-2xl overflow-hidden bg-gray-900/20 backdrop-blur-sm"><img${add_attribute("src", currentSlide.image, 0)} alt="${"Slide " + escape(currentIndex + 1, true)}" class="w-full h-full object-contain hover:scale-105 transition-transform duration-700 p-2"></div></div>  <div class="block sm:hidden"><div class="w-[280px] h-[210px] mx-auto rounded-xl overflow-hidden bg-gray-900/20 backdrop-blur-sm"><img${add_attribute("src", currentSlide.image, 0)} alt="${"Slide " + escape(currentIndex + 1, true)}" class="w-full h-full object-contain p-2"></div></div></div></div></div></div></div></div>  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">${each(heroSliderData2, (_, index) => {
    return `<button${add_attribute(
      "class",
      `w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-white scale-125 shadow-lg" : "bg-white/40 hover:bg-white/70 hover:scale-110"}`,
      0
    )} aria-label="${"Go to slide " + escape(index + 1, true)}"></button>`;
  })}</div></div>`;
});
const css$1 = {
  code: ".background-image.svelte-1ji7c8z.svelte-1ji7c8z{position:absolute;top:0;left:0;width:100%;height:100%;background-size:cover;background-position:center;background-repeat:no-repeat;filter:grayscale(80%) brightness(0.5);transition:all 0.5s ease-in-out;z-index:-1}.menu-detail.svelte-1ji7c8z.svelte-1ji7c8z{max-height:0;opacity:0;overflow:hidden;transition:all 0.3s ease-in-out}.menu-detail.active.svelte-1ji7c8z.svelte-1ji7c8z{max-height:100px;opacity:1}.menu-item.svelte-1ji7c8z:hover .menu-detail.svelte-1ji7c8z{max-height:200px;opacity:1}",
  map: `{"version":3,"file":"section2.svelte","sources":["section2.svelte"],"sourcesContent":["<script>\\r\\n\\timport Icon from \\"@iconify/svelte\\";\\r\\n<\/script>\\r\\n<body class=\\"mx-auto p-4 relative\\">\\r\\n    <!-- Background Image Container -->\\r\\n    <div id=\\"background-image\\" class=\\"background-image object-contain\\" style=\\"background-image: url('/product.png');\\"></div>\\r\\n    \\r\\n    <div id=\\"background-container\\" class=\\"transition-all duration-500 ease-in-out relative z-10\\">\\r\\n        <div class=\\"flex items-center justify-center \\">\\r\\n            <div class=\\"flex max-w-4xl w-full gap-8\\">\\r\\n                <!-- Left side - Laptop with image -->\\r\\n                <div class=\\"hidden lg:flex lg:w-1/2 items-center justify-center\\">\\r\\n                    <div class=\\"w-80 h-60 bg-gray-800 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden\\">\\r\\n                        <div class=\\"w-72 h-48 shadow-inner shadow-2xl bg-gray-500 rounded-lg flex items-center justify-center relative\\">\\r\\n                            <div class=\\"w-64 h-40  rounded overflow-hidden shadow-inner\\">\\r\\n                                <img \\r\\n                                    id=\\"laptop-image\\"\\r\\n                                    src=\\"/product.png\\" \\r\\n                                    alt=\\"Current Display\\"\\r\\n                                    class=\\"w-full h-full object-cover transition-all duration-500\\"\\r\\n                                />\\r\\n                            </div>\\r\\n                            <!-- Screen reflection effect -->\\r\\n                            <!-- <div class=\\"absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-5\\"></div> -->\\r\\n                        </div>\\r\\n                        <!-- Laptop bottom -->\\r\\n                        <div class=\\"absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-700 rounded-t\\"></div>\\r\\n                    </div>\\r\\n                </div>\\r\\n\\r\\n                <!-- Right side - Menu -->\\r\\n                <div class=\\"w-full lg:w-1/2\\">\\r\\n                    <div class=\\"bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden\\">\\r\\n                        <!-- Header -->\\r\\n                        <div class=\\"relative bg-white px-6 py-5 border-b border-gray-100\\">\\r\\n                            <div class=\\"flex items-center\\">\\r\\n                                <div class=\\"w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse\\"></div>\\r\\n                                <h2 class=\\"text-lg font-semibold text-gray-900\\">What are you looking for?</h2>\\r\\n                            </div>\\r\\n                            <div class=\\"absolute -top-2 -right-2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg\\">\\r\\n                                 <Icon icon=\\"material-symbols:question-mark\\" width=\\"24\\" height=\\"24\\" class=\\"text-white \\" />\\r\\n                            </div>\\r\\n                        </div>\\r\\n\\r\\n                        <!-- Menu Items -->\\r\\n                        <div class=\\"bg-white\\">\\r\\n                            <!-- Products - Show expanded by default -->\\r\\n                            <a href=\\"/products\\" class=\\"menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2\\"\\r\\n                               onmouseenter=\\"changeContent('/product.png', '/product.png', 'products')\\"\\r\\n                               onmouseleave=\\"resetToDefault()\\">\\r\\n                                  <div class=\\"w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110\\">\\r\\n                                   <Icon icon=\\"codicon:lightbulb\\" width=\\"24\\" height=\\"24\\" class=\\"text-white \\" />\\r\\n                                </div>\\r\\n                                <div class=\\"flex-1\\">\\r\\n                                    <h3 class=\\"font-semibold text-gray-900 mb-1 text-lg\\">Products</h3>\\r\\n                                    <div id=\\"products-detail\\" class=\\"menu-detail active\\">\\r\\n                                        <p class=\\"text-gray-600 text-sm mb-3 leading-relaxed\\">\\r\\n                                            Looking for something specific? Check out our comprehensive list of available products.\\r\\n                                        </p>\\r\\n                                        <div class=\\"flex items-center text-primary-500 font-medium text-sm\\">\\r\\n                                            Browse Products\\r\\n                                            <svg class=\\"w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\">\\r\\n                                                <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M9 5l7 7-7 7\\"/>\\r\\n                                            </svg>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                            </a>\\r\\n\\r\\n                            <!-- Services -->\\r\\n                            <a href=\\"/services\\" class=\\"menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2\\"\\r\\n                               onmouseenter=\\"changeContent('/service.png', '/service.png', 'services')\\"\\r\\n                               onmouseleave=\\"resetToDefault()\\">\\r\\n                                <div class=\\"w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110\\">\\r\\n                                    <Icon icon=\\"mdi-light:settings\\" width=\\"24\\" height=\\"24\\" class=\\"text-white \\" />\\r\\n                                </div>\\r\\n                                <div class=\\"flex-1\\">\\r\\n                                    <h3 class=\\"font-semibold text-gray-900 mb-1 text-lg\\">Services</h3>\\r\\n                                    <div id=\\"services-detail\\" class=\\"menu-detail\\">\\r\\n                                        <p class=\\"text-gray-600 text-sm mb-3 leading-relaxed\\">\\r\\n                                            Looking for something specific? Check out our current list of available services.\\r\\n                                        </p>\\r\\n                                        <div class=\\"flex items-center text-primary-600 font-medium text-sm\\">\\r\\n                                            Explore Services\\r\\n                                            <svg class=\\"w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\">\\r\\n                                                <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M9 5l7 7-7 7\\"/>\\r\\n                                            </svg>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                            </a>\\r\\n\\r\\n                            <!-- Academic -->\\r\\n                            <a href=\\"/academic\\" class=\\"menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2\\"\\r\\n                               onmouseenter=\\"changeContent('/academic.png', '/academic.png', 'academic')\\"\\r\\n                               onmouseleave=\\"resetToDefault()\\">\\r\\n                                <div class=\\"w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110\\">\\r\\n                                   <Icon icon=\\"iconoir:graduation-cap-solid\\" width=\\"24\\" height=\\"24\\" class=\\"text-white \\" />\\r\\n                                </div>\\r\\n                                <div class=\\"flex-1\\">\\r\\n                                    <h3 class=\\"font-semibold text-gray-900 mb-1 text-lg\\">Academic</h3>\\r\\n                                    <div id=\\"academic-detail\\" class=\\"menu-detail\\">\\r\\n                                        <p class=\\"text-gray-600 text-sm mb-3 leading-relaxed\\">\\r\\n                                            Embedded Machine Learning Education, Industry 4.0, and a Center of Excellence.\\r\\n                                        </p>\\r\\n                                        <div class=\\"flex items-center text-primary-600 font-medium text-sm\\">\\r\\n                                            Learn More\\r\\n                                            <svg class=\\"w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\">\\r\\n                                                <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M9 5l7 7-7 7\\"/>\\r\\n                                            </svg>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                            </a>\\r\\n\\r\\n                            <!-- Partnership -->\\r\\n                            <a href=\\"/partnership\\" class=\\"menu-item group flex items-center px-6 py-4 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2\\"\\r\\n                               onmouseenter=\\"changeContent('/partner.png', '/partner.png', 'partnership')\\"\\r\\n                               onmouseleave=\\"resetToDefault()\\">\\r\\n                                <div class=\\"w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110\\">\\r\\n                                   \\r\\n                                    <Icon icon=\\"mdi:partnership\\" width=\\"24\\" height=\\"24\\" class=\\"text-white \\" />\\r\\n                                </div>\\r\\n                                <div class=\\"flex-1\\">\\r\\n                                    <h3 class=\\"font-semibold text-gray-900 mb-1 text-lg\\">Partnership</h3>\\r\\n                                    <div id=\\"partnership-detail\\" class=\\"menu-detail\\">\\r\\n                                        <p class=\\"text-gray-600 text-sm mb-3 leading-relaxed\\">\\r\\n                                            Looking to collaborate with a dynamic and innovative team? You're in the right place!\\r\\n                                        </p>\\r\\n                                        <div class=\\"flex items-center text-primary-600 font-medium text-sm\\">\\r\\n                                            Partner With Us\\r\\n                                            <svg class=\\"w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\">\\r\\n                                                <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M9 5l7 7-7 7\\"/>\\r\\n                                            </svg>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                            </a>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n    <script>\\r\\n\\r\\n        const defaultBg = '/product.png';\\r\\n        const defaultLaptopImg = '/product.png';\\r\\n        const defaultSection = 'products';\\r\\n\\r\\n        window.changeContent = function(bgImageSrc, laptopImageSrc, activeSection) {\\r\\n            // Change background image\\r\\n            const backgroundImage = document.getElementById('background-image');\\r\\n            if (backgroundImage) {\\r\\n                backgroundImage.style.backgroundImage = \`url('\${bgImageSrc}')\`;\\r\\n            }\\r\\n            \\r\\n            // Change laptop image\\r\\n            const laptopImage = document.getElementById('laptop-image');\\r\\n            if (laptopImage) {\\r\\n                laptopImage.src = laptopImageSrc;\\r\\n            }\\r\\n            \\r\\n            // Handle content sections\\r\\n            const sections = ['products', 'services', 'academic', 'partnership'];\\r\\n            sections.forEach(section => {\\r\\n                const detail = document.getElementById(\`\${section}-detail\`);\\r\\n                if (detail) {\\r\\n                    if (section === activeSection) {\\r\\n                        detail.classList.add('active');\\r\\n                    } else {\\r\\n                        detail.classList.remove('active');\\r\\n                    }\\r\\n                }\\r\\n            });\\r\\n        };\\r\\n\\r\\n        window.resetToDefault = function() {\\r\\n            window.changeContent(defaultBg, defaultLaptopImg, defaultSection);\\r\\n        };\\r\\n\\r\\n        document.addEventListener('DOMContentLoaded', function() {\\r\\n            // Initialize with default content\\r\\n            window.resetToDefault();\\r\\n            \\r\\n            // Initialize Lucide icons\\r\\n            if (typeof lucide !== 'undefined') {\\r\\n                lucide.createIcons();\\r\\n            }\\r\\n        });\\r\\n    <\/script>\\r\\n</body>\\r\\n <style>\\r\\n        .background-image {\\r\\n            position: absolute;\\r\\n            top: 0;\\r\\n            left: 0;\\r\\n            width: 100%;\\r\\n            height: 100%;\\r\\n            background-size: cover;\\r\\n            background-position: center;\\r\\n            background-repeat: no-repeat;\\r\\n            filter: grayscale(80%) brightness(0.5);\\r\\n            transition: all 0.5s ease-in-out;\\r\\n            z-index: -1;\\r\\n        }\\r\\n        \\r\\n        .menu-detail {\\r\\n            max-height: 0;\\r\\n            opacity: 0;\\r\\n            overflow: hidden;\\r\\n            transition: all 0.3s ease-in-out;\\r\\n        }\\r\\n        \\r\\n        .menu-detail.active {\\r\\n            max-height: 100px;\\r\\n            opacity: 1;\\r\\n        }\\r\\n        \\r\\n        .menu-item:hover .menu-detail {\\r\\n            max-height: 200px;\\r\\n            opacity: 1;\\r\\n        }\\r\\n    </style>"],"names":[],"mappings":"AAkMQ,+CAAkB,CACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,eAAe,CAAE,KAAK,CACtB,mBAAmB,CAAE,MAAM,CAC3B,iBAAiB,CAAE,SAAS,CAC5B,MAAM,CAAE,UAAU,GAAG,CAAC,CAAC,WAAW,GAAG,CAAC,CACtC,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,WAAW,CAChC,OAAO,CAAE,EACb,CAEA,0CAAa,CACT,UAAU,CAAE,CAAC,CACb,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,WACzB,CAEA,YAAY,qCAAQ,CAChB,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,CACb,CAEA,yBAAU,MAAM,CAAC,2BAAa,CAC1B,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,CACb"}`
};
const Section2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<body class="mx-auto p-4 relative"> <div id="background-image" class="background-image object-contain svelte-1ji7c8z" style="background-image: url('/product.png');"></div> <div id="background-container" class="transition-all duration-500 ease-in-out relative z-10"><div class="flex items-center justify-center "><div class="flex max-w-4xl w-full gap-8"> <div class="hidden lg:flex lg:w-1/2 items-center justify-center" data-svelte-h="svelte-wmno85"><div class="w-80 h-60 bg-gray-800 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden"><div class="w-72 h-48 shadow-inner shadow-2xl bg-gray-500 rounded-lg flex items-center justify-center relative"><div class="w-64 h-40 rounded overflow-hidden shadow-inner"><img id="laptop-image" src="/product.png" alt="Current Display" class="w-full h-full object-cover transition-all duration-500"></div>  </div>  <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-700 rounded-t"></div></div></div>  <div class="w-full lg:w-1/2"><div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden"> <div class="relative bg-white px-6 py-5 border-b border-gray-100"><div class="flex items-center" data-svelte-h="svelte-uc9q90"><div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div> <h2 class="text-lg font-semibold text-gray-900">What are you looking for?</h2></div> <div class="absolute -top-2 -right-2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "material-symbols:question-mark",
      width: "24",
      height: "24",
      class: "text-white "
    },
    {},
    {}
  )}</div></div>  <div class="bg-white"> <a href="/products" class="menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2 svelte-1ji7c8z" onmouseenter="changeContent('/product.png', '/product.png', 'products')" onmouseleave="resetToDefault()"><div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "codicon:lightbulb",
      width: "24",
      height: "24",
      class: "text-white "
    },
    {},
    {}
  )}</div> <div class="flex-1" data-svelte-h="svelte-hvs2s7"><h3 class="font-semibold text-gray-900 mb-1 text-lg">Products</h3> <div id="products-detail" class="menu-detail active svelte-1ji7c8z"><p class="text-gray-600 text-sm mb-3 leading-relaxed">Looking for something specific? Check out our comprehensive list of available products.</p> <div class="flex items-center text-primary-500 font-medium text-sm">Browse Products
                                            <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div></div></a>  <a href="/services" class="menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2 svelte-1ji7c8z" onmouseenter="changeContent('/service.png', '/service.png', 'services')" onmouseleave="resetToDefault()"><div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi-light:settings",
      width: "24",
      height: "24",
      class: "text-white "
    },
    {},
    {}
  )}</div> <div class="flex-1" data-svelte-h="svelte-izzybi"><h3 class="font-semibold text-gray-900 mb-1 text-lg">Services</h3> <div id="services-detail" class="menu-detail svelte-1ji7c8z"><p class="text-gray-600 text-sm mb-3 leading-relaxed">Looking for something specific? Check out our current list of available services.</p> <div class="flex items-center text-primary-600 font-medium text-sm">Explore Services
                                            <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div></div></a>  <a href="/academic" class="menu-item group flex items-center px-6 py-4 border-b border-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2 svelte-1ji7c8z" onmouseenter="changeContent('/academic.png', '/academic.png', 'academic')" onmouseleave="resetToDefault()"><div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "iconoir:graduation-cap-solid",
      width: "24",
      height: "24",
      class: "text-white "
    },
    {},
    {}
  )}</div> <div class="flex-1" data-svelte-h="svelte-eyik7p"><h3 class="font-semibold text-gray-900 mb-1 text-lg">Academic</h3> <div id="academic-detail" class="menu-detail svelte-1ji7c8z"><p class="text-gray-600 text-sm mb-3 leading-relaxed">Embedded Machine Learning Education, Industry 4.0, and a Center of Excellence.</p> <div class="flex items-center text-primary-600 font-medium text-sm">Learn More
                                            <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div></div></a>  <a href="/partnership" class="menu-item group flex items-center px-6 py-4 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:translate-x-2 svelte-1ji7c8z" onmouseenter="changeContent('/partner.png', '/partner.png', 'partnership')" onmouseleave="resetToDefault()"><div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:partnership",
      width: "24",
      height: "24",
      class: "text-white "
    },
    {},
    {}
  )}</div> <div class="flex-1" data-svelte-h="svelte-cb4u5g"><h3 class="font-semibold text-gray-900 mb-1 text-lg">Partnership</h3> <div id="partnership-detail" class="menu-detail svelte-1ji7c8z"><p class="text-gray-600 text-sm mb-3 leading-relaxed">Looking to collaborate with a dynamic and innovative team? You&#39;re in the right place!</p> <div class="flex items-center text-primary-600 font-medium text-sm">Partner With Us
                                            <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div></div></a></div></div></div></div></div></div> <script data-svelte-h="svelte-15q28jp">const defaultBg = '/product.png';
        const defaultLaptopImg = '/product.png';
        const defaultSection = 'products';

        window.changeContent = function(bgImageSrc, laptopImageSrc, activeSection) {
            // Change background image
            const backgroundImage = document.getElementById('background-image');
            if (backgroundImage) {
                backgroundImage.style.backgroundImage = \`url('\${bgImageSrc}')\`;
            }
            
            // Change laptop image
            const laptopImage = document.getElementById('laptop-image');
            if (laptopImage) {
                laptopImage.src = laptopImageSrc;
            }
            
            // Handle content sections
            const sections = ['products', 'services', 'academic', 'partnership'];
            sections.forEach(section => {
                const detail = document.getElementById(\`\${section}-detail\`);
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
        });<\/script> </body>`;
});
const css = {
  code: "@keyframes svelte-12x3gka-spread-lines{0%{stroke-dashoffset:200;opacity:0}30%{opacity:0.4}100%{stroke-dashoffset:0;opacity:0.7}}.animate-spread-line.svelte-12x3gka{animation:svelte-12x3gka-spread-lines 2s ease-out forwards;opacity:0;stroke-dasharray:6,4}",
  map: `{"version":3,"file":"Section3.svelte","sources":["Section3.svelte"],"sourcesContent":["<script>\\r\\n    import { onMount } from 'svelte';\\r\\n\\r\\n    let pocCount = 0;\\r\\n    let collaborationsCount = 0;\\r\\n    let integrationCount = 0;\\r\\n    let trainingCount = 0;\\r\\n    let centersCount = 0;\\r\\n    let learnersCount = 0;\\r\\n    let cardsVisible = [false, false, false, false, false, false];\\r\\n    let componentElement;\\r\\n    let animationStarted = false;\\r\\n\\r\\n    const animateCounter = (target, current, increment, callback) => {\\r\\n        if (current < target) {\\r\\n            setTimeout(() => {\\r\\n                callback(current + increment);\\r\\n                animateCounter(target, current + increment, increment, callback);\\r\\n            }, 50);\\r\\n        }\\r\\n    };\\r\\n\\r\\n    const showCard = (index) => {\\r\\n        cardsVisible[index] = true;\\r\\n        cardsVisible = [...cardsVisible];\\r\\n    };\\r\\n\\r\\n    const startAnimations = () => {\\r\\n        if (animationStarted) return;\\r\\n        animationStarted = true;\\r\\n\\r\\n        // Staggered card animations\\r\\n        setTimeout(() => {\\r\\n            showCard(0);\\r\\n            animateCounter(5, 0, 1, (val) => pocCount = val);\\r\\n        }, 500);\\r\\n\\r\\n        setTimeout(() => {\\r\\n            showCard(1);\\r\\n            animateCounter(25, 0, 1, (val) => collaborationsCount = val);\\r\\n        }, 700);\\r\\n\\r\\n        setTimeout(() => {\\r\\n            showCard(2);\\r\\n            animateCounter(15, 0, 1, (val) => integrationCount = val);\\r\\n        }, 900);\\r\\n\\r\\n        setTimeout(() => {\\r\\n            showCard(3);\\r\\n            animateCounter(100, 0, 5, (val) => trainingCount = val);\\r\\n        }, 1100);\\r\\n\\r\\n        setTimeout(() => {\\r\\n            showCard(4);\\r\\n            animateCounter(20, 0, 1, (val) => centersCount = val);\\r\\n        }, 1300);\\r\\n\\r\\n        setTimeout(() => {\\r\\n            showCard(5);\\r\\n            animateCounter(5000, 0, 100, (val) => learnersCount = val);\\r\\n        }, 1500);\\r\\n    };\\r\\n\\r\\n    const checkIntersection = () => {\\r\\n        if (!componentElement || animationStarted) return;\\r\\n        \\r\\n        const rect = componentElement.getBoundingClientRect();\\r\\n        const windowHeight = window.innerHeight;\\r\\n        \\r\\n        // Check if 50% of the component is visible\\r\\n        const componentCenter = rect.top + rect.height / 2;\\r\\n        const isHalfVisible = componentCenter <= windowHeight && componentCenter >= 0;\\r\\n        \\r\\n        if (isHalfVisible) {\\r\\n            startAnimations();\\r\\n        }\\r\\n    };\\r\\n\\r\\n    onMount(() => {\\r\\n        // Check immediately on mount\\r\\n        checkIntersection();\\r\\n        \\r\\n        // Add scroll listener\\r\\n        window.addEventListener('scroll', checkIntersection);\\r\\n        window.addEventListener('resize', checkIntersection);\\r\\n        \\r\\n        return () => {\\r\\n            window.removeEventListener('scroll', checkIntersection);\\r\\n            window.removeEventListener('resize', checkIntersection);\\r\\n        };\\r\\n    });\\r\\n<\/script>\\r\\n\\r\\n<div bind:this={componentElement} class=\\"w-full px-8 py-4 relative bg-gray-50\\">\\r\\n    \\r\\n    <div class=\\"relative w-full max-w-6xl mx-auto\\">\\r\\n        \\r\\n        <!-- Central Hub - Reduced size with shadow -->\\r\\n        <div class=\\"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20  hover:shadow-2xl shadow-2xl\\">\\r\\n            <div class=\\"w-20 h-20 bg-black rounded-2xl shadow-xl flex items-center justify-center\\">\\r\\n                <img src=\\"/DT.png\\" alt=\\"DT\\" class=\\"w-16 h-16 rounded-xl\\"/>\\r\\n            </div>\\r\\n        </div>\\r\\n        <svg class=\\"absolute inset-0 w-full h-full pointer-events-none z-10\\" viewBox=\\"0 0 800 500\\">\\r\\n            <line x1=\\"400\\" y1=\\"250\\" x2=\\"150\\" y2=\\"80\\" stroke=\\"#3d6542ff\\" stroke-width=\\"2\\" stroke-dasharray=\\"6,4\\" class=\\"animate-spread-line\\" style=\\"animation-delay: 0.5s\\"/>\\r\\n            <line x1=\\"400\\" y1=\\"250\\" x2=\\"650\\" y2=\\"80\\" stroke=\\"#3d6542ff\\" stroke-width=\\"2\\" stroke-dasharray=\\"6,4\\" class=\\"animate-spread-line\\" style=\\"animation-delay: 0.7s\\"/>\\r\\n            <line x1=\\"400\\" y1=\\"250\\" x2=\\"120\\" y2=\\"250\\" stroke=\\"#3d6542ff\\" stroke-width=\\"2\\" stroke-dasharray=\\"6,4\\" class=\\"animate-spread-line\\" style=\\"animation-delay: 0.9s\\"/>\\r\\n            <line x1=\\"400\\" y1=\\"250\\" x2=\\"680\\" y2=\\"250\\" stroke=\\"#3d6542ff\\" stroke-width=\\"2\\" stroke-dasharray=\\"6,4\\" class=\\"animate-spread-line\\" style=\\"animation-delay: 1.1s\\"/>\\r\\n            <line x1=\\"400\\" y1=\\"250\\" x2=\\"150\\" y2=\\"420\\" stroke=\\"#3d6542ff\\" stroke-width=\\"2\\" stroke-dasharray=\\"6,4\\" class=\\"animate-spread-line\\" style=\\"animation-delay: 1.3s\\"/>\\r\\n            <line x1=\\"400\\" y1=\\"250\\" x2=\\"650\\" y2=\\"420\\" stroke=\\"#3d6542ff\\" stroke-width=\\"2\\" stroke-dasharray=\\"6,4\\" class=\\"animate-spread-line\\" style=\\"animation-delay: 1.5s\\"/>\\r\\n        </svg>\\r\\n        <div class=\\"relative h-[500px]\\">\\r\\n            \\r\\n            <div class=\\"absolute top-[20px] left-[50px] w-52 transition-all duration-700 {cardsVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\\">\\r\\n                <div class=\\"bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden\\">\\r\\n                    <div class=\\"bg-gradient-to-r from-primary-500 to-primary-600 text-white p-2 text-center\\">\\r\\n                        <div class=\\"text-2xl font-bold mb-1\\">{pocCount}+</div>\\r\\n                    </div>\\r\\n                    <div class=\\"p-4 text-center\\">\\r\\n                        <div class=\\"text-gray-700 font-medium text-sm leading-relaxed\\">\\r\\n                            Proof-of-Concept (PoC)<br/>\\r\\n                            Developments Supported\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\"absolute top-[20px] right-[50px] w-52 transition-all duration-700 {cardsVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\\">\\r\\n                <div class=\\"bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden\\">\\r\\n                    <div class=\\"bg-gradient-to-r from-primary-500 to-primary-600 text-white p-2 text-center\\">\\r\\n                        <div class=\\"text-2xl font-bold mb-1\\">{collaborationsCount}+</div>\\r\\n                    </div>\\r\\n                    <div class=\\"p-4 text-center\\">\\r\\n                        <div class=\\"text-gray-700 font-medium text-sm leading-relaxed\\">\\r\\n                            Collaborations with R&D<br/>\\r\\n                            Centers Across India\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\"absolute top-1/2 left-[20px] w-52 transform -translate-y-1/2 transition-all duration-700 {cardsVisible[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}\\">\\r\\n                <div class=\\"bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden\\">\\r\\n                    <div class=\\"bg-gradient-to-r from-primary-700 to-primary-800 text-white p-2 text-center\\">\\r\\n                        <div class=\\"text-2xl font-bold mb-1\\">{integrationCount}+</div>\\r\\n                    </div>\\r\\n\\r\\n                    <div class=\\"p-4 text-center\\">\\r\\n                        <div class=\\"text-gray-700 font-medium text-sm leading-relaxed\\">\\r\\n                            Seamless System<br/>\\r\\n                            Integration Projects<br/>\\r\\n                            Completed\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n            <div class=\\"absolute top-1/2 right-[20px] w-52 transform -translate-y-1/2 transition-all duration-700 {cardsVisible[3] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}\\">\\r\\n                <div class=\\"bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden\\">\\r\\n                    <div class=\\"bg-gradient-to-r from-primary-700 to-primary-800 text-white p-2 text-center\\">\\r\\n                        <div class=\\"text-2xl font-bold mb-1\\">{trainingCount}+</div>\\r\\n                    </div>\\r\\n                    <div class=\\"p-4 text-center\\">\\r\\n                        <div class=\\"text-gray-700 font-medium text-sm leading-relaxed\\">\\r\\n                            Industry-Focused<br/>\\r\\n                            Training Programs<br/>\\r\\n                            Conducted\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\"absolute bottom-[0px] left-[50px] w-52 transition-all duration-700 {cardsVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}\\">\\r\\n                <div class=\\"bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden\\">\\r\\n                    <div class=\\"bg-gradient-to-r from-primary-800 to-primary-900 text-white p-2 text-center\\">\\r\\n                        <div class=\\"text-2xl font-bold mb-1\\">{centersCount}+</div>\\r\\n                    </div>\\r\\n                    <!-- Content Section -->\\r\\n                    <div class=\\"p-4 text-center\\">\\r\\n                        <div class=\\"text-gray-700 font-medium text-sm leading-relaxed\\">\\r\\n                            Centers of Excellence (CoEs)<br/>\\r\\n                            Established Nationwide\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n\\r\\n            <!-- Bottom Right - Learners -->\\r\\n            <div class=\\"absolute bottom-[20px] right-[50px] w-52 transition-all duration-700 {cardsVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}\\">\\r\\n                <div class=\\"bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden\\">\\r\\n                    <!-- Count Section -->\\r\\n                    <div class=\\"bg-gradient-to-r from-primary-800 to-primary-900 text-white p-2 text-center\\">\\r\\n                        <div class=\\"text-2xl font-bold mb-1\\">{learnersCount.toLocaleString()}+</div>\\r\\n                    </div>\\r\\n                    <!-- Content Section -->\\r\\n                    <div class=\\"p-4 text-center\\">\\r\\n                        <div class=\\"text-gray-700 font-medium text-sm leading-relaxed\\">\\r\\n                            Learners Empowered via<br/>\\r\\n                            SkillsBlock.in Platform\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    @keyframes spread-lines {\\r\\n        0% {\\r\\n            stroke-dashoffset: 200;\\r\\n            opacity: 0;\\r\\n        }\\r\\n        30% {\\r\\n            opacity: 0.4;\\r\\n        }\\r\\n        100% {\\r\\n            stroke-dashoffset: 0;\\r\\n            opacity: 0.7;\\r\\n        }\\r\\n    }\\r\\n    \\r\\n    .animate-spread-line {\\r\\n        animation: spread-lines 2s ease-out forwards;\\r\\n        opacity: 0;\\r\\n        stroke-dasharray: 6,4;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA+MI,WAAW,2BAAa,CACpB,EAAG,CACC,iBAAiB,CAAE,GAAG,CACtB,OAAO,CAAE,CACb,CACA,GAAI,CACA,OAAO,CAAE,GACb,CACA,IAAK,CACD,iBAAiB,CAAE,CAAC,CACpB,OAAO,CAAE,GACb,CACJ,CAEA,mCAAqB,CACjB,SAAS,CAAE,2BAAY,CAAC,EAAE,CAAC,QAAQ,CAAC,QAAQ,CAC5C,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,CAAC,CAAC,CACxB"}`
};
const Section3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pocCount = 0;
  let collaborationsCount = 0;
  let integrationCount = 0;
  let trainingCount = 0;
  let centersCount = 0;
  let learnersCount = 0;
  let componentElement;
  $$result.css.add(css);
  return `<div class="w-full px-8 py-4 relative bg-gray-50"${add_attribute("this", componentElement, 0)}><div class="relative w-full max-w-6xl mx-auto"> <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hover:shadow-2xl shadow-2xl" data-svelte-h="svelte-10i960p"><div class="w-20 h-20 bg-black rounded-2xl shadow-xl flex items-center justify-center"><img src="/DT.png" alt="DT" class="w-16 h-16 rounded-xl"></div></div> <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 500"><line x1="400" y1="250" x2="150" y2="80" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line svelte-12x3gka" style="animation-delay: 0.5s"></line><line x1="400" y1="250" x2="650" y2="80" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line svelte-12x3gka" style="animation-delay: 0.7s"></line><line x1="400" y1="250" x2="120" y2="250" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line svelte-12x3gka" style="animation-delay: 0.9s"></line><line x1="400" y1="250" x2="680" y2="250" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line svelte-12x3gka" style="animation-delay: 1.1s"></line><line x1="400" y1="250" x2="150" y2="420" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line svelte-12x3gka" style="animation-delay: 1.3s"></line><line x1="400" y1="250" x2="650" y2="420" stroke="#3d6542ff" stroke-width="2" stroke-dasharray="6,4" class="animate-spread-line svelte-12x3gka" style="animation-delay: 1.5s"></line></svg> <div class="relative h-[500px]"><div class="${"absolute top-[20px] left-[50px] w-52 transition-all duration-700 " + escape(
    "opacity-0 translate-y-8",
    true
  )}"><div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden"><div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-2 text-center"><div class="text-2xl font-bold mb-1">${escape(pocCount)}+</div></div> <div class="p-4 text-center" data-svelte-h="svelte-h7qqoe"><div class="text-gray-700 font-medium text-sm leading-relaxed">Proof-of-Concept (PoC)<br>
                            Developments Supported</div></div></div></div> <div class="${"absolute top-[20px] right-[50px] w-52 transition-all duration-700 " + escape(
    "opacity-0 translate-y-8",
    true
  )}"><div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden"><div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-2 text-center"><div class="text-2xl font-bold mb-1">${escape(collaborationsCount)}+</div></div> <div class="p-4 text-center" data-svelte-h="svelte-txwzt8"><div class="text-gray-700 font-medium text-sm leading-relaxed">Collaborations with R&amp;D<br>
                            Centers Across India</div></div></div></div> <div class="${"absolute top-1/2 left-[20px] w-52 transform -translate-y-1/2 transition-all duration-700 " + escape(
    "opacity-0 -translate-x-8",
    true
  )}"><div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden"><div class="bg-gradient-to-r from-primary-700 to-primary-800 text-white p-2 text-center"><div class="text-2xl font-bold mb-1">${escape(integrationCount)}+</div></div> <div class="p-4 text-center" data-svelte-h="svelte-y0a3qm"><div class="text-gray-700 font-medium text-sm leading-relaxed">Seamless System<br>
                            Integration Projects<br>
                            Completed</div></div></div></div> <div class="${"absolute top-1/2 right-[20px] w-52 transform -translate-y-1/2 transition-all duration-700 " + escape(
    "opacity-0 translate-x-8",
    true
  )}"><div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden"><div class="bg-gradient-to-r from-primary-700 to-primary-800 text-white p-2 text-center"><div class="text-2xl font-bold mb-1">${escape(trainingCount)}+</div></div> <div class="p-4 text-center" data-svelte-h="svelte-18i19tv"><div class="text-gray-700 font-medium text-sm leading-relaxed">Industry-Focused<br>
                            Training Programs<br>
                            Conducted</div></div></div></div> <div class="${"absolute bottom-[0px] left-[50px] w-52 transition-all duration-700 " + escape(
    "opacity-0 -translate-y-8",
    true
  )}"><div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden"><div class="bg-gradient-to-r from-primary-800 to-primary-900 text-white p-2 text-center"><div class="text-2xl font-bold mb-1">${escape(centersCount)}+</div></div>  <div class="p-4 text-center" data-svelte-h="svelte-12wbwy8"><div class="text-gray-700 font-medium text-sm leading-relaxed">Centers of Excellence (CoEs)<br>
                            Established Nationwide</div></div></div></div>  <div class="${"absolute bottom-[20px] right-[50px] w-52 transition-all duration-700 " + escape(
    "opacity-0 -translate-y-8",
    true
  )}"><div class="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden"> <div class="bg-gradient-to-r from-primary-800 to-primary-900 text-white p-2 text-center"><div class="text-2xl font-bold mb-1">${escape(learnersCount.toLocaleString())}+</div></div>  <div class="p-4 text-center" data-svelte-h="svelte-1fxrt9"><div class="text-gray-700 font-medium text-sm leading-relaxed">Learners Empowered via<br>
                            SkillsBlock.in Platform</div></div></div></div></div></div> </div>`;
});
const Section4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let translateX;
  const orderDetails = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    logo: `/carousel/${i + 1}.png`,
    manName: `Company ${i + 1}`,
    urlName: `company-${i + 1}`
  }));
  const totalProducts = orderDetails.length;
  const clonedBefore = [...orderDetails];
  const clonedAfter = [...orderDetails];
  const allProducts = [...clonedBefore, ...orderDetails, ...clonedAfter];
  let absoluteIndex = totalProducts;
  let cardsToShow = 4;
  let carouselElement;
  translateX = -1 * (absoluteIndex * (100 / cardsToShow));
  return `<div class="mx-auto max-w-7xl w-11/12 px-4 pb-4 mt-12 mb-8"><div class="flex justify-between items-center mb-2" data-svelte-h="svelte-1b4dgmg"><h1 class="pb-6 sm:text-xl text-lg font-bold uppercase text-gray-900 relative after:content-[''] after:absolute after:bottom-4 after:left-0 after:w-24 after:h-1 after:bg-primary-600">Empowering tomorrow&#39;s world at work</h1>  </div> <p class="text-base mb-4" data-svelte-h="svelte-vyp3kq">We&#39;ve been at the forefront of shaping the future of AI and work. Whether for startups or Fortune 500 companies, we&#39;re empowering our members to envision new possibilities in their work.</p> <div class="relative overflow-hidden"${add_attribute("this", carouselElement, 0)}><div class="carousel-track flex transition-transform duration-500 ease-in-out" style="${"transform: translateX(" + escape(translateX, true) + "%)"}">${each(allProducts, (product, i) => {
    return `<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 flex-shrink-0"><div class="bg-white rounded-lg shadow overflow-hidden h-full border"><div class="h-20 px-5 py-2 overflow-hidden"><img${add_attribute("src", product.logo, 0)}${add_attribute("alt", product.manName, 0)} onerror="this.src='/DT.png'" class="w-full h-full object-contain"${add_attribute("loading", i < totalProducts * 2 ? "eager" : "lazy", 0)}> </div></div>  </div>`;
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data, "ia m from +page");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(Herosection_updated, "HeroSec").$$render($$result, {}, {}, {})} ${validate_component(Section2, "Section2").$$render($$result, {}, {}, {})} ${validate_component(Section3, "Section3").$$render($$result, {}, {}, {})} ${validate_component(Section4, "Section4").$$render($$result, {}, {}, {})}    `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-sYP4bHTo.js.map
