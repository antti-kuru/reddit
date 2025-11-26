import { PUBLIC_API_URL } from "$env/static/public";

const readCommunities = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities`)
    return await response.json()
}

const readCommunity = async (communityId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}`)
    return await response.json()
}

const createCommunity = async (community) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(community)
    })
    return await response.json()
}

const deleteCommunity = async (communityId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}`, {
        method: "DELETE"
    })
    return await response.json()
}

export { readCommunities, readCommunity, createCommunity, deleteCommunity }