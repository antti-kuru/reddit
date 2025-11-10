<script>
    let { data } = $props();
    import Post from "$lib/components/posts/Post.svelte";
    const communityId = parseInt(data.communityId);
    const postId = parseInt(data.postId);
</script>

<Post {communityId} {postId} />
