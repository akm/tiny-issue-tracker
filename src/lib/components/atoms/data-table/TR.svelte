<script lang="ts">
	import { getContext } from 'svelte';

	// Get context to determine parent
	const parent = getContext<'thead' | 'tbody'>('tr-parent') || 'tbody';
	const klass =
		parent === 'thead'
			? ''
			: 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600';
	const props = $props();
</script>

<tr class={klass}>
	{@render props.children()}
</tr>
