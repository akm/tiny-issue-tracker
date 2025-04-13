<script lang="ts">
    const props = $props();
</script>

<div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
    {@render props.children()}
</div>
