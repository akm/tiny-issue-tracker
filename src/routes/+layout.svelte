<script lang="ts">
	import '../app.css';

	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
	} from 'flowbite-svelte';
	import { Cog } from 'svelte-heros-v2';

	let { children } = $props();
</script>

<header class="flex-none w-full mx-auto bg-white dark:bg-slate-950">
	<Navbar let:hidden let:toggle>
		<NavHamburger
			on:click={toggleDrawer}
			btnClass="focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 m-0 mr-3 lg:hidden"
		/>
		<NavBrand href="/" class="lg:ml-64">
			<Cog />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
				My Website
			</span>
		</NavBrand>
		<NavUl
			{hidden}
			{divClass}
			{ulClass}
			nonActiveClass="md:!pl-3 md:!py-2 lg:!pl-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
			activeClass="md:!pl-3 md:!py-2 lg:!pl-0 lg:text-primary-700 text-white dark:text-white dark:lg:text-primary-500 bg-primary-700 lg:bg-transparent dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
		>
			<NavLi class="lg:px-2 lg:mb-0" active={activeUrl === '/'} href="/">Home</NavLi>
			<NavLi class="lg:px-2 lg:mb-0" active={activeUrl === '/pages/about'} href="/pages/about"
				>About</NavLi
			>
			<NavLi
				class="lg:px-2 lg:mb-0"
				href="https://github.com/shinokada/flowbite-sveltekit-responsive-sidebar-layout"
				>GitHub</NavLi
			>
		</NavUl>
		<div class="flex items-center ml-auto">
			<DarkMode class="inline-block dark:hover:text-white hover:text-gray-900" />
		</div>
		<NavHamburger on:click={toggle} btnClass="lg:hidden" />
	</Navbar>
</header>

<div class="flex px-4 mx-auto w-full">
	<main class="lg:ml-72 w-full mx-auto">
		{@render children()}
	</main>
</div>
