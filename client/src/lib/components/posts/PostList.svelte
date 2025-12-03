<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";

    let postState = usePostState();

    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();
</script>

<ul class="space-y-4">
    {#each postState.posts[communityId] ?? [] as post}
        <li
            class="bg-blue-900 card border-2 border-surface-300 p-4 rounded-lg shadow-md text-white"
        >
            <a
                href={`/communities/${communityId}/posts/${post.id}`}
                class="text-xl font-semibold text-white hover:text-blue-300 transition duration-200 block mb-1"
            >
                {post.title}
            </a>
            <p class="text-gray-300 text-sm mb-3">{post.content}</p>

            <div class="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                <p>
                    <span class="font-bold text-green-400"
                        >Upvotes: {post.upvotes}</span
                    >
                </p>
                <p>
                    <span class="font-bold text-red-400"
                        >Downvotes: {post.downvotes}</span
                    >
                </p>
            </div>

            <div class="flex space-x-2 mt-3">
                {#if authState.user}
                    <button
                        onclick={() => postState.upvote(communityId, post.id)}
                        class="btn bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-2 rounded-full transition duration-200"
                    >
                        Upvote
                    </button>
                    <button
                        onclick={() => postState.downvote(communityId, post.id)}
                        class="btn bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-2 rounded-full transition duration-200"
                    >
                        Downvote
                    </button>
                {/if}

                {#if authState.user && authState.user.id === post.created_by}
                    <button
                        onclick={() =>
                            postState.removePost(communityId, post.id)}
                        class="btn bg-gray-500 hover:bg-gray-600 text-white text-sm py-1 px-2 rounded-lg transition duration-200 ml-auto"
                    >
                        Remove
                    </button>
                {/if}
            </div>
        </li>
    {/each}
</ul>
