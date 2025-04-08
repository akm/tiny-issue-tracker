 <script lang="ts">
    import {onMount} from 'svelte';
    import { browser } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';
    import { Modal } from 'flowbite';

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

    let modalState: 'new' | 'edit' = $state('new');
    $inspect({modalState});

    let modalId = $state(0);
    let modalName = $state('');
    
    let organizationModal: Modal | null = null;

    onMount(() => {
        // See https://flowbite.com/docs/components/modal/#example
        organizationModal = new Modal(
            document.getElementById('organizationModal'),
            {
                // placement: 'bottom-right',
                // backdrop: 'dynamic',
                // backdropClasses:
                //     'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
                closable: false,
                onHide: () => { console.log('modal is hidden'); },
                onShow: () => { console.log('modal is shown'); },
                onToggle: () => { console.log('modal has been toggled'); },
            },
            {id: 'organizationModal', override: true}
        );
    });

    const showNewModal = () => {
        if (!organizationModal) {
            console.error("showEditModal: organizationModal is not defined");
            return;
        }
        // event.preventDefault();
        console.log("showNewModal");
        modalState = 'new';
        modalId = 0;
        modalName = '';
        organizationModal.show();
    };

    const showEditModal = async (id) => {
        if (!organizationModal) {
            console.error("showEditModal: organizationModal is not defined");
            return;
        }
        // event.preventDefault();
        console.log("showEditModal", {id});
        modalState = 'edit';
        const resp = await fetch(`/api/organizations/${id}`);
        console.log("showEditModal", {id, resp});

        const organizaiton = await resp.json();
        modalId = id;
        modalName = organizaiton.name;

        organizationModal.show();
    };

    const clickModalClose = (event) => {
        event.preventDefault();
        console.log("clickModalClose", {event });
        if (!organizationModal) return;
        organizationModal.hide();
    };


    // console.log("items", {items});
</script>




<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <div>
            <button type="button" onclick={() => showNewModal()}
                class="mx-1 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                New
            </button>

            <button type="button" onclick={() => showNewModal()} 
                class="mx-1 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Delete
            </button>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users">
        </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {#each items as item}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div class="ps-3">
                            <div class="text-base font-semibold">{item.name}</div>
                        </div>  
                    </th>
                    <td class="px-6 py-4">
                        <!-- Modal toggle -->
                        <a href="#" type="button" onclick={() => showEditModal(item.id)} data-modal-target="organizationModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <!-- Edit modal -->
    <div id="organizationModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <form method="POST" action={ modalState === 'new' ? '?/create' : `?/update` }
                class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                <input type="hidden" name="id" bind:value={modalId} />

                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        { modalState === 'new' ? 'New' : 'Edit' }
                    </h3>
                   <button type="button" onclick={clickModalClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="modal-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="modal-name" 
                                placeholder="Bonnie"
                                required
                                bind:value={modalName}
                                class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button 
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        { modalState === 'new' ? 'Create' : 'Update' }
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
