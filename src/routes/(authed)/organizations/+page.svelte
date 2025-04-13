 <script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';

    import Button from '$lib/components/atoms/Button.svelte';
    import ActionContainer from '$lib/components/atoms/containers/ActionContainer.svelte';
    import InputText from '$lib/components/atoms/InputText.svelte';
    import SearchInput from '$lib/components/molecules/SearchInput.svelte';
    import SortIcon from '$lib/components/atoms/SortIcon.svelte';
    import FormModal from '$lib/components/organisms/FormModal.svelte';
    import FormModalAlert from '$lib/components/organisms/FormModalAlert.svelte';

    import { TABLE, THEAD, TR } from '$lib/components/atoms/data-table/index.svelte';
    
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

    let checkedIDs: number[] = $state([]);

    let modalState: 'new' | 'edit' = $state('new');
    $inspect({modalState});

    let modalId = $state(0);
    let modalName = $state('');
    
    let organizationModalVisible = $state(false);
    let deleteModalVisible = $state(false);

    const showNewModal = () => {
        // event.preventDefault();
        console.log("showNewModal");
        modalState = 'new';
        modalId = 0;
        modalName = '';
        organizationModalVisible = true;
    };

    const showEditModal = async (id) => {
        // event.preventDefault();
        console.log("showEditModal", {id});
        modalState = 'edit';
        const resp = await fetch(`/api/organizations/${id}`);
        console.log("showEditModal", {id, resp});

        const organizaiton = await resp.json();
        modalId = id;
        modalName = organizaiton.name;

        // organizationModal.show();
        organizationModalVisible = true;
    };

    let deletingOrganizations: {id: number, name:string}[] = $state([]);

    const showDeleteModal = async () => {
        console.log("showDeleteModal", {checkedIDs});

        const resp = await fetch(`/api/organizations?ids=${checkedIDs.join(',')}` );
        deletingOrganizations = await resp.json();

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
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
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
                        Name
                        <a href={tableHeadLinkSearchParams("name")} aria-label="Sort by name" onclick={tableHeadLinkClick("name")}>
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
                            <input id="checkbox-table-search-1" type="checkbox" 
                                value={item.id}
                                bind:group={checkedIDs}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td class="text-right pr-6 w-6">{item.id}</td>
                    <td class="pl-8">{item.name}</td>
                    <td class="px-6 py-4">
                        <!-- Modal toggle -->
                        <a href="#" type="button" onclick={() => showEditModal(item.id)} data-modal-target="organizationModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </TR>
            {/each}
        </tbody>
    </TABLE>

    <!-- Edit modal -->
    <FormModal
        action={modalState === 'new' ? '?/create' : `?/update`}
        title={modalState === 'new' ? 'New' : 'Edit'}
        bind:visible={organizationModalVisible}
        submitText={modalState === 'new' ? 'Create' : 'Update'}
    >
        <input type="hidden" name="id" bind:value={modalId} />
        <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                    <InputText name="name" placeholder="Bonnie" required bind:value={modalName} />
                </label>
            </div>
        </div>
    </FormModal>

    <FormModalAlert
        action="?/delete"
        title={"Are you sure you want to" + (deletingOrganizations.length > 1 ? 'these organizations' : 'this organization')}
        bind:visible={deleteModalVisible}
        submitText="Yes, I'm sure"
        cancelText="No, cancel"
    >
        <input type="hidden" name="ids" value={deletingOrganizations.map(x => x.id.toString()).join(",")} />

        <ul>
            {#each deletingOrganizations as organization}
                <li class="text-gray-500 dark:text-gray-400">
                    {organization.name}
                </li>
            {/each}
        </ul>
    </FormModalAlert>    
    
</div>
