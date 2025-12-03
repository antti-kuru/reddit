import postgres from "postgres";


const sql = postgres();

const create = async (communityId, post, userId) => {
  const result = await sql`
    INSERT INTO posts (community_id, title, content, created_by)
    VALUES (${communityId}, ${post.title}, ${post.content}, ${userId})
    RETURNING *`;


  const newPost = result[0];
  return {
    ...newPost,
    upvotes: 0,
    downvotes: 0
  }
};

const findAll = async (communityId) => {
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
        WHERE p.community_id = ${communityId}
          AND p.parent_post_id IS NULL 
        ORDER BY p.created_at DESC`;

  return result.map(post => ({
    ...post,
    upvotes: Number(post.upvotes),
    downvotes: Number(post.downvotes)
  }));

};

const findById = async (communityId, postId) => {
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
    WHERE p.community_id = ${communityId}
      AND p.id = ${postId}`;

  return {
    ...result[0],
    upvotes: Number(result[0].upvotes),
    downvotes: Number(result[0].downvotes)
  };


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

const addVote = async (postId, userId, voteType) => {
  await sql`
        INSERT INTO votes (user_id, post_id, vote)
        VALUES (${userId}, ${postId}, ${voteType})
        ON CONFLICT (user_id, post_id)
        DO UPDATE SET vote = EXCLUDED.vote, created_at = CURRENT_TIMESTAMP
    `;
};

const findPostWithVotes = async (postId) => {
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
        WHERE p.id = ${postId}
    `;
  return {
    ...result[0],
    upvotes: Number(result[0].upvotes),
    downvotes: Number(result[0].downvotes)
  }
}

const findRecentPosts = async () => {
  const threshold_3_days_ago = new Date();
  threshold_3_days_ago.setDate(threshold_3_days_ago.getDate() - 3);

  const result = await sql`
    SELECT 
        p.*, 
        COALESCE(votes_sub.upvotes, 0) AS upvotes, 
        COALESCE(votes_sub.downvotes, 0) AS downvotes,
        COALESCE(comments_sub.comments, 0) AS comments
    FROM posts p
    LEFT JOIN (
        SELECT 
            post_id, 
            COUNT(CASE WHEN vote = 'upvote' THEN 1 END) AS upvotes,
            COUNT(CASE WHEN vote = 'downvote' THEN 1 END) AS downvotes
        FROM votes
        GROUP BY post_id
    ) votes_sub ON votes_sub.post_id = p.id
    LEFT JOIN (
        SELECT 
            parent_post_id,
            COUNT(*) AS comments
        FROM posts
        WHERE parent_post_id IS NOT NULL
        GROUP BY parent_post_id
    ) comments_sub ON comments_sub.parent_post_id = p.id
    WHERE p.parent_post_id IS NULL
      AND p.created_at >= ${threshold_3_days_ago}
    ORDER BY p.created_at DESC`;

  return result.map(post => ({
    ...post,
    upvotes: Number(post.upvotes),
    downvotes: Number(post.downvotes),
    comments: Number(post.comments)
  }));
}



export { create, findAll, findById, deleteById, addVote, findPostWithVotes, findRecentPosts };
