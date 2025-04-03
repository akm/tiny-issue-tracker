 <script >
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { page } from '$app/state';

    let items = page.data.items;
</script>

<Table hoverable={true} {items}>
    <TableHead>
        <TableHeadCell sort={(a, b) => a.id - b.id}>ID</TableHeadCell>
        <TableHeadCell sort={(a, b) => a.name.localeCompare(b.maker)} defaultSort>Name</TableHeadCell>
        <TableHeadCell sort={(a, b) => a.email.localeCompare(b.type)}>Email</TableHeadCell>
        <TableHeadCell>
        <span class="sr-only">Buy</span>
        </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        <TableBodyRow slot="row" let:item>
        <TableBodyCell>{item.id}</TableBodyCell>
        <TableBodyCell>{item.name}</TableBodyCell>
        <TableBodyCell>{item.email}</TableBodyCell>
        <TableBodyCell>
            <a href="/tables" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Buy</a>
        </TableBodyCell>
        </TableBodyRow>
    </TableBody>
</Table>
