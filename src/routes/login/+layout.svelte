<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import { DarkMode, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { Cog } from 'svelte-heros-v2';

	let { children } = $props();

	let activeUrl = $derived(page.url.pathname);
	let divClass = 'w-full ml-auto lg:block lg:w-auto order-1 lg:order-none';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 dark:lg:bg-transparent lg:bg-white lg:border-0';
</script>

<header class="mx-auto w-full flex-none bg-white dark:bg-slate-950">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<Cog />
			<span class="self-center pl-4 text-xl font-semibold whitespace-nowrap dark:text-white">
				My Website
			</span>
		</NavBrand>
		<NavUl
			{activeUrl}
			{hidden}
			{divClass}
			{ulClass}
			nonActiveClass="md:!pl-3 md:!py-2 lg:!pl-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
			activeClass="md:!pl-3 md:!py-2 lg:!pl-0 lg:text-primary-700 text-white dark:text-white dark:lg:text-primary-500 bg-primary-700 lg:bg-transparent dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
		>
			<NavLi class="lg:mb-0 lg:px-2" href="/">Home</NavLi>
			<NavLi class="lg:mb-0 lg:px-2" href="/pages/about">About</NavLi>
			<NavLi
				class="lg:mb-0 lg:px-2"
				href="https://github.com/shinokada/flowbite-sveltekit-responsive-sidebar-layout"
				>GitHub</NavLi
			>
		</NavUl>
		<div class="ml-auto flex items-center">
			<DarkMode class="inline-block hover:text-gray-900 dark:hover:text-white" />
		</div>
		<NavHamburger on:click={toggle} class="lg:hidden" />
	</Navbar>
</header>

<div class="mx-auto flex w-full px-4">
	<main class="mx-auto w-full">
		{@render children()}
	</main>
</div>
