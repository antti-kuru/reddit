<script>
    let { communityId, postId } = $props();

    import {
        useCommentState,
        initComments,
    } from "$lib/states/commentState.svelte.js";

    let commentState = useCommentState();

    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();

    $effect(() => {
        initComments(communityId, postId);
    });

    // Remove a comment
    const removeComment = async (commentId) => {
        await commentState.removeComment(communityId, postId, commentId);
    };
</script>

<ul class="space-y-3 mt-6">
    {#each commentState.comments[communityId]?.[postId] ?? [] as comment}
        <li
            class="bg-blue-900 card border-2 border-surface-300 p-4 rounded-lg shadow-md text-white"
        >
            <div class="mb-2">
                <p class="text-base text-gray-200">{comment.content}</p>
            </div>

            <div class="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                <p>
                    <span class="font-bold text-green-400"
                        >Upvotes: {comment.upvotes}</span
                    >
                </p>
                <p>
                    <span class="font-bold text-red-400"
                        >Downvotes: {comment.downvotes}</span
                    >
                </p>
            </div>

            <div class="flex space-x-2 mt-3">
                {#if authState.user}
                    <button
                        class="btn bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-2 rounded-full transition duration-200"
                        onclick={() =>
                            commentState.upvote(
                                communityId,
                                postId,
                                comment.id,
                            )}>Upvote</button
                    >
                    <button
                        class="btn bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-2 rounded-full transition duration-200"
                        onclick={() =>
                            commentState.downvote(
                                communityId,
                                postId,
                                comment.id,
                            )}>Downvote</button
                    >
                {/if}

                {#if authState.user && authState.user.id === comment.created_by}
                    <button
                        class="btn bg-gray-500 hover:bg-gray-600 text-white text-sm py-1 px-2 rounded-lg transition duration-200 ml-auto"
                        onclick={() => removeComment(comment.id)}>Remove</button
                    >
                {/if}
            </div>
        </li>
    {/each}
</ul>
