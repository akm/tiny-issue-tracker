<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Drawer,
		CloseButton,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	import { Cog } from 'svelte-heros-v2';
	import { sineIn } from 'svelte/easing';

	let { children } = $props();

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let breakPoint: number = 1024;
	let width: number = $state(0);
	let backdrop: boolean = false;

	let drawerHidden = $derived(width < breakPoint);
	let activateClickOutside = $derived(width < breakPoint);

	onMount(() => {
		drawerHidden = width < breakPoint;
	});
	const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};
	const showDrawer = () => {
		drawerHidden = false;
	};
	const hideDrawer = () => {
		drawerHidden = true;
	};
	let activeUrl = $derived(page.url.pathname);
	let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
	let divClass = 'w-full ml-auto lg:block lg:w-auto order-1 lg:order-none';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 dark:lg:bg-transparent lg:bg-white lg:border-0';
</script>

<svelte:window bind:innerWidth={width} />
<header class="mx-auto w-full flex-none bg-white dark:bg-slate-950">
	<Navbar let:hidden let:toggle>
		<NavHamburger
			on:click={showDrawer}
			class="m-0 mr-3 rounded-lg p-1.5 whitespace-normal hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none lg:hidden dark:hover:bg-gray-600"
		/>
		<NavBrand href="/" class="lg:ml-64">
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

<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
	width="w-64"
	class="overflow-scroll-y pb-32"
	id="sidebar"
>
	<div class="flex items-center">
		<CloseButton on:click={hideDrawer} class="mb-4 lg:hidden dark:text-white" />
	</div>
	<Sidebar asideClass="w-54" {activeUrl}>
		<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
			<SidebarGroup>
				<SidebarItem label="Home" href="/" on:click={toggleSide} />
				<SidebarItem label="Issues" href="/issues" />
				<SidebarItem label="Organizations" href="/organizations" />
				<SidebarItem label="Users" href="/users" />
				{#each page.data.pages as { meta, path } (path)}
					<SidebarItem
						label={meta.title}
						href={`/pages/${path}`}
						{spanClass}
						activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						on:click={toggleSide}
					/>
				{/each}
				<SidebarDropdownWrapper label="Articles">
					{#each page.data.articles as { meta, path } (path)}
						<SidebarItem
							label={meta.title}
							href={`/blog/${path}`}
							{spanClass}
							activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							on:click={toggleSide}
						/>
					{/each}
				</SidebarDropdownWrapper>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<div class="mx-auto flex w-full px-4">
	<main class="mx-auto w-full lg:ml-72">
		{@render children()}
	</main>
</div>
