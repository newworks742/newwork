import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape, b as each } from './ssr-CjCjd7wL.js';
import { T as Toaster } from './Toaster-Bj36a-NJ.js';
import './Toaster.svelte_svelte_type_style_lang-Bw7PiNj0.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { I as Icon } from './Icon-GgoLCHfK.js';
import './index-Brz-Ee1Z.js';
import './functions-DmKzDADE.js';

const Contactnew = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let subject = "";
  data?.profile?.isEmailVerified;
  let errors = {};
  let name;
  let email;
  let phone = "";
  let country = "";
  let captchaInput = "";
  let captcha = "";
  errors = { ...errors };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="bg-cover bg-center bg-no-repeat relative min-h-screen flex items-center justify-center" style="background-image: url('unnamed.jpg');"> <div class="absolute inset-0 bg-black bg-opacity-60"></div> <div class="relative w-full max-w-4xl mx-auto px-4 py-8"><div class="flex justify-center items-center min-h-screen">${`<div class="backdrop-blur-sm w-full max-w-3xl bg-black/40 rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8"><div class="text-center mb-6 sm:mb-8" data-svelte-h="svelte-1trwswd"><h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Get in Touch</h2></div> <form method="POST" action="?/contactus"><div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6"> <div class="space-y-1"><label for="name" class="text-white font-medium mb-1 text-sm" data-svelte-h="svelte-grht5k">Your Name <span class="text-red-400">*</span></label> <div class="relative group"><input type="text" id="name" name="name" placeholder="john" maxlength="50" class="w-full px-3 py-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-white/60 text-white transition-all duration-300 hover:bg-white/25 text-sm"${add_attribute("value", name, 0)}></div> ${errors?.name ? `<p class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm">${escape(errors?.name)}</p>` : ``}</div>  <div class="space-y-1"> <label for="email" class="text-white font-medium mb-1 text-sm" data-svelte-h="svelte-11047bf">Email Address <span class="text-red-400">*</span></label> <div class="relative group"><input type="email" id="email" name="email" placeholder="johndeo@gmail.com" class="w-full px-3 py-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-white/60 text-white transition-all duration-300 hover:bg-white/25 text-sm"${add_attribute("value", email, 0)}></div> ${errors?.email ? `<p class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm">${escape(errors.email)}</p>` : ``}  <input type="hidden" name="email" id="email"${add_attribute("value", email, 0)}></div>  <div class="space-y-1"><label for="phone" class="text-white font-medium mb-1 text-sm" data-svelte-h="svelte-btdivw">Phone Number <span class="text-red-400">*</span></label> <div class="relative flex"><div class="relative w-24 sm:w-28"><input type="text" name="country" placeholder="+91" class="w-full px-3 py-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-l-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-white/60 text-white transition-all duration-300 hover:bg-white/25 text-sm"${add_attribute("value", country, 0)}> ${``}</div> <div class="flex-1"><input type="tel" id="phone" name="phone" class="w-full px-3 py-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-r-lg border-l-0 focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-white/60 text-white transition-all duration-300 hover:bg-white/25 text-sm" placeholder="987543210"${add_attribute("value", phone, 0)}></div></div> ${errors?.phone ? `<p class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm">${escape(errors.phone)}</p>` : ``}</div>  <div class="space-y-1"><label for="subject" class="block text-white font-medium text-sm" data-svelte-h="svelte-1a20ish">Subject <span class="text-red-400">*</span></label> <div class="relative group"><input type="text" id="subject" name="subject" placeholder="Subject" class="w-full px-3 py-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-white/60 text-white transition-all duration-300 hover:bg-white/25 text-sm"${add_attribute("value", subject, 0)}></div> ${errors?.subject ? `<p class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm">${escape(errors.subject)}</p>` : ``}</div>  <div class="md:col-span-2 space-y-1"><label for="message" class="block text-white font-medium text-sm" data-svelte-h="svelte-1d870e0">Your Message <span class="text-red-400">*</span></label> <div class="relative group"><textarea id="message" name="message" placeholder="Write your message here..." rows="4" class="w-full px-3 py-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-white/60 text-white transition-all duration-300 hover:bg-white/25 resize-none text-sm" maxlength="200">${escape("")}</textarea></div> ${errors?.message ? `<p class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm">${escape(errors.message)}</p>` : ``}</div></div>  <div class="mt-6 flex justify-center"><div class="backdrop-blur-sm bg-white/20 rounded-lg p-3 border border-white/30 w-full max-w-md"><div class="flex items-center justify-between bg-white/30 p-3 rounded-lg mb-3 backdrop-blur-sm"><div class="flex gap-1 font-bold text-lg tracking-widest text-white">${each(captcha.split(""), (char) => {
    return `<span class="bg-white/20 px-2 py-1 rounded text-sm">${escape(char)}</span>`;
  })}</div> <button type="button" class="bg-primary-500 hover:bg-primary-600 text-white rounded-lg p-2 transition-colors duration-300 shadow-lg">${validate_component(Icon, "Icon").$$render($$result, { icon: "bx:refresh", class: "w-5 h-5" }, {}, {})}</button></div> <input type="text" placeholder="Enter captcha" class="w-full backdrop-blur-sm bg-white/20 border border-white/30 p-3 rounded-lg text-center placeholder-white/60 text-white focus:outline-none focus:ring-0 focus:ring-primary-400 transition-all duration-300 text-sm"${add_attribute("value", captchaInput, 0)}> ${errors?.captcha ? `<p class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm">${escape(errors?.captcha)}</p>` : ``}</div></div>  <div class="flex justify-center mt-8"><button type="submit" class="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-500 hover:from-primary-700 hover:to-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex justify-center items-center text-sm" ${""}>${`Send Message`}</button></div></form></div>`}</div></div></div> ${validate_component(Toaster, "Toaster").$$render(
    $$result,
    {
      position: "bottom-right",
      richColors: true
    },
    {},
    {}
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(Contactnew, "Contactform").$$render($$result, { data }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Cp0t6y6c.js.map
