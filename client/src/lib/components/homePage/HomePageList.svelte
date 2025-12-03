<script>
    import { useHomePageState } from "$lib/states/homePageState.svelte";

    let homePageState = useHomePageState();
</script>

<ul class="space-y-4 max-w-xl mx-auto mt-6">
    {#each homePageState.posts as post}
        <!-- Applied list item styles -->
        <li
            class="bg-blue-900 card border-2 border-surface-300 p-4 rounded-lg shadow-md text-white"
        >
            <a
                href={`/communities/${post.community_id}/posts/${post.id}`}
                class="text-xl font-semibold text-white hover:text-blue-300"
            >
                {post.title}
            </a>
            <p class="text-gray-300 text-sm mb-3 line-clamp-2">
                {post.content}
            </p>

            <div class="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                <p>
                    <span class="font-bold text-green-400">
                        upvotes: {post.upvotes}</span
                    >
                </p>
                <p>
                    <span class="font-bold text-red-400"
                        >downvotes: {post.downvotes}</span
                    >
                </p>
                <p class="text-blue-300 ml-auto">
                    <span class="font-bold">{post.comments || 0}</span> Comments
                </p>
            </div>
        </li>
    {/each}
</ul>
