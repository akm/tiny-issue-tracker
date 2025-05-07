<script lang="ts">
	import { onMount } from 'svelte';
	import { Modal } from 'flowbite';

	let { action, title, visible = $bindable(false), submitText, ...props } = $props();

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
				onHide: () => {
					console.log('modal is hidden');
					visible = false;
				},
				onShow: () => {
					console.log('modal is shown');
					visible = true;
				}
				// onToggle: () => { console.log('modal has been toggled'); },
			},
			{ id: 'formModal', override: true }
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

<div
	id="formModal"
	tabindex="-1"
	aria-hidden="true"
	class="fixed top-0 right-0 left-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto p-4 md:inset-0"
>
	<div class="relative max-h-full w-full max-w-2xl">
		<!-- Modal content -->
		<form method="POST" {action} class="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
			<!-- Modal header -->
			<div
				class="flex items-start justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-600"
			>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>
				<button
					type="button"
					onclick={() => modal?.hide()}
					class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
				>
					<svg
						class="h-3 w-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
						/>
					</svg>
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<!-- Modal body -->
			<div class="space-y-6 p-6">
				{@render props.children()}
			</div>
			<!-- Modal footer -->
			<div
				class="flex items-center space-x-3 rounded-b border-t border-gray-200 p-6 rtl:space-x-reverse dark:border-gray-600"
			>
				<button
					type="submit"
					class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					{submitText}
				</button>
			</div>
		</form>
	</div>
</div>
