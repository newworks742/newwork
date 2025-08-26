import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape, b as each } from './ssr-CjCjd7wL.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { I as Icon } from './Icon-GgoLCHfK.js';
import { P as Digitoad } from './public-MGfKNYs-.js';
import { T as Toaster } from './Toaster-Bj36a-NJ.js';
import './Toaster.svelte_svelte_type_style_lang-Bw7PiNj0.js';
import './functions-DmKzDADE.js';
import './index-Brz-Ee1Z.js';

function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let menus = [];
  let activeMenu = null;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  {
    if (data?.redirect) {
      goto(data.redirect);
    }
  }
  return `<div class="bg-white">${validate_component(Toaster, "Toaster").$$render(
    $$result,
    {
      position: "bottom-right",
      richColors: true
    },
    {},
    {}
  )} <nav class="py-2 flex justify-between items-center relative w-full lg:w-11/12 mx-auto max-w-7xl">${``}  <div class="flex md:hidden"><button class="flex items-center text-primary-700 focus:outline-none">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:menu",
      class: "w-10 h-5 text-primary-700 hover:scale-105"
    },
    {},
    {}
  )}</button></div>  <div${add_attribute("class", `fixed top-0 left-0 h-full bg-primary-900 bg-opacity-70 transition-transform transform ${"-translate-x-full"} md:hidden z-50 w-9/12 overflow-y-auto`, 0)}><div class="flex flex-col h-full p-6 text-primary"><div class="flex justify-between p-2 overflow-hidden"><button class="text-xl lg:text-3xl py-2 font-roboto font-bold md:mb-0 text-white">${escape(Digitoad)}</button> <button class="text-2xl py-2 hover:text-primary-400">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:close", class: "size-6" }, {}, {})}</button></div> ${`${each(menus, (menu) => {
    return `<span class="flex flex-row hover:bg-gray-700 hover:text-white hover:text-white transition rounded transform hover:scale-105 duration-200"><button class="flex justify-between text-left text-white hover:text-white w-full py-2 px-2 ml-2">${escape(menu.title)}</button> ${menu.submenus && menu.submenus.length > 0 ? `<button>${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "prime:chevron-down",
        class: "w-5 h-5 mr-2 text-primary-700"
      },
      {},
      {}
    )} </button>` : ``} </span>`;
  })}`}</div></div>  <div class="flex items-center"><button class="flex items-center text-primary-700" data-svelte-h="svelte-1w6m45k"><img src="/logo.png" alt="Digitoad" class="h-8 w-auto sm:h-10 md:h-12"></button></div> <div class="hidden md:flex items-center"><div class="flex items-center lg:gap-2">${each(menus, (menu, index) => {
    return ` <div class="relative text-primary-700 hover:scale-x-105 hover:text-white group" role="menu">  <div${add_attribute("class", `rounded-t-md py-2 pr-2 pl-3 transition-transform duration-100 ease-in-out cursor-pointer ${activeMenu === menu ? "bg-primary-500" : ""}`, 0)}><button class="flex items-center text-nowrap md:text-base font-medium text-left w-full hover:scale-105 text-primary" role="menuitem">${escape(menu.title)} </button></div> </div>`;
  })}</div></div> <div class="md:hidden w-10"></div></nav></div>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { companyAddress = "AB square, #617, 1st Floor, 5th main,OMBR Layout," } = $$props;
  const footerLinks = {
    company: [
      { name: "Events", href: "/events" },
      { name: "Academics", href: "/academics" },
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contactus" },
      { name: "Solutions", href: "/solutions" }
    ]
  };
  const socialLinks = [
    {
      name: "Facebook",
      icon: "/fb.png",
      href: "https://facebook.com/digitoad",
      colorClass: "facebook"
    },
    {
      name: "Instagram",
      icon: "/insta.png",
      href: "https://www.instagram.com/digitoad_tech_official",
      colorClass: "instagram"
    },
    {
      name: "LinkedIn",
      icon: "/linkedin.png",
      href: "https://www.linkedin.com/company/digitoad-technologies",
      colorClass: "linkedin"
    },
    {
      name: "Unknown",
      icon: "/unknown.png",
      href: "https://youtube.com/digitoad",
      colorClass: "youtube"
    }
  ];
  const visibleSocialLinks = socialLinks.filter((link) => link.href);
  if ($$props.companyAddress === void 0 && $$bindings.companyAddress && companyAddress !== void 0) $$bindings.companyAddress(companyAddress);
  return `<footer class="bg-black/80 w-full"><div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:w-11/12"><div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 text-sm text-black"><div class="text-center md:text-left md:border-r lg:pr-3 xl:pr-0"><div class="mb-4"><div class="text-xl font-bold text-white" role="button" tabindex="0" data-svelte-h="svelte-1mfxm7l"><span class="text-primary-500">DigiToad Technologies Pvt. Ltd</span></div></div>  <div class="cursor-pointer hover:underline hover:underline-offset-2 text-white group hover:text-primary-400"><p class="text-white group-hover:text-primary-400">${escape(companyAddress)}</p> <span data-svelte-h="svelte-1livjge">Bangalore - 560036</span></div> <div class="my-2 text-white space-y-2" data-svelte-h="svelte-1f0ontk"><div>Call us at: <a href="tel:6362387840" class="hover:text-primary-400">+91 6362387840</a></div> <div>Email us at: <a href="mailto:sales@digitoadtech.com" class="hover:text-primary-400">sales@digitoadtech.com</a></div></div></div> <div class="text-center md:text-left md:border-r"><h5 class="font-semibold mb-4 text-primary-500 text-xl" data-svelte-h="svelte-dq5ke5">Useful Links</h5> <ul class="space-y-3">${each(footerLinks.company, (link) => {
    return `<li><a${add_attribute("href", link.href, 0)} class="text-white hover:text-primary-400">${escape(link.name)}</a> </li>`;
  })}</ul></div> <div class="text-center md:text-left"><div><h2 class="font-semibold mb-4 text-primary-500 text-xl" data-svelte-h="svelte-hl0f1r">Stay updated - follow us!</h2> <p class="text-sm text-white mb-3" data-svelte-h="svelte-149er77">Stay connected with us through our social platforms.</p> <div class="flex justify-center md:justify-start space-x-2 md:space-x-2 lg:space-x-4 items-center">${each(socialLinks, (social, i) => {
    return `${social.href ? `<a${add_attribute("href", social.href, 0)} target="_blank" rel="noopener noreferrer"${add_attribute("class", `w-8 h-8 rounded-full flex items-center justify-center bg-${social.colorClass} text-white hover:scale-110 hover:text-${social.colorClass} transition-colors duration-200`, 0)}${add_attribute("aria-label", social.name, 0)}><img${add_attribute("src", social.icon, 0)} alt="Icon" class="w-16 h-12"></a> ${i < visibleSocialLinks.length - 1 ? `<div class="w-6 md:w-4 xl:w-6 h-px bg-white mx-4"></div>` : ``}` : ``}`;
  })}</div></div></div></div> <div class="mt-12 pt-8 border-t border-gray-200 text-center text-white text-sm"><div class="sm:inline-block block">© ${escape((/* @__PURE__ */ new Date()).getFullYear())} <span class="font-semibold" data-svelte-h="svelte-1t166jv">DigiToad Technologies.</span></div> <div class="sm:inline-block block sm:ml-2 mt-1 sm:mt-0" data-svelte-h="svelte-11zxa6c">All rights reserved.</div></div></div></footer>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col min-h-screen bg-white"> <div class="sticky top-0 z-50">${validate_component(Nav, "NavBar").$$render($$result, {}, {}, {})}</div>  <main class="flex-grow">${slots.default ? slots.default({}) : ``}</main>     ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-Cxey2Zf2.js.map
