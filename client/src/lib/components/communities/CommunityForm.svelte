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

<div class="max-w-md mx-auto pt-4 bg-gray-800 p-6 rounded-lg shadow-xl">
    {#if authState.user}
        <form class="space-y-4" onsubmit={addCommunity}>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Community name"
                class="w-full p-3 rounded-lg border-2 border-blue-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
                name="description"
                id="description"
                placeholder="Community description"
                class="w-full p-3 rounded-lg border-2 border-blue-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 h-24"
            ></textarea>
            <button
                class="w-full btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
                type="submit">Add community</button
            >
        </form>
    {/if}
</div>
