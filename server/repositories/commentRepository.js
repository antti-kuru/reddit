import postgres from "postgres"

const sql = postgres()

const create = async (communityId, parentPostId, comment) => {
    const result = await sql`
        INSERT INTO posts (community_id, parent_post_id, title, content)
        VALUES (${communityId}, ${parentPostId}, NULL, ${comment.content})
        RETURNING *`
    return result[0]
}

const findAll = async (postId) => {
    return await sql`
        SELECT *
        FROM posts
        WHERE parent_post_id = ${postId}
        ORDER BY created_at`
}

const deleteById = async (commentId, postId, communityId) => {
    const result = await sql`
        DELETE FROM posts
        WHERE id = ${commentId}
          AND parent_post_id = ${postId}
          AND community_id = ${communityId}
        RETURNING *`
    return result[0]
}

export { create, findAll, deleteById }

