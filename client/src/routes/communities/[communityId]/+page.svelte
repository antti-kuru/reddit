<script>
    let { data } = $props();
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import PostForm from "$lib/components/posts/PostForm.svelte";
    import { initCommunity } from "$lib/states/communityState.svelte.js";
    import { initCommunityPosts } from "$lib/states/postState.svelte.js";

    console.log(data);
    const communityId = parseInt(data.communityId);
    console.log(communityId);

    $effect(() => {
        initCommunity(communityId);
        initCommunityPosts(communityId);
    });
</script>

<Community {communityId} />

<PostList {communityId} />

<PostForm {communityId} />
