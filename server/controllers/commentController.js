import * as commentRepository from "../repositories/commentRepository.js"
import * as postRepository from "../repositories/postRepository.js"


const create = async (c) => {
    const user = c.get("user");
    const communityId = Number(c.req.param('communityId'))
    const postId = Number(c.req.param('postId'))

    if (!Number.isInteger(communityId)) {
        return c.json({ error: "Invalid community id" }, 400)
    }
    if (!Number.isInteger(postId)) {
        return c.json({ error: "Invalid post id" }, 400)
    }

    const comment = await c.req.json()
    if (!comment.content) {
        return c.json({ error: "Missing required fields" }, 400)
    }

    const newComment = await commentRepository.create(communityId, postId, comment, user.id)
    return c.json(newComment, 201)
}

const readAll = async (c) => {
    const postId = Number(c.req.param('postId'))
    if (!Number.isInteger(postId)) {
        return c.json({ error: "Invalid post id" }, 400)
    }

    const comments = await commentRepository.findAll(postId)
    return c.json(comments)
}

const deleteOne = async (c) => {
    const user = c.get("user");
    const communityId = Number(c.req.param('communityId'))
    const postId = Number(c.req.param('postId'))
    const commentId = Number(c.req.param('commentId'))

    if (!Number.isInteger(communityId)) {
        return c.json({ error: "Invalid community id" }, 400)
    }
    if (!Number.isInteger(postId)) {
        return c.json({ error: "Invalid post id" }, 400)
    }
    if (!Number.isInteger(commentId)) {
        return c.json({ error: "Invalid comment id" }, 400)
    }

    const deletedComment = await commentRepository.deleteById(commentId, postId, communityId, user.id)
    if (!deletedComment) {
        return c.json({ error: "Comment not found" }, 404)
    }

    return c.json(deletedComment)
}

const voteComment = (voteType) => async (c) => {
    const user = c.get("user");
    const commentId = Number(c.req.param('commentId'))

    // The comment ID acts as the post_id in the votes table
    const postId = commentId;

    const existingComment = await commentRepository.findCommentWithVotes(postId);
    if (!existingComment) {
        return c.json({ error: "Comment not found" }, 404);
    }

    // 2. Add or update the vote using the general postRepository.addVote function (reused logic)
    await postRepository.addVote(postId, user.id, voteType);

    // 3. Return the updated comment with new vote counts
    const updatedComment = await commentRepository.findCommentWithVotes(postId);

    return c.json(updatedComment);
};

const upvoteComment = voteComment('upvote');
const downvoteComment = voteComment('downvote');


export { create, readAll, deleteOne, upvoteComment, downvoteComment }
