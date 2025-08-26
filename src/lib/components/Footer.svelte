<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  export let companyAddress = "AB square, #617, 1st Floor, 5th main,OMBR Layout,";

  const footerLinks = {
    company: [
		{ name: "Events", href: "/events" },
		{ name: "Academics", href: "/academics" },
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contactus" },
      { name: "Solutions", href: "/solutions" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: "/fb.png",
      href: "https://facebook.com/digitoad",
      colorClass: "facebook",
    },
    {
      name: "Instagram",
      icon: "/insta.png",
      href: "https://www.instagram.com/digitoad_tech_official",
      colorClass: "instagram",
    },
    {
      name: "LinkedIn",
      icon: "/linkedin.png",
      href: "https://www.linkedin.com/company/digitoad-technologies",
      colorClass: "linkedin",
    },
    {
      name: "Unknown",
      icon: "/unknown.png",
      href: "https://youtube.com/digitoad",
      colorClass: "youtube",
    },
  ];

  const visibleSocialLinks = socialLinks.filter((link) => link.href);
</script>

<footer class="bg-black/80 w-full">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:w-11/12">
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 text-sm text-black"
    >
      <div class="text-center md:text-left md:border-r lg:pr-3 xl:pr-0">
        <div class="mb-4">
          <div
            class="text-xl font-bold text-white"
            role="button"
            tabindex="0"
            on:keydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                goto("/");
              }
            }}
            on:click={() => goto("/")}
          >
            <span class="text-primary-500">DigiToad Technologies Pvt. Ltd</span>
          </div>
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
on:click={() => window.open('https://www.google.com/maps/dir//AB+Square,+%23617,+5th+main,+OMBR+Layout,+Kasturi+Nagar,+Banaswadi,+Bengaluru,+Karnataka+560043/@13.0097351,77.5743769,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae112d1abb53f7:0xf8d9ca53508767a0!2m2!1d77.6567788!2d13.0097481?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D', '_blank')}

          class="cursor-pointer hover:underline hover:underline-offset-2 text-white group hover:text-primary-400"
        >
          <p class="text-white group-hover:text-primary-400">
            {companyAddress}
          </p>
          <span>Bangalore - 560036</span>
        </div>
        <div class="my-2 text-white space-y-2">
          <div>
            Call us at: <a href="tel:6362387840" class="hover:text-primary-400"
              >+91 6362387840</a
            >
          </div>
          <div>
            Email us at: <a
              href="mailto:sales@digitoadtech.com"
              class="hover:text-primary-400">sales@digitoadtech.com</a
            >
          </div>
        </div>
      </div>

      <div class="text-center md:text-left md:border-r">
        <h5 class="font-semibold mb-4 text-primary-500 text-xl">
          Useful Links
        </h5>
        <ul class="space-y-3">
          {#each footerLinks.company as link}
            <li>
              <a href={link.href} class="text-white hover:text-primary-400">
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="text-center md:text-left">
        <div>
          <h2 class="font-semibold mb-4 text-primary-500 text-xl">
            Stay updated - follow us!
          </h2>
          <p class="text-sm text-white mb-3">
            Stay connected with us through our social platforms.
          </p>
          <div
            class="flex justify-center md:justify-start space-x-2 md:space-x-2 lg:space-x-4 items-center"
          >
            {#each socialLinks as social, i (social.name)}
              {#if social.href}
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class={`w-8 h-8 rounded-full flex items-center justify-center bg-${social.colorClass} text-white hover:scale-110 hover:text-${social.colorClass} transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <img  src={social.icon} alt="Icon"class="w-16 h-12"  />
                </a>
                {#if i < visibleSocialLinks.length - 1}
                  <div class="w-6 md:w-4 xl:w-6 h-px bg-white mx-4"></div>
                {/if}
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-12 pt-8 border-t border-gray-200 text-center text-white text-sm"
    >
      <div class="sm:inline-block block">
        &copy; {new Date().getFullYear()}
        <span class="font-semibold">DigiToad Technologies.</span>
      </div>
      <div class="sm:inline-block block sm:ml-2 mt-1 sm:mt-0">
        All rights reserved.
      </div>
    </div>
  </div>
</footer>
