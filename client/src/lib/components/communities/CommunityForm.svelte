<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();

    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();

    const addCommunity = (e) => {
        e.preventDefault();
        const community = Object.fromEntries(new FormData(e.target));
        communityState.addCommunity(community);
        e.target.reset();
    };
</script>

{#if authState.user}
    <form onsubmit={addCommunity}>
        <input type="text" name="name" id="name" placeholder="Community name" />
        <br />
        <input
            type="textarea"
            name="description"
            id="description"
            placeholder="Community description"
        />
        <button type="submit">Add community</button>
    </form>
{/if}
