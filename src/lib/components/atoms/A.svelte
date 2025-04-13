<script lang="ts">
    const {
        href = '#',
        ...props
     } = $props();
</script>

<a {href} {...props} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
    {@render props.children()}
</a>
