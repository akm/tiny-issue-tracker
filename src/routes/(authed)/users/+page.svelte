 <script >
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

    let items = page.data.items;
    const orderBy = page.data.orderBy;
    const orderDirection = page.data.orderDirection;

    const onClickTableHeadCell = (col) => () => {
        if (col === orderBy) {
            if (orderDirection === "asc") {
                goto("?sort="+col+"&order=desc");
            } else {
                goto("?sort="+col+"&order=asc");
            }
        } else {
            goto("?sort="+col+"&order=asc");
        }
    };
</script>
