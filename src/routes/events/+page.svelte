<script>
  export let data;
  const { firstComponent, secondComponent } = data;

  import Event from "$lib/components/Newshome.svelte";
  // import UpcomingEvents from "$lib/components/home/UpcomingEvents.svelte";

  let isopen = false;

  function open() {
    isopen = !isopen;
  }
</script>

<svelte:head>
  <title>Digitoad | Events page</title>
  <meta name="description" content="" />
</svelte:head>

<div>
  <Event {data} />
</div>
