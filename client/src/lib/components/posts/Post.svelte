<script>
    let { communityId, postId } = $props();

    import { useCommunityState } from "$lib/states/communityState.svelte";
    import { usePostState } from "$lib/states/postState.svelte";

    let communityState = useCommunityState();
    let postState = usePostState();
    let community = $derived(
        communityState.communities.find((c) => c.id === communityId),
    );
    let post = $derived(
        postState.posts[communityId]?.find((p) => p.id === postId),
    );
</script>

{#if community && post}
    <h1>{post.title}</h1>
    <p>{post.content}</p>
{:else}
    Loading...
{/if}
