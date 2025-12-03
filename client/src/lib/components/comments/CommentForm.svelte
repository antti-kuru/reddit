<script>
    import { useCommentState } from "$lib/states/commentState.svelte.js";

    let { communityId, postId } = $props();
    let commentState = useCommentState();

    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();

    const addComment = async (e) => {
        e.preventDefault();
        const comment = Object.fromEntries(new FormData(e.target));
        await commentState.addComment(communityId, postId, comment);
        e.target.reset();
    };
</script>

{#if authState.user}
    <div class="max-w-xl mx-auto mt-6 p-4 bg-gray-800 rounded-lg shadow-xl">
        <h3 class="text-xl font-semibold mb-3 text-white">Add a Comment</h3>
        <form onsubmit={addComment} class="space-y-3">
            <textarea
                name="content"
                id="content"
                placeholder="Type your comment here..."
                class="w-full p-3 rounded-lg border-2 border-blue-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 h-20 resize-none"
            ></textarea>
            <button
                type="submit"
                class="w-full btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
                Add comment
            </button>
        </form>
    </div>
{/if}
