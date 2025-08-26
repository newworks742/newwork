<script>
  import { PUBLIC_COMPBUY_IMAGE_PATH, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import Icon from "@iconify/svelte";
	// import ShareButton from './ProductpageComponents/ShareButton.svelte';
import Contact from '$lib/components/Contactus_Final/Registerweb.svelte';
  
  export let data;
  console.log("newsroom data--->>",data)
    let showContact = false;
  $: record = data?.newsdata;

  let isExpanded = false;
  let shouldShowToggle = false;
  let processedContent = '';
  let mounted = false;
  
  const WORD_LIMIT = 150;
  const wpn = data?.newsid;
  
  function processHTMLContent(htmlContent) {
  if (!htmlContent || !browser) return htmlContent;
  
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const images = tempDiv.querySelectorAll('img');
    
    images.forEach((img) => {
      let alignment = getImageAlignment(img);
      
      const wrapper = document.createElement('div');
      let alignmentClass = '';
      
      if (alignment === 'left') {
        alignmentClass = 'float-left mr-6 mb-4 max-w-sm w-full sm:w-1/2 lg:w-1/3';
      } else if (alignment === 'right') {
        alignmentClass = 'float-right ml-6 mb-4 max-w-sm w-full sm:w-1/2 lg:w-1/3';
      } else if (alignment === 'center') {
        alignmentClass = 'mx-auto mb-6 max-w-lg w-full clear-both block';
      } else {
        alignmentClass = 'float-left mr-6 mb-4 max-w-sm w-full sm:w-1/2 lg:w-1/3';
      }
      
      wrapper.className = `image-wrapper ${alignmentClass}`;
      
      img.className = 'w-full h-auto rounded-lg shadow-md transition-transform duration-300 object-cover';
      img.style.maxHeight = '300px';
      img.loading = 'lazy';

      img.onerror = function() {
        this.src = '/Digitoad.jpeg';
      };

      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    });

    const floatingWrappers = tempDiv.querySelectorAll('.image-wrapper');
    const actualFloatingWrappers = Array.from(floatingWrappers).filter(wrapper => 
      wrapper.className.includes('float-left') || wrapper.className.includes('float-right')
    );
    
    actualFloatingWrappers.forEach((wrapper, index) => {
      if ((index + 1) % 2 === 0 || index === actualFloatingWrappers.length - 1) {
        const clearDiv = document.createElement('div');
        clearDiv.className = 'clear-both';
        if (wrapper.nextSibling) {
          wrapper.parentNode.insertBefore(clearDiv, wrapper.nextSibling);
        } else {
          wrapper.parentNode.appendChild(clearDiv);
        }
      }
    });
    
    return tempDiv.innerHTML;
  } catch (error) {
    console.error('Error processing HTML content:', error);
    return htmlContent;
  }
}

