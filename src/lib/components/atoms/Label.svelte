<script lang="ts">
	const { children } = $props();
</script>

<label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
	{@render children()}
</label>
