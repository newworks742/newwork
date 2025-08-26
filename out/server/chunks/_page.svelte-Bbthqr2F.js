import { c as create_ssr_component, v as validate_component, a as add_attribute, e as each, b as escape } from './ssr-BN5qA9uw.js';
import './functions-DmKzDADE.js';

const Oem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let translateX;
  let currentSlideIndex;
  const oemCompanies = [
    {
      logoFile: "crobot technologies.png",
      name: "Crobot Technologies",
      url: "https://crobottech.com/"
    },
    {
      logoFile: "Digilent.png",
      name: "Digilent",
      url: "https://digilent.com"
    },
    {
      logoFile: "Mantiswave.png",
      name: "Mantiswave",
      url: "https://mantiswave.com"
    },
    {
      logoFile: "NI.png",
      name: "National Instruments",
      url: "https://ni.com"
    },
    {
      logoFile: "ST.png",
      name: "STMicroelectronics",
      url: "https://st.com"
    },
    {
      logoFile: "Tmytek.png",
      name: "Tmytek",
      url: "https://tmytek.com"
    },
    {
      logoFile: "Viavi.png",
      name: "Viavi Solutions",
      url: "https://viavisolutions.com"
    }
  ];
  const orderDetails = oemCompanies.map((company, i) => ({
    id: i + 1,
    logo: `/oem/${company.logoFile}`,
    manName: company.name,
    url: company.url,
    urlName: company.name.toLowerCase().replace(/\s+/g, "-")
  }));
  const totalProducts = orderDetails.length;
  const clonedBefore = [...orderDetails];
  const clonedAfter = [...orderDetails];
  const allProducts = [...clonedBefore, ...orderDetails, ...clonedAfter];
  let absoluteIndex = totalProducts;
  let cardsToShow = 4;
  let carouselElement;
  translateX = -1 * (absoluteIndex * (100 / cardsToShow));
  currentSlideIndex = (absoluteIndex - totalProducts + totalProducts) % totalProducts;
  return `<div class="mx-auto mt-8"><div class="flex justify-between items-center mb-2" data-svelte-h="svelte-1es4r3o"><h1 class="pb-6 sm:text-xl text-lg font-bold uppercase text-gray-900 relative after:content-[''] after:absolute after:bottom-4 after:left-0 after:w-24 after:h-1 after:bg-primary-600">Our OEM partners</h1>  </div>  <div class="relative overflow-hidden"${add_attribute("this", carouselElement, 0)}><div class="carousel-track flex transition-transform duration-500 ease-in-out" style="${"transform: translateX(" + escape(translateX, true) + "%)"}">${each(allProducts, (product, i) => {
    return `<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 flex-shrink-0"><a${add_attribute("href", product.url, 0)} target="_blank" rel="noopener noreferrer" class="block bg-white rounded-lg shadow overflow-hidden h-full border hover:shadow-lg transition-shadow duration-300 cursor-pointer group" title="${"Visit " + escape(product.manName, true)}"><div class="h-20 px-5 py-2 overflow-hidden group-hover:bg-gray-50 transition-colors duration-300"><img${add_attribute("src", product.logo, 0)}${add_attribute("alt", product.manName, 0)} onerror="this.src='/DT.png'" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"${add_attribute("loading", i < totalProducts * 2 ? "eager" : "lazy", 0)}> </div></a> </div>`;
  })}</div></div>  <div class="flex justify-center mt-4 space-x-2">${each(Array(totalProducts), (_, i) => {
    return `<button class="${"w-2 h-2 rounded-full transition-colors duration-200 " + escape(
      currentSlideIndex === i ? "bg-primary-600" : "bg-gray-300",
      true
    )}" aria-label="${"Go to slide " + escape(i + 1, true)}"></button>`;
  })}</div></div>`;
});
const Aboutpage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="mx-auto w-full lg:w-11/12 max-w-7xl px-4 pb-10 space-y-8 text-description"><section class="rounded-lg"><h4 class="text-xl sm:text-2xl font-semibold text-heading mb-6 text-center lg:text-left" data-svelte-h="svelte-1tpx7sf">About Us</h4> <div class="flex flex-col-reverse lg:flex-row items-center gap-8" data-svelte-h="svelte-yu48k9"><div class="w-full lg:w-1/2 space-y-4 text-sm sm:text-base text-justify"><p><strong>Digitoad Technologies</strong> is a leading provider of Industrial, Academic, and Research Solutions, specializing in Test &amp; Measurement, Industrial Automation, 5G/6G Wireless Technology, and AI-driven IoT solutions. Established in 2018, we empower industries, academia, and research institutions through cutting-edge technologies, expert-driven training, and innovative system integration.</p> <p>As a trusted partner in Distribution, System Integration, Training &amp; Skills Development, and E-Learning Services, we bridge the gap between emerging technologies and real-world applications. Our collaborations with global technology leaders enable us to deliver state-of-the-art solutions that accelerate innovation and digital transformation.</p>  </div> <div class="w-full lg:w-1/2 flex justify-center"><img src="/aboutpages.png" alt="About Us" class="rounded-lg w-full max-w-md aspect-video object-cover"></div></div> <div class="p-4 w-full" data-svelte-h="svelte-tei4oz"><div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"> <div class="bg-white rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-500"><div class="flex items-center gap-4 mb-6"><svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> <h2 class="text-xl md:text-2xl font-bold text-primary-500">Vision</h2> <div class="flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"></div></div> <div class="text-gray-700 text-base leading-relaxed">We are driven by the vision to emerge as an advanced center for skills &amp; product development catering to the needs of the industry and academia by utilizing modern problem-solving methodologies.</div></div>  <div class="bg-white rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-500"><div class="flex items-center gap-4 mb-6"><svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></svg> <h2 class="text-xl md:text-2xl font-bold text-primary-500">Mission</h2> <div class="flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"></div></div> <div class="text-gray-700 text-base leading-relaxed">At DigiToad, we are deeply committed to catalyzing the evolution of R&amp;D, empowering dynamic product/solution development, and ultimately propelling the innovation landscape forward in India.</div></div></div></div> ${validate_component(Oem, "Oem").$$render($$result, {}, {}, {})}</section></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1n46t5p_START -->${$$result.title = `<title>About Us - Digitoad Technologies</title>`, ""}<meta name="description" content="Learn more about Digitoad Technologies "><!-- HEAD_svelte-1n46t5p_END -->`, ""} <div class=""><div class="mx-auto max-w-7xl">${validate_component(Aboutpage, "Aboutus").$$render($$result, {}, {}, {})}</div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Bbthqr2F.js.map
