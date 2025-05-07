<script lang="ts">
	const { href = '#', ...props } = $props();
</script>

<a {href} {...props} class="font-medium text-blue-600 hover:underline dark:text-blue-500">
	{@render props.children()}
</a>
