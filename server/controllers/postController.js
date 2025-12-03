import * as postRepository from "../repositories/postRepository.js"

const create = async (c) => {
    const user = c.get("user");
    const communityId = Number(c.req.param('communityId'))
    if (!Number.isInteger(communityId)) {
        return c.json({ error: "Invalid community id" }, 400)
    }

    const post = await c.req.json()
    if (!post.content) {
        return c.json({ error: "Missing required fields" }, 400)
    }

    const newPost = await postRepository.create(communityId, post, user.id)
    return c.json(newPost, 201)
}

const readAll = async (c) => {
    const communityId = Number(c.req.param('communityId'))
    if (!Number.isInteger(communityId)) {
        return c.json({ error: "Invalid community id" }, 400)
    }

    const posts = await postRepository.findAll(communityId)
    return c.json(posts)
}

const readOne = async (c) => {
    const communityId = Number(c.req.param('communityId'))
    const postId = Number(c.req.param('postId'))

    if (!Number.isInteger(communityId)) {
        return c.json({ error: "Invalid community id" }, 400)
    }
    if (!Number.isInteger(postId)) {
        return c.json({ error: "Invalid post id" }, 400)
    }

    const post = await postRepository.findById(communityId, postId)
    if (!post) {
        return c.json({ error: "Post not found" }, 404)
    }

    return c.json(post)
}

const deleteOne = async (c) => {
    const user = c.get("user");
    const communityId = Number(c.req.param('communityId'))
    const postId = Number(c.req.param('postId'))

    if (!Number.isInteger(communityId)) {
        return c.json({ error: "Invalid community id" }, 400)
    }
    if (!Number.isInteger(postId)) {
        return c.json({ error: "Invalid post id" }, 400)
    }

    const deletedPost = await postRepository.deleteById(communityId, postId, user.id)
    if (!deletedPost) {
        return c.json({ error: "Post not found" }, 404)
    }

    return c.json(deletedPost)
}

const votePost = (voteType) => async (c) => {
    const user = c.get("user");
    const communityId = Number(c.req.param('communityId'))
    const postId = Number(c.req.param('postId'))


    const existingPost = await postRepository.findById(communityId, postId);
    if (!existingPost) {
        return c.json({ error: "Post not found" }, 404);
    }

    // 2. Add or update the vote (upsert logic in the repository)
    await postRepository.addVote(postId, user.id, voteType);

    // 3. Retrieve and return the post again to get the updated vote counts
    const updatedPost = await postRepository.findPostWithVotes(postId);

    return c.json(updatedPost);
};

const upvotePost = votePost('upvote');
const downvotePost = votePost('downvote');



const homepage = async (c) => {
    const posts = await postRepository.findRecentPosts()
    return c.json(posts)
}


export { create, readAll, readOne, deleteOne, upvotePost, downvotePost, homepage }
