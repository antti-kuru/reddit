import postgres from "postgres"

const sql = postgres()

const create = async (community, userId) => {
    const result = await sql`INSERT INTO communities
    (name, description, created_by)
    VALUES (${community.name}, ${community.description}, ${userId})
    RETURNING *;`;
    return result[0];
}

const findAll = async () => {
    return await sql`SELECT * FROM communities`;
}

const findById = async (id) => {
    const result = await sql`SELECT * FROM communities WHERE id = ${id}`;
    return result[0]
}

const deleteById = async (id, userId) => {
    const result = await sql`DELETE FROM communities
    WHERE id = ${id} AND created_by = ${userId}
    RETURNING *;`;

    return result[0]
}

export { create, findAll, findById, deleteById }