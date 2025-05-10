<script lang="ts">
	let { data } = $props();

	if (!data.issue) {
		throw new Error('Issue not found');
	}

	const issue = $state(data.issue);
	const comments = $state(data.comments || []);
	const users = [
		{ id: 1, name: 'User1' },
		{ id: 2, name: 'User2' }
	];

	const userIdToName = users.reduce(
		(acc, user) => {
			acc[user.id] = user.name;
			return acc;
		},
		{} as Record<number, string>
	);

	let titleEditing = $state(false);
	let editingTitle = $state(issue.title);

	let editingCommentIds = $state(new Array<number>());
</script>

<div class="p-4">
	<section class="h-16">
		{#if titleEditing}
			<span class="text-2xl font-bold text-gray-900 dark:text-white">
				[{issue.status}] #{issue.id}
			</span>
			<form method="POST" action="?/update_title" style="display: inline-block;">
				<input type="hidden" name="id" value={issue.id} />
				<input
					type="text"
					name="title"
					class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					value={editingTitle}
				/>
				<button
					type="submit"
					class="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Update
				</button>
				<button
					type="button"
					onclick={() => (titleEditing = false)}
					class="me-2 mb-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
				>
					Cancel
				</button>
			</form>
		{:else}
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
				[{issue.status}] #{issue.id}
				{issue.title}
				<button onclick={() => (titleEditing = true)} class="text-sm text-blue-500 hover:underline">
					Edit
				</button>
			</h1>
		{/if}
	</section>

	{#each comments as comment (comment.id)}
		<section class="items center mb-4 ml-8 flex">
			{#if editingCommentIds.includes(comment.id)}
				<form method="POST" action="?/update_comment" class="w-full">
					<input type="hidden" name="id" value={comment.id} />
					<textarea
						rows="4"
						name="content"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						placeholder="Edit comment...">{comment.content}</textarea
					>
					<button
						type="submit"
						class="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Update
					</button>
					<button
						type="button"
						onclick={() =>
							(editingCommentIds = editingCommentIds.filter((id) => id !== comment.id))}
						class="me-2 mb-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
					>
						Cancel
					</button>
				</form>
			{:else}
				<div class="ml-3">
					<p class="text-sm font-medium text-gray-900 dark:text-white">
						{userIdToName[comment.userId]}
					</p>
					<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
						{new Date(comment.createdAt).toLocaleString()}
					</p>
					<p class="mt-1 text-sm text-gray-700 dark:text-gray-300">
						{comment.content}
					</p>
				</div>
				<div class="ml-auto">
					<button
						class="text-sm text-blue-500 hover:underline"
						onclick={() => editingCommentIds.push(comment.id)}
					>
						Edit
					</button>

					<form method="POST" action="?/delete_comment" class="w-full">
						<input type="hidden" name="id" value={comment.id} />
						<button type="submit" class="text-sm text-blue-500 hover:underline"> Delete </button>
					</form>
				</div>
			{/if}
		</section>
	{/each}

	<!-- Add comment pane -->
	<section class="ml-8">
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">New comment</h3>
		<div class="mb-4 flex w-full">
			<form method="POST" action="?/add_comment" class="w-full">
				<input type="hidden" name="issue_id" value={issue.id} />

				<textarea
					name="content"
					required
					rows="4"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Add a comment..."
				></textarea>

				<button
					type="submit"
					class="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Add
				</button>
			</form>
		</div>
	</section>

	<!-- Open / Close button which depends on issue.status  in pane -->
	<section class="flex items-center">
		{#if issue.status === 'open'}
			<form method="POST" action="?/close">
				<input type="hidden" name="id" value={issue.id} />
				<button
					type="submit"
					class="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Close
				</button>
			</form>
		{:else}
			<form method="POST" action="?/open">
				<input type="hidden" name="id" value={issue.id} />
				<button
					type="submit"
					class="me-2 mb-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
				>
					Open
				</button>
			</form>
		{/if}
	</section>
</div>
