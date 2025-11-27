<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";

    let postState = usePostState();

    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();
</script>

<ul>
    {#each postState.posts[communityId] ?? [] as post}
        <li>
            <a href={`/communities/${communityId}/posts/${post.id}`}
                >{post.title}</a
            >
            <p>{post.content}</p>
            {#if authState.user && authState.user.id === post.created_by}
                <button
                    onclick={() => postState.removePost(communityId, post.id)}
                    >Remove</button
                >
            {/if}
        </li>
    {/each}
</ul>
