<script lang="ts">
    import {onMount} from 'svelte';
	import { Modal } from "flowbite";

    let {
        action,
        title,
        visible = $bindable(false),
        submitText,
        ...props
    } = $props();

    let modal: Modal | null = null;

    onMount(() => {
        // See https://flowbite.com/docs/components/modal/#example
        modal = new Modal(
            document.getElementById('formModal'),
            {
                // placement: 'bottom-right',
                // backdrop: 'dynamic',
                // backdropClasses:
                //     'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
                closable: false,
                onHide: () => { console.log('modal is hidden'); visible = false; },
                onShow: () => { console.log('modal is shown'); visible = true; },
                // onToggle: () => { console.log('modal has been toggled'); },
            },
            {id: 'formModal', override: true}
        );
    });

    $effect(() => {
        if (visible) {
            modal?.show();
        } else {
            modal?.hide();
        }
    });
</script>

<div id="formModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <form method="POST" {action}
            class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    { title }
                </h3>
               <button type="button" onclick={() =>  modal?.hide()} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                {@render props.children()}
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                <button 
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    { submitText }
                </button>
            </div>
        </form>
    </div>
</div>