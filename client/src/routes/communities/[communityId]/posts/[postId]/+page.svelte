<script>
    let { data } = $props();
    import Post from "$lib/components/posts/Post.svelte";
    import { initPost } from "$lib/states/postState.svelte.js";
    import { initCommunity } from "$lib/states/communityState.svelte.js";
    import CommentForm from "$lib/components/comments/CommentForm.svelte";
    import CommentList from "$lib/components/comments/CommentList.svelte";
    import { initComments } from "$lib/states/commentState.svelte.js";

    console.log(data.communityId, data.postId);
    const communityId = parseInt(data.communityId);
    const postId = parseInt(data.postId);

    $effect(() => {
        initCommunity(communityId);
        initPost(communityId, postId);
        initComments(communityId, postId);
    });
</script>

<Post {communityId} {postId} />

<CommentForm {communityId} {postId} />
<CommentList {communityId} {postId} />
