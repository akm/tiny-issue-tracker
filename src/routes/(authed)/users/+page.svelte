 <script>
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';

    import SortIcon from '$lib/components/atom/SortIcon.svelte';

    let items = $derived(page.data.items);
    let orderBy = $derived(page.data.orderBy);
    let orderDirection = $derived(page.data.orderDirection);

    const tableHeadLinkSearchParams = (col) => {
        const searchParams = new URLSearchParams();
        searchParams.set("orderBy", col);
        const nextDirection = (col === orderBy) ? (orderDirection === "asc" ? "desc" : "asc") : "asc";
        searchParams.set("orderDirection", nextDirection);
        console.log("tableHeadLinkSearchParams1", {col, orderBy, orderDirection, nextDirection});
        return "?" + searchParams.toString();
    }
    const tableHeadLinkClick = (col) => {
        const href = tableHeadLinkSearchParams(col);
        return (event) => {
            console.log("tableHeadLinkClick", {event});
            invalidate(href);
        };
    };

    // console.log("items", {items});
</script>



<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        ID
                        <a href={tableHeadLinkSearchParams("id")} aria-label="Sort by ID" onclick={tableHeadLinkClick("id")}>
                            <SortIcon/>
                        </a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Name
                        <a href={tableHeadLinkSearchParams("name")} aria-label="Sort by name" onclick={tableHeadLinkClick("name")}>
                            <SortIcon/>
                        </a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Email
                        <a href={tableHeadLinkSearchParams("email")} aria-label="Sort by email" onclick={tableHeadLinkClick("email")} >
                            <SortIcon/>
                        </a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {#each items as item}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.id}
                    </th>
                    <td class="px-6 py-4">
                        {item.name}
                    </td>
                    <td class="px-6 py-4">
                        {item.email}
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
