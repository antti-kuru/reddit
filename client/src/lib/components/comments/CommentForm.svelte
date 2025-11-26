<script>
    import { useCommentState } from "$lib/states/commentState.svelte.js";

    let { communityId, postId } = $props();
    let commentState = useCommentState();

    const addComment = async (e) => {
        e.preventDefault();
        const comment = Object.fromEntries(new FormData(e.target));
        await commentState.addComment(communityId, postId, comment);
        e.target.reset();
    };
</script>

<form onsubmit={addComment}>
    <textarea name="content" id="content" placeholder="Comment content"
    ></textarea>
    <br />
    <button type="submit">Add comment</button>
</form>
