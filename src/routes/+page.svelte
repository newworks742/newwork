<script>
  // import About from "$lib/components/Home/About.svelte";
  // import TopPubs from "$lib/components/Home/TopPubs.svelte";
  import HeroSec from "$lib/components/Herosection_updated.svelte";
import Section2 from "$lib/components/section2.svelte";
import Section3 from "$lib/components/section3.svelte";
import Section4 from "$lib/components/section4.svelte";
  export let data;
  console.log(data,"ia m from +page");
</script>



  <HeroSec/>
  <Section2 />
  <Section3 />
  <Section4 />
  <!-- <div class=" max-w-10xl mx-auto">
  <TopPubs pubdata={data.featuredPubs} /> 
  <div class="bg-white">
  <PopularAreasCarousel/>
  </div>
    <div class="bg-white">
  <Locationcar/>
  <Benefit/>
    </div>
  <About/>
  <PreOrder/> -->
    <!-- <Grid/> -->
    <!-- <Dance /> -->
<!-- </div> -->