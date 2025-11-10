<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();

    const remove = (id) => {
        communityState.removeCommunity(id);
        console.log(id);
    };
</script>

<ul>
    {#each communityState.communities as community}
        <li>
            <h2>
                <a href={`/communities/${community.id}`}>{community.name}</a>
            </h2>
            <p>{community.description}</p>
            <button onclick={() => remove(community.id)}>Remove</button>
        </li>
    {/each}
</ul>
