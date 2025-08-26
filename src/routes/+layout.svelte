<script>
  import '../app.css';
  // import { authedUser } from '$lib/stores/mainStores.js';
//   import { page } from '$app/stores';
//   import { derived } from 'svelte/store';

  import NavBar from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  // import FloatingButton from '$lib/components/FloatingButton.svelte';
  // import Loading from '$lib/components/Loading.svelte';
  // import TopScroll from '$lib/components/TopScroll.svelte';
  // export let data;
  // $authedUser = data?.authedUser;



</script>

<div class="flex flex-col min-h-screen bg-white">
  <!-- {#if !$hideLayout} -->
    <div class="sticky top-0 z-50">
      <NavBar  />
    </div>
  <!-- {/if} -->

  <main class="flex-grow">
    <slot />
  </main>
  
  <!-- <Loading/> -->

  <!-- {#if !$hideLayout}
      {#if !isAuthRoutehelp} -->
      <!-- <TopScroll />
    <FloatingButton /> -->
    <!-- {/if} -->
    <Footer />
  <!-- {/if} -->
</div>
