 <script >
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

    let items = page.data.items;

    let idSortDirection = $state(null);
    let nameSortDirection = $state(null);
    let emailSortDirection = $state(null);

    // sort の表示のみ使うのでダミーのソート関数を利用
    const sort = () => 0;
    const headCellClick = (e) => {
        if (idSortDirection) {
            goto("?sort=id&order="+idSortDirection);
        } else if (nameSortDirection) {
            goto("?sort=name&order="+nameSortDirection);
        } else if (emailSortDirection) {
            goto("?sort=email&order="+emailSortDirection);
        }
    };
</script>

<Table hoverable={true} {items}>
    <TableHead>
        <TableHeadCell {sort} on:click={headCellClick} bind:direction={idSortDirection}>ID</TableHeadCell>
        <TableHeadCell {sort} on:click={headCellClick} bind:direction={nameSortDirection} defaultSort>Name</TableHeadCell>
        <TableHeadCell {sort} on:click={headCellClick} bind:direction={emailSortDirection}>Email</TableHeadCell>
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
