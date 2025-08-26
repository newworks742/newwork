<script>
	// import { authedUser, cartTotalComps } from '$lib/stores/mainStore.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import menusdata from '$lib/data/Navbar/menus.json';
	import { toast, Toaster } from 'svelte-sonner';
	// let username = $authedUser?.username;
	let menus = [];
	let activeMenu = null;
	let activeSubmenu = null;
	let form;
	export let data;
	$: if (data?.redirect) {
		goto(data.redirect);
	}
	// cartTotalComps.set(0);
	$: username = '';

	onMount(async () => {
		try {
			menus = menusdata.menus;
		} catch (error) {
			console.error('Error handling cart expiration:', error);
		}
	});

	function toggleMenu(menu) {
		activeMenu = activeMenu === menu ? null : menu;
		if (activeMenu) activeSubmenu = null;
	}

	let menuTimeoutId;

	function handleMouseEnterMenu(menu) {
		clearTimeout(menuTimeoutId);
		activeMenu = menu;
		activeSubmenu = null;
	}

	function handleMouseLeaveMenu() {
		menuTimeoutId = setTimeout(() => {
			activeMenu = null;
			activeSubmenu = null;
		}, 300);
	}
	function navigateTo(url) {
		goto(url);
		// window.location.href = url;
	}
	let isOpen = false;

	function toggleLogoMenu() {
		isOpen = !isOpen;
	}
	function handleOverlayClick() {
		isOpen = false;
	}
</script>

<div class="bg-white">
	<Toaster position="bottom-right" richColors />
	<nav class="py-2 flex justify-between items-center relative w-full lg:w-11/12 mx-auto max-w-7xl">
		{#if isOpen}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="fixed inset-0 z-40 bg-white bg-opacity-50" on:click={handleOverlayClick}></div>
		{/if}

		<!-- Mobile hamburger menu button -->
		<div class="flex md:hidden">
			<button
				on:click={toggleLogoMenu}
				class="flex items-center text-primary-700 focus:outline-none"
			>
				<Icon icon="mdi:menu" class="w-10 h-5 text-primary-700 hover:scale-105" />
			</button>
		</div>

		<!-- Mobile Menu Sliding Panel -->
		<div
			class={`fixed top-0 left-0 h-full bg-primary-900 bg-opacity-70 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-50 w-9/12 overflow-y-auto`}
		>
			<div class="flex flex-col h-full p-6 text-primary">
				<div class="flex justify-between p-2 overflow-hidden">
					<button
						on:click={() => {
							navigateTo('/');
						}}
						class="text-xl lg:text-3xl py-2 font-roboto font-bold md:mb-0 text-white"
					>
						Digitoad Technologis
					</button>
					<button on:click={toggleLogoMenu} class="text-2xl py-2 hover:text-primary-400">
						<Icon icon="mdi:close" class="size-6" />
					</button>
				</div>
				{#if activeMenu === null}
					{#each menus as menu}
						<span
							class="flex flex-row hover:bg-gray-700 hover:text-white hover:text-white transition rounded transform hover:scale-105 duration-200"
						>
							<button
								on:click={() => {
									navigateTo(menu.href);
									isOpen = false;
								}}
								class="flex justify-between text-left text-white hover:text-white w-full py-2 px-2 ml-2"
							>
								{menu.title}
							</button>
							{#if menu.submenus && menu.submenus.length > 0}
								<button on:click={() => toggleMenu(menu)}>
									<Icon icon="prime:chevron-down" class="w-5 h-5 mr-2 text-primary-700" />
								</button>
							{/if}
						</span>
					{/each}
				{:else}
					<button
						on:click={() => toggleMenu(null)}
						class="text-primary-700 flex items-center gap-3 text-left font-semibold py-2 px-0 rounded transition duration-200 transform hover:scale-105"
					>
						<Icon icon="material-symbols:chevron-backward" class="w-5 h-5" />
						Back
					</button>
				{/if}
			</div>
		</div>

		<!-- Logo -->
		<div class="flex items-center">
			<button
				on:click={() => {
					navigateTo('/');
				}}
				class="flex items-center text-primary-700"
			>
				<img
					src="/logo.png"
					alt="Digitoad"
					class="h-8 w-auto sm:h-10 md:h-12"
				/>
			</button>
		</div>
		<div class="hidden md:flex items-center">
			<div class="flex items-center  lg:gap-2">
				{#each menus as menu, index}
					<!-- svelte-ignore a11y-interactive-supports-focus -->
					<div
						class="relative text-primary-700 hover:scale-x-105 hover:text-white group"
						role="menu"
						on:mouseenter={() => handleMouseEnterMenu(menu)}
						on:mouseleave={handleMouseLeaveMenu}
					>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							on:click|stopPropagation={() => navigateTo(menu.href)}
							class={`rounded-t-md py-2 pr-2 pl-3 transition-transform duration-100 ease-in-out cursor-pointer ${activeMenu === menu ? 'bg-primary-500' : ''}`}
						>
							<button
								on:click|stopPropagation={() => navigateTo(menu.href)}
								class="flex items-center text-nowrap md:text-base font-medium text-left w-full hover:scale-105 text-primary"
								role="menuitem"
							>
								{menu.title}
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="md:hidden w-10"></div>
	</nav>
</div>