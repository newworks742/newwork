import { c as create_ssr_component, v as validate_component, o as onDestroy, b as escape } from './ssr-BN5qA9uw.js';
import { I as Icon } from './Icon-DA1KMwkX.js';
import './Toaster.svelte_svelte_type_style_lang-DuhBMABn.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import './functions-DmKzDADE.js';
import './index-DISo2uF1.js';

const css = {
  code: ".article-content .image-wrapper img{border-radius:0.5rem;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)}.article-content .image-wrapper.mx-auto{clear:both;float:none !important;display:block;margin:1.5rem auto}.article-content p{margin-bottom:1rem;line-height:1.7}.article-content h1, .article-content h2, .article-content h3{margin-top:2rem;margin-bottom:1rem;font-weight:600}.article-content ol, .article-content ul{margin:1rem 0}.article-content li{margin-bottom:0.5rem;line-height:1.6}.article-content .image-wrapper:not(.mx-auto){shape-outside:margin-box}@media(max-width: 768px){.article-content .image-wrapper{float:none !important;margin:1rem auto !important;max-width:100% !important;width:100% !important}.article-content .image-wrapper.mx-auto{margin:1rem auto !important}}",
  map: `{"version":3,"file":"NewsHall.svelte","sources":["NewsHall.svelte"],"sourcesContent":["<script>\\r\\n  import { onMount, onDestroy } from 'svelte';\\r\\n  import { browser } from '$app/environment';\\r\\n  import Icon from \\"@iconify/svelte\\";\\r\\n\\t// import ShareButton from './ProductpageComponents/ShareButton.svelte';\\r\\nimport Contact from '$lib/components/Contactus_Final/Registerweb.svelte';\\r\\n  \\r\\n  export let data;\\r\\n  console.log(\\"newsroom data--->>\\",data)\\r\\n    let showContact = false;\\r\\n  $: record = data?.newsdata;\\r\\nlet PUBLIC_COMPBUY_IMAGE_PATH = \\"Digitoad\\"\\r\\n  let isExpanded = false;\\r\\n  let shouldShowToggle = false;\\r\\n  let processedContent = '';\\r\\n  let mounted = false;\\r\\n  \\r\\n  const WORD_LIMIT = 150;\\r\\n  const wpn = data?.newsid;\\r\\n  \\r\\n  function processHTMLContent(htmlContent) {\\r\\n  if (!htmlContent || !browser) return htmlContent;\\r\\n  \\r\\n  try {\\r\\n    const tempDiv = document.createElement('div');\\r\\n    tempDiv.innerHTML = htmlContent;\\r\\n    \\r\\n    const images = tempDiv.querySelectorAll('img');\\r\\n    \\r\\n    images.forEach((img) => {\\r\\n      let alignment = getImageAlignment(img);\\r\\n      \\r\\n      const wrapper = document.createElement('div');\\r\\n      let alignmentClass = '';\\r\\n      \\r\\n      if (alignment === 'left') {\\r\\n        alignmentClass = 'float-left mr-6 mb-4 max-w-sm w-full sm:w-1/2 lg:w-1/3';\\r\\n      } else if (alignment === 'right') {\\r\\n        alignmentClass = 'float-right ml-6 mb-4 max-w-sm w-full sm:w-1/2 lg:w-1/3';\\r\\n      } else if (alignment === 'center') {\\r\\n        alignmentClass = 'mx-auto mb-6 max-w-lg w-full clear-both block';\\r\\n      } else {\\r\\n        alignmentClass = 'float-left mr-6 mb-4 max-w-sm w-full sm:w-1/2 lg:w-1/3';\\r\\n      }\\r\\n      \\r\\n      wrapper.className = \`image-wrapper \${alignmentClass}\`;\\r\\n      \\r\\n      img.className = 'w-full h-auto rounded-lg shadow-md transition-transform duration-300 object-cover';\\r\\n      img.style.maxHeight = '300px';\\r\\n      img.loading = 'lazy';\\r\\n\\r\\n      img.onerror = function() {\\r\\n        this.src = '/Digitoad.jpeg';\\r\\n      };\\r\\n\\r\\n      img.parentNode.insertBefore(wrapper, img);\\r\\n      wrapper.appendChild(img);\\r\\n    });\\r\\n\\r\\n    const floatingWrappers = tempDiv.querySelectorAll('.image-wrapper');\\r\\n    const actualFloatingWrappers = Array.from(floatingWrappers).filter(wrapper => \\r\\n      wrapper.className.includes('float-left') || wrapper.className.includes('float-right')\\r\\n    );\\r\\n    \\r\\n    actualFloatingWrappers.forEach((wrapper, index) => {\\r\\n      if ((index + 1) % 2 === 0 || index === actualFloatingWrappers.length - 1) {\\r\\n        const clearDiv = document.createElement('div');\\r\\n        clearDiv.className = 'clear-both';\\r\\n        if (wrapper.nextSibling) {\\r\\n          wrapper.parentNode.insertBefore(clearDiv, wrapper.nextSibling);\\r\\n        } else {\\r\\n          wrapper.parentNode.appendChild(clearDiv);\\r\\n        }\\r\\n      }\\r\\n    });\\r\\n    \\r\\n    return tempDiv.innerHTML;\\r\\n  } catch (error) {\\r\\n    console.error('Error processing HTML content:', error);\\r\\n    return htmlContent;\\r\\n  }\\r\\n}\\r\\n\\r\\nfunction getImageAlignment(img) {\\r\\n  const imgStyle = img.style.cssText.toLowerCase();\\r\\n  if (imgStyle.includes('float: left') || imgStyle.includes('float:left')) {\\r\\n    return 'left';\\r\\n  }\\r\\n  if (imgStyle.includes('float: right') || imgStyle.includes('float:right')) {\\r\\n    return 'right';\\r\\n  }\\r\\n  if (imgStyle.includes('text-align: center') || imgStyle.includes('text-align:center')) {\\r\\n    return 'center';\\r\\n  }\\r\\n\\r\\n  let parent = img.parentElement;\\r\\n  while (parent && parent !== document.body) {\\r\\n    const className = parent.className ? parent.className.toLowerCase() : '';\\r\\n    const style = parent.style ? parent.style.cssText.toLowerCase() : '';\\r\\n    \\r\\n    if (className.includes('ql-align-left') || className.includes('text-left') || style.includes('text-align: left')) {\\r\\n      return 'left';\\r\\n    }\\r\\n    if (className.includes('ql-align-right') || className.includes('text-right') || style.includes('text-align: right')) {\\r\\n      return 'right';\\r\\n    }\\r\\n    if (className.includes('ql-align-center') || className.includes('text-center') || style.includes('text-align: center')) {\\r\\n      return 'center';\\r\\n    }\\r\\n    \\r\\n    if (style.includes('float: left') || style.includes('float:left')) {\\r\\n      return 'left';\\r\\n    }\\r\\n    if (style.includes('float: right') || style.includes('float:right')) {\\r\\n      return 'right';\\r\\n    }\\r\\n    \\r\\n    parent = parent.parentElement;\\r\\n  }\\r\\n  \\r\\n  const paragraph = img.closest('p');\\r\\n  if (paragraph) {\\r\\n    const pClass = paragraph.className ? paragraph.className.toLowerCase() : '';\\r\\n    const pStyle = paragraph.style ? paragraph.style.cssText.toLowerCase() : '';\\r\\n    \\r\\n    if (pClass.includes('ql-align-left') || pClass.includes('text-left') || pStyle.includes('text-align: left')) {\\r\\n      return 'left';\\r\\n    }\\r\\n    if (pClass.includes('ql-align-right') || pClass.includes('text-right') || pStyle.includes('text-align: right')) {\\r\\n      return 'right';\\r\\n    }\\r\\n    if (pClass.includes('ql-align-center') || pClass.includes('text-center') || pStyle.includes('text-align: center')) {\\r\\n      return 'center';\\r\\n    }\\r\\n  }\\r\\n  \\r\\n  const dataAlign = img.getAttribute('data-align');\\r\\n  if (dataAlign) {\\r\\n    return dataAlign.toLowerCase();\\r\\n  }\\r\\n  \\r\\n  const alt = img.alt ? img.alt.toLowerCase() : '';\\r\\n  const title = img.title ? img.title.toLowerCase() : '';\\r\\n  if (alt.includes('left') || title.includes('left')) {\\r\\n    return 'left';\\r\\n  }\\r\\n  if (alt.includes('right') || title.includes('right')) {\\r\\n    return 'right';\\r\\n  }\\r\\n  if (alt.includes('center') || title.includes('center')) {\\r\\n    return 'center';\\r\\n  }\\r\\n\\r\\n  return null;\\r\\n}\\r\\n  \\r\\n  function truncateText(text, wordLimit) {\\r\\n    if (!text) return '';\\r\\n    \\r\\n    try {\\r\\n      const textWithoutHtml = text.replace(/<[^>]*>/g, '');\\r\\n      const words = textWithoutHtml.split(/\\\\s+/);\\r\\n      return words.length > wordLimit ? words.slice(0, wordLimit).join(\\" \\") + \\"...\\" : textWithoutHtml;\\r\\n    } catch (error) {\\r\\n      console.error('Error truncating text:', error);\\r\\n      return text;\\r\\n    }\\r\\n  }\\r\\n  \\r\\n  function toggleExpand() {\\r\\n    isExpanded = !isExpanded;\\r\\n\\r\\n    if (!isExpanded && browser) {\\r\\n      setTimeout(() => {\\r\\n        const contentTop = document.getElementById(\\"news-content-top\\");\\r\\n        if (contentTop) {\\r\\n          contentTop.scrollIntoView({ behavior: \\"smooth\\", block: \\"start\\" });\\r\\n        }\\r\\n      }, 100);\\r\\n    }\\r\\n  }\\r\\n  \\r\\n  function formatDate(dateString) {\\r\\n    if (!dateString) return '';\\r\\n    try {\\r\\n      return new Date(dateString).toLocaleDateString('en-US', {\\r\\n        year: 'numeric',\\r\\n        month: 'long',\\r\\n        day: 'numeric'\\r\\n      });\\r\\n    } catch (e) {\\r\\n      console.error(\\"Invalid date format:\\", dateString);\\r\\n      return \\"\\";\\r\\n    }\\r\\n  }\\r\\n  \\r\\n  function getImageUrl(image) {\\r\\n    if (!image) return '/Digitoad.jpeg';\\r\\n    try {\\r\\n      return image.includes('/')\\r\\n        ? image\\r\\n        : \`\${PUBLIC_COMPBUY_IMAGE_PATH}/part/\${image}\`;\\r\\n    } catch (error) {\\r\\n      console.error('Error getting image URL:', error);\\r\\n      return '/Digitoad.jpeg';\\r\\n    }\\r\\n  }\\r\\n\\r\\n  // Helper function to format minutes into \\"Xhr Ymin\\" format\\r\\n  function formatDuration(totalMinutes) {\\r\\n    if (totalMinutes < 60) {\\r\\n      return \`\${totalMinutes}min\`;\\r\\n    }\\r\\n    \\r\\n    const hours = Math.floor(totalMinutes / 60);\\r\\n    const minutes = totalMinutes % 60;\\r\\n    \\r\\n    if (minutes === 0) {\\r\\n      return \`\${hours}hr\`;\\r\\n    }\\r\\n    \\r\\n    return \`\${hours}hr \${minutes}min\`;\\r\\n  }\\r\\n\\r\\n  $: if (data?.newsData){\\r\\n    processedContent = processHTMLContent(record.previewText);\\r\\n    \\r\\n    try {\\r\\n      const words = record.previewText.replace(/<[^>]*>/g, '').split(/\\\\s+/);\\r\\n      shouldShowToggle = words.length > WORD_LIMIT;\\r\\n    } catch (error) {\\r\\n      console.error('Error checking word count:', error);\\r\\n      shouldShowToggle = false;\\r\\n    }\\r\\n  }\\r\\n\\r\\n  onMount(() => {\\r\\n    mounted = true;\\r\\n    if (record?.previewText) {\\r\\n      processedContent = processHTMLContent(record.previewText);\\r\\n      \\r\\n      try {\\r\\n        const words = record.previewText.replace(/<[^>]*>/g, '').split(/\\\\s+/);\\r\\n        shouldShowToggle = words.length > WORD_LIMIT;\\r\\n      } catch (error) {\\r\\n        console.error('Error in onMount:', error);\\r\\n        shouldShowToggle = false;\\r\\n      }\\r\\n    }\\r\\n  });\\r\\n\\r\\n  onDestroy(() => {\\r\\n    mounted = false;\\r\\n  });\\r\\n  \\r\\n  function calculateWorkshopDetails(startDate, endDate, startTime, endTime) {\\r\\n    if (!startDate || !endDate || !startTime || !endTime) {\\r\\n      return { days: 0, totalHours: '', dailyHours: '', timeRange: '' };\\r\\n    }\\r\\n\\r\\n    try {\\r\\n      // Calculate number of days\\r\\n      const start = new Date(startDate);\\r\\n      const end = new Date(endDate);\\r\\n      const timeDiff = end.getTime() - start.getTime();\\r\\n      const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates\\r\\n\\r\\n      // Calculate daily hours\\r\\n      const [startHour, startMinute] = startTime.split(':').map(Number);\\r\\n      const [endHour, endMinute] = endTime.split(':').map(Number);\\r\\n      \\r\\n      const startTotalMinutes = startHour * 60 + startMinute;\\r\\n      const endTotalMinutes = endHour * 60 + endMinute;\\r\\n      \\r\\n      let dailyMinutes = endTotalMinutes - startTotalMinutes;\\r\\n      \\r\\n      // Handle cases where end time is next day (e.g., 23:00 to 01:00)\\r\\n      if (dailyMinutes < 0) {\\r\\n        dailyMinutes += 24 * 60;\\r\\n      }\\r\\n      \\r\\n      const totalMinutes = dailyMinutes * days;\\r\\n\\r\\n      // Format time range\\r\\n      const formatTime = (time) => {\\r\\n        const [hour, minute] = time.split(':');\\r\\n        const h = parseInt(hour);\\r\\n        const period = h >= 12 ? 'PM' : 'AM';\\r\\n        const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;\\r\\n        return \`\${displayHour}:\${minute} \${period}\`;\\r\\n      };\\r\\n\\r\\n      const timeRange = \`\${formatTime(startTime)} - \${formatTime(endTime)}\`;\\r\\n\\r\\n      return {\\r\\n        days: days,\\r\\n        totalHours: formatDuration(totalMinutes),\\r\\n        dailyHours: formatDuration(dailyMinutes),\\r\\n        timeRange: timeRange\\r\\n      };\\r\\n    } catch (error) {\\r\\n      console.error('Error calculating workshop details:', error);\\r\\n      return { days: 0, totalHours: '', dailyHours: '', timeRange: '' };\\r\\n    }\\r\\n  }\\r\\n  \\r\\n$: workshopDetails = record ? calculateWorkshopDetails(\\r\\n  record.startDate,\\r\\n  record.endDate,\\r\\n  record.startTime,\\r\\n  record.endTime\\r\\n) : { days: 0, totalHours: '', dailyHours: '', timeRange: '' };\\r\\n\\r\\n function scrollToContact() {\\r\\n    showContact = true;\\r\\n    setTimeout(() => {\\r\\n      const contactElement = document.getElementById('contact-section');\\r\\n      if (contactElement) {\\r\\n        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });\\r\\n      }\\r\\n    }, 100);\\r\\n  }\\r\\n<\/script>\\r\\n<div class=\\"mx-auto py-4 max-w-7xl px-2\\">\\r\\n{#if record}\\r\\n  <!-- Banner with Title Overlay -->\\r\\n  <!-- Banner with Title Overlay -->\\r\\n<div class=\\"relative\\">\\r\\n  <img src=\\"/banner5.png\\" alt=\\"banner5\\" class=\\"w-full h-72 md:h-80 \\" />\\r\\n  \\r\\n  <!-- Title Overlay -->\\r\\n  <div class=\\"absolute inset-0  flex items-center justify-center\\">\\r\\n    <div class=\\"text-center px-4 sm:px-8 max-w-4xl\\">\\r\\n      <h1 class=\\"text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-4\\">\\r\\n        {record?.title || 'Untitled News'}\\r\\n      </h1>\\r\\n      \\r\\n      <!-- Workshop Details -->\\r\\n      {#if record?.startDate && record?.endDate && record?.startTime && record?.endTime}\\r\\n        <div class=\\"bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 sm:p-6 mt-4\\">\\r\\n          <div class=\\"grid grid-cols-1 sm:grid-cols-3 gap-4 text-white\\">\\r\\n            <!-- Duration -->\\r\\n            <div class=\\"flex flex-col items-center\\">\\r\\n              <Icon icon=\\"ph:calendar-check\\" class=\\"text-2xl mb-2\\" />\\r\\n              <span class=\\"text-sm font-medium opacity-90\\">Duration</span>\\r\\n              <span class=\\"text-lg font-bold\\">\\r\\n                {workshopDetails.days} {workshopDetails.days === 1 ? 'Day' : 'Days'}\\r\\n              </span>\\r\\n            </div>\\r\\n            \\r\\n            <!-- Daily Timing -->\\r\\n            <div class=\\"flex flex-col items-center\\">\\r\\n              <Icon icon=\\"ph:clock\\" class=\\"text-2xl mb-2\\" />\\r\\n              <span class=\\"text-sm font-medium opacity-90\\">Daily Timing</span>\\r\\n              <span class=\\"text-lg font-bold\\">{workshopDetails.timeRange}</span>\\r\\n              <span class=\\"text-sm opacity-80\\">({workshopDetails.dailyHours}/day)</span>\\r\\n            </div>\\r\\n            \\r\\n            <!-- Total Hours -->\\r\\n            <div class=\\"flex flex-col items-center\\">\\r\\n              <Icon icon=\\"ph:hourglass\\" class=\\"text-2xl mb-2\\" />\\r\\n              <span class=\\"text-sm font-medium opacity-90\\">Total Training</span>\\r\\n              <span class=\\"text-lg font-bold\\">{workshopDetails.totalHours}</span>\\r\\n            </div>\\r\\n          </div>\\r\\n          \\r\\n          <!-- Date Range -->\\r\\n          <div class=\\"mt-4 pt-4 border-t border-white border-opacity-30\\">\\r\\n            <div class=\\"flex items-center justify-center text-white\\">\\r\\n              <Icon icon=\\"ph:calendar-dots\\" class=\\"mr-2\\" />\\r\\n              <span class=\\"text-sm font-medium\\">\\r\\n                {formatDate(record.startDate)} - {formatDate(record.endDate)}\\r\\n              </span>\\r\\n            </div>\\r\\n             <button \\r\\n                class=\\"inline-flex items-center px-3 py-2 mt-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50\\"\\r\\n                on:click={scrollToContact}\\r\\n              >\\r\\n                <Icon icon=\\"ph:user-plus\\" class=\\"mr-2\\" width=\\"18\\" height=\\"18\\"/>\\r\\n                Register Now\\r\\n              </button>\\r\\n          </div>\\r\\n        </div>\\r\\n        \\r\\n      {/if}\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n\\r\\n  <div class=\\"overflow-hidden bg-white rounded-md shadow\\" id=\\"news-content-top\\">\\r\\n    <div class=\\"p-6 sm:p-8\\">\\r\\n      <div class=\\"mb-\\">\\r\\n        <!-- Removed title from here since it's now on the banner -->\\r\\n        <div class=\\"flex items-center text-gray-500 text-sm\\">\\r\\n          <!-- <Icon icon=\\"uiw:date\\" class=\\"mr-2 flex-shrink-0\\" width=\\"16\\" height=\\"16\\"/> -->\\r\\n          <!-- <time datetime={record.createdAt}>\\r\\n            {formatDate(record.createdAt)}\\r\\n          </time> -->\\r\\n        </div>\\r\\n      </div>\\r\\n      <!-- <hr class=\\"border-t border-gray-200 mb-6\\"> -->\\r\\n\\r\\n      <div class=\\"prose prose-lg max-w-none\\">\\r\\n        {#if data?.newsdata?.previewText}\\r\\n          <article class=\\"text-gray-700 flex flex-col leading-relaxed article-content\\">\\r\\n            <div\\r\\n              class=\\"text-justify text-sm sm:text-base transition-max-height duration-500 overflow-hidden \\r\\n                \\"\\r\\n             >\\r\\n             {@html data?.newsdata?.previewText}\\r\\n       \\r\\n            </div>\\r\\n          </article>\\r\\n {#if showContact}\\r\\n            <div id=\\"contact-section\\" class=\\"mt-12 pt-8 border-t border-gray-200\\">\\r\\n              <Contact/>\\r\\n            </div>\\r\\n          {/if}\\r\\n        {:else}\\r\\n          <div class=\\"flex items-center justify-center py-12\\">\\r\\n            <div class=\\"text-center\\">\\r\\n              <Icon icon=\\"ph:article\\" width=\\"48\\" height=\\"48\\" class=\\"text-gray-400 mx-auto mb-3\\"/>\\r\\n              <p class=\\"text-gray-500 italic\\">No content available for this article.</p>\\r\\n            </div>\\r\\n          </div>\\r\\n        {/if}\\r\\n      </div>\\r\\n      <div class=\\"clear-both\\"></div>\\r\\n    </div>\\r\\n  </div>\\r\\n\\r\\n  <div class=\\"mt-8 text-center\\">\\r\\n    <a \\r\\n      href=\\"/events\\" \\r\\n      class=\\"inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50\\">\\r\\n      <Icon icon=\\"ph:arrow-left\\" class=\\"mr-2\\" width=\\"18\\" height=\\"18\\"/>\\r\\n      Back to Events List\\r\\n    </a>\\r\\n  </div>\\r\\n{:else}\\r\\n  <div class=\\"bg-white rounded-xl shadow-lg p-8 text-center\\">\\r\\n    <Icon icon=\\"ph:newspaper-clipping\\" width=\\"72\\" height=\\"72\\" class=\\"text-primary-500 mx-auto mb-4\\"/>\\r\\n    <h2 class=\\"text-xl sm:text-2xl font-semibold text-gray-800 mb-3\\">News article not found</h2>\\r\\n    <p class=\\"text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto\\">\\r\\n      The news article you're looking for is unavailable or may have been removed. Please check the URL or try again later.\\r\\n    </p>\\r\\n    \\r\\n    <a \\r\\n      href=\\"/events\\" \\r\\n      class=\\"inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl\\">\\r\\n      <Icon icon=\\"ph:arrow-left\\" class=\\"mr-2\\" width=\\"18\\" height=\\"18\\"/>\\r\\n      Return to Events List\\r\\n    </a>\\r\\n  </div>\\r\\n{/if}\\r\\n\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  :global(.article-content .image-wrapper img) {\\r\\n    border-radius: 0.5rem;\\r\\n    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\\r\\n  }\\r\\n  \\r\\n  :global(.article-content .image-wrapper.mx-auto) {\\r\\n    clear: both;\\r\\n    float: none !important;\\r\\n    display: block;\\r\\n    margin: 1.5rem auto;\\r\\n  }\\r\\n  \\r\\n  :global(.article-content p) {\\r\\n    margin-bottom: 1rem;\\r\\n    line-height: 1.7;\\r\\n  }\\r\\n  \\r\\n  :global(.article-content h1, .article-content h2, .article-content h3) {\\r\\n    margin-top: 2rem;\\r\\n    margin-bottom: 1rem;\\r\\n    font-weight: 600;\\r\\n  }\\r\\n  \\r\\n  :global(.article-content ol, .article-content ul) {\\r\\n    margin: 1rem 0;\\r\\n    /* padding-left: 1.5rem; */\\r\\n  }\\r\\n  \\r\\n  :global(.article-content li) {\\r\\n    margin-bottom: 0.5rem;\\r\\n    line-height: 1.6;\\r\\n  }\\r\\n\\r\\n  :global(.article-content .image-wrapper:not(.mx-auto)) {\\r\\n    shape-outside: margin-box;\\r\\n  }\\r\\n\\r\\n  @media (max-width: 768px) {\\r\\n    :global(.article-content .image-wrapper) {\\r\\n      float: none !important;\\r\\n      margin: 1rem auto !important;\\r\\n      max-width: 100% !important;\\r\\n      width: 100% !important;\\r\\n    }\\r\\n    \\r\\n    :global(.article-content .image-wrapper.mx-auto) {\\r\\n      margin: 1rem auto !important;\\r\\n    }\\r\\n  }\\r\\n</style>"],"names":[],"mappings":"AA4cU,mCAAqC,CAC3C,aAAa,CAAE,MAAM,CACrB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAClF,CAEQ,uCAAyC,CAC/C,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,IAAI,CAAC,UAAU,CACtB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,MAAM,CAAC,IACjB,CAEQ,kBAAoB,CAC1B,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,GACf,CAEQ,6DAA+D,CACrE,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,GACf,CAEQ,wCAA0C,CAChD,MAAM,CAAE,IAAI,CAAC,CAEf,CAEQ,mBAAqB,CAC3B,aAAa,CAAE,MAAM,CACrB,WAAW,CAAE,GACf,CAEQ,6CAA+C,CACrD,aAAa,CAAE,UACjB,CAEA,MAAO,YAAY,KAAK,CAAE,CAChB,+BAAiC,CACvC,KAAK,CAAE,IAAI,CAAC,UAAU,CACtB,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,UAAU,CAC5B,SAAS,CAAE,IAAI,CAAC,UAAU,CAC1B,KAAK,CAAE,IAAI,CAAC,UACd,CAEQ,uCAAyC,CAC/C,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,UACpB,CACF"}`
};
const WORD_LIMIT = 150;
function formatDate(dateString) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch (e) {
    console.error("Invalid date format:", dateString);
    return "";
  }
}
function formatDuration(totalMinutes) {
  if (totalMinutes < 60) {
    return `${totalMinutes}min`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours}hr`;
  }
  return `${hours}hr ${minutes}min`;
}
function calculateWorkshopDetails(startDate, endDate, startTime, endTime) {
  if (!startDate || !endDate || !startTime || !endTime) {
    return {
      days: 0,
      totalHours: "",
      dailyHours: "",
      timeRange: ""
    };
  }
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const days = Math.ceil(timeDiff / (1e3 * 3600 * 24)) + 1;
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    let dailyMinutes = endTotalMinutes - startTotalMinutes;
    if (dailyMinutes < 0) {
      dailyMinutes += 24 * 60;
    }
    const totalMinutes = dailyMinutes * days;
    const formatTime = (time) => {
      const [hour, minute] = time.split(":");
      const h = parseInt(hour);
      const period = h >= 12 ? "PM" : "AM";
      const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${displayHour}:${minute} ${period}`;
    };
    const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)}`;
    return {
      days,
      totalHours: formatDuration(totalMinutes),
      dailyHours: formatDuration(dailyMinutes),
      timeRange
    };
  } catch (error) {
    console.error("Error calculating workshop details:", error);
    return {
      days: 0,
      totalHours: "",
      dailyHours: "",
      timeRange: ""
    };
  }
}
const NewsHall = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let record;
  let workshopDetails;
  let { data } = $$props;
  console.log("newsroom data--->>", data);
  let shouldShowToggle = false;
  data?.newsid;
  function processHTMLContent(htmlContent) {
    return htmlContent;
  }
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  record = data?.newsdata;
  {
    if (data?.newsData) {
      processHTMLContent(record.previewText);
      try {
        const words = record.previewText.replace(/<[^>]*>/g, "").split(/\s+/);
        shouldShowToggle = words.length > WORD_LIMIT;
      } catch (error) {
        console.error("Error checking word count:", error);
        shouldShowToggle = false;
      }
    }
  }
  workshopDetails = record ? calculateWorkshopDetails(record.startDate, record.endDate, record.startTime, record.endTime) : {
    days: 0,
    totalHours: "",
    dailyHours: "",
    timeRange: ""
  };
  return `<div class="mx-auto py-4 max-w-7xl px-2">${record ? `  <div class="relative"><img src="/banner5.png" alt="banner5" class="w-full h-72 md:h-80 ">  <div class="absolute inset-0 flex items-center justify-center"><div class="text-center px-4 sm:px-8 max-w-4xl"><h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-4">${escape(record?.title || "Untitled News")}</h1>  ${record?.startDate && record?.endDate && record?.startTime && record?.endTime ? `<div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 sm:p-6 mt-4"><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white"> <div class="flex flex-col items-center">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:calendar-check",
      class: "text-2xl mb-2"
    },
    {},
    {}
  )} <span class="text-sm font-medium opacity-90" data-svelte-h="svelte-awavff">Duration</span> <span class="text-lg font-bold">${escape(workshopDetails.days)} ${escape(workshopDetails.days === 1 ? "Day" : "Days")}</span></div>  <div class="flex flex-col items-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "ph:clock", class: "text-2xl mb-2" }, {}, {})} <span class="text-sm font-medium opacity-90" data-svelte-h="svelte-172qylc">Daily Timing</span> <span class="text-lg font-bold">${escape(workshopDetails.timeRange)}</span> <span class="text-sm opacity-80">(${escape(workshopDetails.dailyHours)}/day)</span></div>  <div class="flex flex-col items-center">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:hourglass",
      class: "text-2xl mb-2"
    },
    {},
    {}
  )} <span class="text-sm font-medium opacity-90" data-svelte-h="svelte-v3mrwn">Total Training</span> <span class="text-lg font-bold">${escape(workshopDetails.totalHours)}</span></div></div>  <div class="mt-4 pt-4 border-t border-white border-opacity-30"><div class="flex items-center justify-center text-white">${validate_component(Icon, "Icon").$$render($$result, { icon: "ph:calendar-dots", class: "mr-2" }, {}, {})} <span class="text-sm font-medium">${escape(formatDate(record.startDate))} - ${escape(formatDate(record.endDate))}</span></div> <button class="inline-flex items-center px-3 py-2 mt-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:user-plus",
      class: "mr-2",
      width: "18",
      height: "18"
    },
    {},
    {}
  )}
                Register Now</button></div></div>` : ``}</div></div></div> <div class="overflow-hidden bg-white rounded-md shadow" id="news-content-top"><div class="p-6 sm:p-8"><div class="mb-" data-svelte-h="svelte-1u299s7"> <div class="flex items-center text-gray-500 text-sm"> </div></div>  <div class="prose prose-lg max-w-none">${data?.newsdata?.previewText ? `<article class="text-gray-700 flex flex-col leading-relaxed article-content"><div class="text-justify text-sm sm:text-base transition-max-height duration-500 overflow-hidden "><!-- HTML_TAG_START -->${data?.newsdata?.previewText}<!-- HTML_TAG_END --></div></article> ${``}` : `<div class="flex items-center justify-center py-12"><div class="text-center">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:article",
      width: "48",
      height: "48",
      class: "text-gray-400 mx-auto mb-3"
    },
    {},
    {}
  )} <p class="text-gray-500 italic" data-svelte-h="svelte-1ld78ge">No content available for this article.</p></div></div>`}</div> <div class="clear-both"></div></div></div> <div class="mt-8 text-center"><a href="/events" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:arrow-left",
      class: "mr-2",
      width: "18",
      height: "18"
    },
    {},
    {}
  )}
      Back to Events List</a></div>` : `<div class="bg-white rounded-xl shadow-lg p-8 text-center">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:newspaper-clipping",
      width: "72",
      height: "72",
      class: "text-primary-500 mx-auto mb-4"
    },
    {},
    {}
  )} <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-3" data-svelte-h="svelte-oqueo1">News article not found</h2> <p class="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto" data-svelte-h="svelte-hje4xy">The news article you&#39;re looking for is unavailable or may have been removed. Please check the URL or try again later.</p> <a href="/events" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:arrow-left",
      class: "mr-2",
      width: "18",
      height: "18"
    },
    {},
    {}
  )}
      Return to Events List</a></div>`} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data, "dataaaaaaaaaaaaaa");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(NewsHall, "NewsHall").$$render($$result, { data }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-D7WbSaHV.js.map
