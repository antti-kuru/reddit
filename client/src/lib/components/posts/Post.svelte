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
    <div
        class="bg-gray-800 p-6 rounded-lg shadow-xl text-white max-w-3xl mx-auto mt-6"
    >
        <h1 class="text-4xl font-extrabold text-white mb-4">{post.title}</h1>
        <p class="text-lg text-gray-300 whitespace-pre-wrap">{post.content}</p>
        <p class="mt-4 text-sm text-blue-400">Posted in: {community.name}</p>
    </div>
{:else}
    <div class="text-xl text-gray-400 mt-10 text-center">Loading...</div>
{/if}
