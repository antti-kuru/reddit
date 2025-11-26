<script>
    let { communityId, postId } = $props();

    import {
        useCommentState,
        initComments,
    } from "$lib/states/commentState.svelte.js";

    let commentState = useCommentState();

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
            <button onclick={() => removeComment(comment.id)}>Remove</button>
        </li>
    {/each}
</ul>
