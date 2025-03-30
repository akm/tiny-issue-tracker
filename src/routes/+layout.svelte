<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<header class="flex-none w-full mx-auto bg-white dark:bg-slate-950">
	
</header>

<div class="flex px-4 mx-auto w-full">
	<main class="lg:ml-72 w-full mx-auto">
		{@render children()}
	</main>
</div>
