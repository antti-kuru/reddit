<script>
    let { data } = $props();
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import AddPost from "$lib/components/posts/AddPost.svelte";
    console.log(data);
    const communityId = parseInt(data.communityId);
    console.log(communityId);
</script>

<Community {communityId} />

<PostList {communityId} />

<AddPost {communityId} />
