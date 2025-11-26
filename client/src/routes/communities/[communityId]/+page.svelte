<script>
    let { data } = $props();
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import AddPost from "$lib/components/posts/AddPost.svelte";
    import { initCommunity } from "$lib/states/communityState.svelte.js";

    console.log(data);
    const communityId = parseInt(data.communityId);
    console.log(communityId);

    $effect(() => {
        initCommunity(communityId);
    });
</script>

<Community {communityId} />

<PostList {communityId} />

<AddPost {communityId} />
