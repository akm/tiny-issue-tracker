<script lang="ts">
	import SearchIcon from '../atoms/SearchIcon.svelte';
	const props = $props();
</script>

<div class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
	<SearchIcon />
</div>
<input
	type="text"
	{...props}
	class="block w-80 rounded-lg border border-gray-300 bg-gray-50 ps-10 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
/>
