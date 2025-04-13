<script lang="ts">
    let {
        value = $bindable(''),
        placeholder,
        required,
        name,
    } = $props();
</script>

<input type="text" {name} {placeholder} {required}
    bind:value 
    class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
/>
