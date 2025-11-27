<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();

    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();

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

            {#if authState.user && authState.user.id === community.created_by}
                <button onclick={() => remove(community.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>
