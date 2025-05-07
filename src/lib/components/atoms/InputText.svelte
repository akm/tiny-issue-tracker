<script lang="ts">
	let { value = $bindable(''), placeholder, required, name } = $props();
</script>

<input
	type="text"
	{name}
	{placeholder}
	{required}
	bind:value
	class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-xs focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
/>
