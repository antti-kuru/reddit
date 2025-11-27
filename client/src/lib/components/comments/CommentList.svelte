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

<ul>
    {#each commentState.comments[communityId]?.[postId] ?? [] as comment}
        <li>
            {comment.content}
            {#if authState.user && authState.user.id === comment.created_by}
                <button onclick={() => removeComment(comment.id)}>Remove</button
                >
            {/if}
        </li>
    {/each}
</ul>
