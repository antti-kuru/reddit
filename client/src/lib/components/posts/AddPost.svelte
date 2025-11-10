<script>
    import { usePostState } from "$lib/states/postState.svelte";

    let postState = usePostState();
    let inputTitle = $state("");
    let inputContent = $state("");

    let { communityId } = $props();
</script>

<input type="text" bind:value={inputTitle} placeholder="Post title" />
<input type="text" bind:value={inputContent} placeholder="Post content" />
<button
    onclick={() => {
        postState.addPost(communityId, inputTitle, inputContent);
        inputTitle = "";
        inputContent = "";
    }}>Add post</button
>
