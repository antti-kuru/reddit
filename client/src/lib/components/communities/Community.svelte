<script>
    let { communityId } = $props();
    import { useCommunityState } from "$lib/states/communityState.svelte";

    let communityState = useCommunityState();

    let community = $derived(
        communityState.communities.find((c) => c.id === communityId),
    );
    console.log(community);
</script>

{#if community}
    <div
        class="bg-gray-800 p-6 rounded-lg shadow-xl text-white max-w-2xl mx-auto mt-6"
    >
        <h2 class="text-3xl font-bold text-blue-300 mb-2">{community.name}</h2>
        <p class="text-lg text-gray-300">{community.description}</p>
    </div>
{:else}
    <h1 class="text-xl text-gray-400 mt-10 text-center">Loading...</h1>
{/if}
