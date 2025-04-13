<script lang="ts">
    import {onMount} from 'svelte';
	import { Modal } from "flowbite";

    let {
        action,
        title,
        visible = $bindable(false),
        submitText,
        cancelText = "Cancel",
        ...props
    } = $props();

    let modal: Modal | null = null;

    onMount(() => {
        // See https://flowbite.com/docs/components/modal/#example
        modal = new Modal(
            document.getElementById('formModalAlert'),
            {
                // placement: 'bottom-right',
                // backdrop: 'dynamic',
                // backdropClasses:
                //     'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
                closable: false,
                onHide: () => { console.log('formModalAlert is hidden'); visible = false; },
                onShow: () => { console.log('formModalAlert is shown'); visible = true; },
                // onToggle: () => { console.log('formModalAlert has been toggled'); },
            },
            {id: 'formModalAlert', override: true}
        );
    });

    $effect(() => {
        if (visible) {
            modal?.show();
        } else {
            modal?.hide();
        }
    });</script>

<div id="formModalAlert" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <form method="POST" {action} class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button type="button" 
                    onclick={() =>  modal?.hide()}
                    class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {title}
                    </h3>
                    <div>
                        {@render props.children()}
                    </div>
                    <button type="submit"
                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                        {submitText}
                    </button>
                    <button type="button" 
                        onclick={() => modal?.hide()}
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        {cancelText}
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
