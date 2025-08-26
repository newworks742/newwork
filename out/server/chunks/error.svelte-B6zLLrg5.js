import { c as create_ssr_component, d as subscribe, b as escape } from './ssr-BN5qA9uw.js';
import { p as page } from './stores-D7ZOzynx.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-B6zLLrg5.js.map