function getImageAlignment(img) {
  const imgStyle = img.style.cssText.toLowerCase();
  if (imgStyle.includes('float: left') || imgStyle.includes('float:left')) {
    return 'left';
  }
  if (imgStyle.includes('float: right') || imgStyle.includes('float:right')) {
    return 'right';
  }
  if (imgStyle.includes('text-align: center') || imgStyle.includes('text-align:center')) {
    return 'center';
  }

  let parent = img.parentElement;
  while (parent && parent !== document.body) {
    const className = parent.className ? parent.className.toLowerCase() : '';
    const style = parent.style ? parent.style.cssText.toLowerCase() : '';
    
    if (className.includes('ql-align-left') || className.includes('text-left') || style.includes('text-align: left')) {
      return 'left';
    }
    if (className.includes('ql-align-right') || className.includes('text-right') || style.includes('text-align: right')) {
      return 'right';
    }
    if (className.includes('ql-align-center') || className.includes('text-center') || style.includes('text-align: center')) {
      return 'center';
    }
    
    if (style.includes('float: left') || style.includes('float:left')) {
      return 'left';
    }
    if (style.includes('float: right') || style.includes('float:right')) {
      return 'right';
    }
    
    parent = parent.parentElement;
  }
  
  const paragraph = img.closest('p');
  if (paragraph) {
    const pClass = paragraph.className ? paragraph.className.toLowerCase() : '';
    const pStyle = paragraph.style ? paragraph.style.cssText.toLowerCase() : '';
    
    if (pClass.includes('ql-align-left') || pClass.includes('text-left') || pStyle.includes('text-align: left')) {
      return 'left';
    }
    if (pClass.includes('ql-align-right') || pClass.includes('text-right') || pStyle.includes('text-align: right')) {
      return 'right';
    }
    if (pClass.includes('ql-align-center') || pClass.includes('text-center') || pStyle.includes('text-align: center')) {
      return 'center';
    }
  }
  
  const dataAlign = img.getAttribute('data-align');
  if (dataAlign) {
    return dataAlign.toLowerCase();
  }
  
  const alt = img.alt ? img.alt.toLowerCase() : '';
  const title = img.title ? img.title.toLowerCase() : '';
  if (alt.includes('left') || title.includes('left')) {
    return 'left';
  }
  if (alt.includes('right') || title.includes('right')) {
    return 'right';
  }
  if (alt.includes('center') || title.includes('center')) {
    return 'center';
  }

  return null;
}
  
  function truncateText(text, wordLimit) {
    if (!text) return '';
    
    try {
      const textWithoutHtml = text.replace(/<[^>]*>/g, '');
      const words = textWithoutHtml.split(/\s+/);
      return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : textWithoutHtml;
    } catch (error) {
      console.error('Error truncating text:', error);
      return text;
    }
  }
  
  function toggleExpand() {
    isExpanded = !isExpanded;

    if (!isExpanded && browser) {
      setTimeout(() => {
        const contentTop = document.getElementById("news-content-top");
        if (contentTop) {
          contentTop.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }
  
  function formatDate(dateString) {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error("Invalid date format:", dateString);
      return "";
    }
  }
  
  function getImageUrl(image) {
    if (!image) return '/Digitoad.jpeg';
    try {
      return image.includes('/')
        ? image
        : `${PUBLIC_COMPBUY_IMAGE_PATH}/part/${image}`;
    } catch (error) {
      console.error('Error getting image URL:', error);
      return '/Digitoad.jpeg';
    }
  }

  // Helper function to format minutes into "Xhr Ymin" format
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

  $: if (data?.newsData){
    processedContent = processHTMLContent(record.previewText);
    
    try {
      const words = record.previewText.replace(/<[^>]*>/g, '').split(/\s+/);
      shouldShowToggle = words.length > WORD_LIMIT;
    } catch (error) {
      console.error('Error checking word count:', error);
      shouldShowToggle = false;
    }
  }

  onMount(() => {
    mounted = true;
    if (record?.previewText) {
      processedContent = processHTMLContent(record.previewText);
      
      try {
        const words = record.previewText.replace(/<[^>]*>/g, '').split(/\s+/);
        shouldShowToggle = words.length > WORD_LIMIT;
      } catch (error) {
        console.error('Error in onMount:', error);
        shouldShowToggle = false;
      }
    }
  });

  onDestroy(() => {
    mounted = false;
  });
  
  function calculateWorkshopDetails(startDate, endDate, startTime, endTime) {
    if (!startDate || !endDate || !startTime || !endTime) {
      return { days: 0, totalHours: '', dailyHours: '', timeRange: '' };
    }

    try {
      // Calculate number of days
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end.getTime() - start.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates

      // Calculate daily hours
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      
      let dailyMinutes = endTotalMinutes - startTotalMinutes;
      
      // Handle cases where end time is next day (e.g., 23:00 to 01:00)
      if (dailyMinutes < 0) {
        dailyMinutes += 24 * 60;
      }
      
      const totalMinutes = dailyMinutes * days;

      // Format time range
      const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        const h = parseInt(hour);
        const period = h >= 12 ? 'PM' : 'AM';
        const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${displayHour}:${minute} ${period}`;
      };

      const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)}`;

      return {
        days: days,
        totalHours: formatDuration(totalMinutes),
        dailyHours: formatDuration(dailyMinutes),
        timeRange: timeRange
      };
    } catch (error) {
      console.error('Error calculating workshop details:', error);
      return { days: 0, totalHours: '', dailyHours: '', timeRange: '' };
    }
  }
  
$: workshopDetails = record ? calculateWorkshopDetails(
  record.startDate,
  record.endDate,
  record.startTime,
  record.endTime
) : { days: 0, totalHours: '', dailyHours: '', timeRange: '' };

 function scrollToContact() {
    showContact = true;
    setTimeout(() => {
      const contactElement = document.getElementById('contact-section');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
</script>
<div class="mx-auto py-4 max-w-7xl px-2">
{#if record}
  <!-- Banner with Title Overlay -->
  <!-- Banner with Title Overlay -->
<div class="relative">
  <img src="/banner5.png" alt="banner5" class="w-full h-72 md:h-80 " />
  
  <!-- Title Overlay -->
  <div class="absolute inset-0  flex items-center justify-center">
    <div class="text-center px-4 sm:px-8 max-w-4xl">
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-4">
        {record?.title || 'Untitled News'}
      </h1>
      
      <!-- Workshop Details -->
      {#if record?.startDate && record?.endDate && record?.startTime && record?.endTime}
        <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 sm:p-6 mt-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            <!-- Duration -->
            <div class="flex flex-col items-center">
              <Icon icon="ph:calendar-check" class="text-2xl mb-2" />
              <span class="text-sm font-medium opacity-90">Duration</span>
              <span class="text-lg font-bold">
                {workshopDetails.days} {workshopDetails.days === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            
            <!-- Daily Timing -->
            <div class="flex flex-col items-center">
              <Icon icon="ph:clock" class="text-2xl mb-2" />
              <span class="text-sm font-medium opacity-90">Daily Timing</span>
              <span class="text-lg font-bold">{workshopDetails.timeRange}</span>
              <span class="text-sm opacity-80">({workshopDetails.dailyHours}/day)</span>
            </div>
            
            <!-- Total Hours -->
            <div class="flex flex-col items-center">
              <Icon icon="ph:hourglass" class="text-2xl mb-2" />
              <span class="text-sm font-medium opacity-90">Total Training</span>
              <span class="text-lg font-bold">{workshopDetails.totalHours}</span>
            </div>
          </div>
          
          <!-- Date Range -->
          <div class="mt-4 pt-4 border-t border-white border-opacity-30">
            <div class="flex items-center justify-center text-white">
              <Icon icon="ph:calendar-dots" class="mr-2" />
              <span class="text-sm font-medium">
                {formatDate(record.startDate)} - {formatDate(record.endDate)}
              </span>
            </div>
             <button 
                class="inline-flex items-center px-3 py-2 mt-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50"
                on:click={scrollToContact}
              >
                <Icon icon="ph:user-plus" class="mr-2" width="18" height="18"/>
                Register Now
              </button>
          </div>
        </div>
        
      {/if}
    </div>
  </div>
</div>


  <div class="overflow-hidden bg-white rounded-md shadow" id="news-content-top">
    <div class="p-6 sm:p-8">
      <div class="mb-">
        <!-- Removed title from here since it's now on the banner -->
        <div class="flex items-center text-gray-500 text-sm">
          <!-- <Icon icon="uiw:date" class="mr-2 flex-shrink-0" width="16" height="16"/> -->
          <!-- <time datetime={record.createdAt}>
            {formatDate(record.createdAt)}
          </time> -->
        </div>
      </div>
      <!-- <hr class="border-t border-gray-200 mb-6"> -->

      <div class="prose prose-lg max-w-none">
        {#if data?.newsdata?.previewText}
          <article class="text-gray-700 flex flex-col leading-relaxed article-content">
            <div
              class="text-justify text-sm sm:text-base transition-max-height duration-500 overflow-hidden 
                "
             >
             {@html data?.newsdata?.previewText}
       
            </div>
          </article>
 {#if showContact}
            <div id="contact-section" class="mt-12 pt-8 border-t border-gray-200">
              <Contact/>
            </div>
          {/if}
        {:else}
          <div class="flex items-center justify-center py-12">
            <div class="text-center">
              <Icon icon="ph:article" width="48" height="48" class="text-gray-400 mx-auto mb-3"/>
              <p class="text-gray-500 italic">No content available for this article.</p>
            </div>
          </div>
        {/if}
      </div>
      <div class="clear-both"></div>
    </div>
  </div>

  <div class="mt-8 text-center">
    <a 
      href="/events" 
      class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50">
      <Icon icon="ph:arrow-left" class="mr-2" width="18" height="18"/>
      Back to Events List
    </a>
  </div>
{:else}
  <div class="bg-white rounded-xl shadow-lg p-8 text-center">
    <Icon icon="ph:newspaper-clipping" width="72" height="72" class="text-primary-500 mx-auto mb-4"/>
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">News article not found</h2>
    <p class="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
      The news article you're looking for is unavailable or may have been removed. Please check the URL or try again later.
    </p>
    
    <a 
      href="/events" 
      class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
      <Icon icon="ph:arrow-left" class="mr-2" width="18" height="18"/>
      Return to Events List
    </a>
  </div>
{/if}

</div>

<style>
  :global(.article-content .image-wrapper img) {
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  :global(.article-content .image-wrapper.mx-auto) {
    clear: both;
    float: none !important;
    display: block;
    margin: 1.5rem auto;
  }
  
  :global(.article-content p) {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
  
  :global(.article-content h1, .article-content h2, .article-content h3) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  :global(.article-content ol, .article-content ul) {
    margin: 1rem 0;
    /* padding-left: 1.5rem; */
  }
  
  :global(.article-content li) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  :global(.article-content .image-wrapper:not(.mx-auto)) {
    shape-outside: margin-box;
  }

  @media (max-width: 768px) {
    :global(.article-content .image-wrapper) {
      float: none !important;
      margin: 1rem auto !important;
      max-width: 100% !important;
      width: 100% !important;
    }
    
    :global(.article-content .image-wrapper.mx-auto) {
      margin: 1rem auto !important;
    }
  }
</style>