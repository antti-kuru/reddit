<script>
    let { communityId, postId } = $props();

    import { useCommunityState } from "$lib/states/communityState.svelte";
    import { usePostState } from "$lib/states/postState.svelte";

    let communityState = useCommunityState();
    let postState = usePostState();

    let community = communityState.getOne(communityId);
    let post = postState.getPost(communityId, postId);
</script>

{#if community && post}
    <h1>{post.title}</h1>
    <p>{post.content}</p>
{:else}
    Loading...
{/if}
