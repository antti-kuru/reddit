<script>
    let { communityId } = $props();
    import { useCommunityState } from "$lib/states/communityState.svelte";

    let communityState = useCommunityState();

    let community = $derived(
        communityState.communities.find((c) => c.id === communityId),
    );
    console.log(communityId);
</script>

{#if community}
    <h2>{community.name}</h2>
    <p>{community.description}</p>
{:else}
    <h1>Loading...</h1>
{/if}
