import postgres from "postgres";

import { findPostWithVotes } from "./postRepository.js";

const sql = postgres();

const create = async (communityId, parentPostId, comment, userId) => {
    const result = await sql`
        INSERT INTO posts (community_id, parent_post_id, title, content, created_by)
        VALUES (${communityId}, ${parentPostId}, NULL, ${comment.content}, ${userId})
        RETURNING *`;

    const newPost = result[0];
    if (newPost) {
        newPost.upvotes = 0;
        newPost.downvotes = 0;
    }
    return newPost;
};


const findAll = async (postId) => {
    const result = await sql`
        SELECT 
            p.*, 
            COALESCE(sub.upvotes, 0) AS upvotes, 
            COALESCE(sub.downvotes, 0) AS downvotes
        FROM posts p
        LEFT JOIN (
            SELECT 
                post_id, 
                COUNT(CASE WHEN vote = 'upvote' THEN 1 END) AS upvotes,
                COUNT(CASE WHEN vote = 'downvote' THEN 1 END) AS downvotes
            FROM votes
            GROUP BY post_id
        ) sub ON sub.post_id = p.id
        WHERE p.parent_post_id = ${postId}
        ORDER BY p.created_at`;

    return result.map(comment => ({
        ...comment,
        upvotes: Number(comment.upvotes),
        downvotes: Number(comment.downvotes)
    }));
};

const deleteById = async (commentId, postId, communityId, userId) => {
    const result = await sql`
        DELETE FROM posts
        WHERE id = ${commentId}
          AND parent_post_id = ${postId}
          AND community_id = ${communityId}
          AND created_by = ${userId}
        RETURNING *`;
    return result[0];
};

// Helper to find a comment (which is a post) by its ID with vote counts
const findCommentWithVotes = async (commentId) => {
    const comment = await findPostWithVotes(commentId);

    if (comment && comment.parent_post_id !== null) {
        return comment;
    }
    return null;
}

export { create, findAll, deleteById, findCommentWithVotes };
