<script>
    import { usePostState } from "$lib/states/postState.svelte";
    let { communityId } = $props();

    let postState = usePostState();

    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();

    const addPost = async (e) => {
        e.preventDefault();
        const post = Object.fromEntries(new FormData(e.target));
        await postState.addPost(communityId, post);
        e.target.reset();
    };
</script>

{#if authState.user}
    <div class="max-w-xl mx-auto mt-6 p-4 bg-gray-800 rounded-lg shadow-xl">
        <h3 class="text-xl font-semibold mb-3 text-white">Create a New Post</h3>
        <form onsubmit={addPost} class="space-y-3">
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Post title"
                class="w-full p-3 rounded-lg border-2 border-blue-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
                name="content"
                id="content"
                placeholder="Post content"
                class="w-full p-3 rounded-lg border-2 border-blue-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
            ></textarea>
            <button
                type="submit"
                class="w-full btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
                Add post
            </button>
        </form>
    </div>
{/if}
