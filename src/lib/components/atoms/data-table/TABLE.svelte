<script lang="ts">
	const props = $props();
</script>

<table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
	{@render props.children()}
</table>
