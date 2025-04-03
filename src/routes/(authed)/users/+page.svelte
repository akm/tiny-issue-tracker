 <script >
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    let items = [
        { id: 1, name: 'Toyota', email: 'ABC'},
        { id: 2, name: 'Ford', email: 'CDE' },
        { id: 3, name: 'Volvo', email: 'FGH' },
        { id: 4, name: 'Saab', email: 'IJK' }
    ];
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
