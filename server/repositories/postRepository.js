import postgres from "postgres";


const sql = postgres();

const create = async (communityId, post, userId) => {
    const result = await sql`
    INSERT INTO posts (community_id, title, content, created_by)
    VALUES (${communityId}, ${post.title}, ${post.content}, ${userId})
    RETURNING *`;
    return result[0];
};

const findAll = async (communityId) => {
    return await sql`
    SELECT * FROM posts
    WHERE community_id = ${communityId}
    ORDER BY created_at`;
};

const findById = async (communityId, postId) => {
    const result = await sql`
    SELECT * FROM posts
    WHERE community_id = ${communityId}
      AND id = ${postId}`;
    return result[0];
};

const deleteById = async (communityId, postId, userId) => {
    const result = await sql`
    DELETE FROM posts
    WHERE community_id = ${communityId}
      AND id = ${postId}
      AND created_by = ${userId}
    RETURNING *`;
    return result[0];
};

export { create, findAll, findById, deleteById };
