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

<ul class="space-y-4">
    {#each communityState.communities as community}
        <li
            class=" bg-blue-900 card border-2 border-surface-300 rounded-lg shadow-md"
        >
            <div class="flex items-center justify-between p-4 gap-4">
                <div class="flex-grow min-w-0">
                    <h2>
                        <a
                            class="text-lg font-semibold text-white hover:text-blue-300 transition duration-200"
                            href={`/communities/${community.id}`}
                            >{community.name}</a
                        >
                    </h2>
                    <p class="text-sm text-surface-600 mt-1 text-white">
                        {community.description}
                    </p>
                </div>

                {#if authState.user && authState.user.id === community.created_by}
                    <button
                        class="btn bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-bl-lg rounded-tr-none text-sm float-right"
                        onclick={() => remove(community.id)}>Remove</button
                    >
                {/if}
            </div>
        </li>
    {/each}
</ul>
