<script lang="ts">
    import { setContext } from 'svelte';
    const props = $props();

    // Set context for child components
    setContext('tr-parent', 'thead');
</script>

<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    {@render props.children()}
</thead>
