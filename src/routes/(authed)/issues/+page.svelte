 <script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';

    import {
        A,
        Button,
        checkboxClass,
        InputText,
        Label,
        SortIcon,
        ActionContainer,
        TABLE,
        THEAD,
        TR,
        SearchInput,
        FormModal,
        FormModalAlert
    } from '$lib/components/index.svelte';

    let items = $derived(page.data.items);
    let orderBy = $derived(page.data.orderBy);
    let orderDirection = $derived(page.data.orderDirection);

    const tableHeadLinkSearchParams = (col: 'id' | 'title' | 'createdAt' | 'updatedAt') => {
        const searchParams = new URLSearchParams();
        searchParams.set("orderBy", col);
        const nextDirection = (col === orderBy) ? (orderDirection === "asc" ? "desc" : "asc") : "asc";
        searchParams.set("orderDirection", nextDirection);
        console.log("tableHeadLinkSearchParams1", {col, orderBy, orderDirection, nextDirection});
        return "?" + searchParams.toString();
    }
    const tableHeadLinkClick = (col: 'id' | 'title' | 'createdAt' | 'updatedAt') => {
        const href = tableHeadLinkSearchParams(col);
        return (event: MouseEvent) => {
            console.log("tableHeadLinkClick", {event});
            invalidate(href);
        };
    };

    let checkedIDs: number[] = $state([]);

    let modalTitle = $state('');
    let formModalOrganizations: {id: number, name:string}[] = $state([]);
    
    let formModalVisible = $state(false);
    let deleteModalVisible = $state(false);

    const showNewModal = async () => {
        // event.preventDefault();
        console.log("showNewModal");

        const resp = await fetch(`/api/organizations`);
        formModalOrganizations = await resp.json();

        formModalVisible = true;
    };

    let deletingIssues: {id: number, title:string}[] = $state([]);

    const showDeleteModal = async () => {
        console.log("showDeleteModal", {checkedIDs});

        const resp = await fetch(`/api/issue_titles?ids=${checkedIDs.join(',')}` );
        deletingIssues = await resp.json();

        deleteModalVisible = true;
    }

    // console.log("items", {items});
</script>




<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <ActionContainer>
        <div>
            <Button onclick={() => showNewModal()}>New</Button>
            <Button onclick={() => showDeleteModal()}>Delete</Button>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <SearchInput id="table-search-users" placeholder="Search for users"/>
        </div>
    </ActionContainer>
    <TABLE>
        <THEAD>
            <TR>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class={checkboxClass}>
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
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
                        Title
                        <a href={tableHeadLinkSearchParams("title")} aria-label="Sort by title" onclick={tableHeadLinkClick("title")}>
                            <SortIcon/>
                        </a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Created At
                        <a href={tableHeadLinkSearchParams("createdAt")} aria-label="Sort by createdAt" onclick={tableHeadLinkClick("createdAt")}>
                            <SortIcon/>
                        </a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Updated At
                        <a href={tableHeadLinkSearchParams("updatedAt")} aria-label="Sort by updatedAt" onclick={tableHeadLinkClick("updatedAt")}>
                            <SortIcon/>
                        </a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </TR>
        </THEAD>
        <tbody>
            {#each items as item}
                <TR>
                    <td class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" value={item.id} bind:group={checkedIDs} class={checkboxClass} />
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td class="text-right pr-6 w-6">{item.id}</td>
                    <td class="pl-8">{item.title}</td>
                    <td class="pl-8">{item.createdAt}</td>
                    <td class="pl-8">{item.updatedAt}</td>
                    <td class="px-6 py-4">
                        <a href={`/issues/${item.id}`}>Show</a>
                    </td>
                </TR>
            {/each}
        </tbody>
    </TABLE>

    <!-- New modal -->
    <FormModal
        action='?/create'
        title="New"
        bind:visible={formModalVisible}
        submitText='Create'
    >

        <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
                <Label>
                    Organization
                    <select name="organization_id" required 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {#each formModalOrganizations as organization}
                            <option value={organization.id}>{organization.name}</option>
                        {/each}
                    </select>
                </Label>
            </div>
        </div>

        <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
                <Label>
                    Title
                    <InputText name="title" placeholder="issue..." required bind:value={modalTitle} />
                </Label>
            </div>
        </div>
    </FormModal>

    <FormModalAlert
        action="?/delete"
        title={"Are you sure you want to" + (deletingIssues.length > 1 ? 'these issues' : 'this issue')}
        bind:visible={deleteModalVisible}
        submitText="Yes, I'm sure"
        cancelText="No, cancel"
    >
        <input type="hidden" name="ids" value={deletingIssues.map(x => x.id.toString()).join(",")} />

        <ul>
            {#each deletingIssues as issue}
                <li class="text-gray-500 dark:text-gray-400">
                    {issue.title}
                </li>
            {/each}
        </ul>
    </FormModalAlert>    
    
</div>
