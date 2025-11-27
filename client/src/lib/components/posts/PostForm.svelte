<script>
    import { usePostState } from "$lib/states/postState.svelte";
    let { communityId } = $props();

    let postState = usePostState();

    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();

    const addPost = async (e) => {
        e.preventDefault();
        const post = Object.fromEntries(new FormData(e.target));
        await postState.addPost(communityId, post);
        e.target.reset();
    };
</script>

{#if authState.user}
    <form onsubmit={addPost}>
        <input type="text" name="title" id="title" placeholder="Post title" />
        <br />
        <input
            type="textarea"
            name="content"
            id="content"
            placeholder="Post content"
        />
        <br />
        <button type="submit">Add post</button>
    </form>
{/if}
