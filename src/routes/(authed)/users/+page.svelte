<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';

	import SortIcon from '$lib/components/atoms/SortIcon.svelte';

	let items = $derived(page.data.items);
	let orderBy = $derived(page.data.orderBy);
	let orderDirection = $derived(page.data.orderDirection);

	const tableHeadLinkSearchParams = (col: 'id' | 'name' | 'email') => {
		const searchParams = new URLSearchParams();
		searchParams.set('orderBy', col);
		const nextDirection = col === orderBy ? (orderDirection === 'asc' ? 'desc' : 'asc') : 'asc';
		searchParams.set('orderDirection', nextDirection);
		console.log('tableHeadLinkSearchParams1', { col, orderBy, orderDirection, nextDirection });
		return '?' + searchParams.toString();
	};
	const tableHeadLinkClick = (col: 'id' | 'name' | 'email') => {
		const href = tableHeadLinkSearchParams(col);
		return (event: MouseEvent) => {
			console.log('tableHeadLinkClick', { event });
			invalidate(href);
		};
	};

	// console.log("items", {items});
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
		<thead class="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3">
					<div class="flex items-center">
						ID
						<a
							href={tableHeadLinkSearchParams('id')}
							aria-label="Sort by ID"
							onclick={tableHeadLinkClick('id')}
						>
							<SortIcon />
						</a>
					</div>
				</th>
				<th scope="col" class="px-6 py-3">
					<div class="flex items-center">
						Name
						<a
							href={tableHeadLinkSearchParams('name')}
							aria-label="Sort by name"
							onclick={tableHeadLinkClick('name')}
						>
							<SortIcon />
						</a>
					</div>
				</th>
				<th scope="col" class="px-6 py-3">
					<div class="flex items-center">
						Email
						<a
							href={tableHeadLinkSearchParams('email')}
							aria-label="Sort by email"
							onclick={tableHeadLinkClick('email')}
						>
							<SortIcon />
						</a>
					</div>
				</th>
				<th scope="col" class="px-6 py-3">
					<span class="sr-only">Edit</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item (item.id)}
				<tr class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
					<th
						scope="row"
						class="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
					>
						{item.id}
					</th>
					<td class="px-6 py-4">
						{item.name}
					</td>
					<td class="px-6 py-4">
						{item.email}
					</td>
					<td class="px-6 py-4 text-right">
						<!-- svelte-ignore a11y_invalid_attribute -->
						<a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</a
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
