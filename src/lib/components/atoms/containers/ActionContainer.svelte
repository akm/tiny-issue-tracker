<script lang="ts">
	const props = $props();
</script>

<div
	class="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900"
>
	{@render props.children()}
</div>
