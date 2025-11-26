import { browser } from "$app/environment"
import * as communitiesApi from "$lib/apis/communitiesApi.js"

let communityState = $state([]);

const initCommunities = async () => {
    if (browser) {
        communityState = await communitiesApi.readCommunities()
    }
}

const initCommunity = async (communityId) => {
    if (browser) {
        const community = await communitiesApi.readCommunity(communityId)
        if (community && !communityState.find(c => c.id === communityId)) {
            communityState.push(community)
        }
    }
}

const useCommunityState = () => {
    return {
        get communities() {
            return communityState
        },
        addCommunity: async (community) => {
            const newCommunity = await communitiesApi.createCommunity(community)
            communityState.push(newCommunity)
        },
        removeCommunity: async (communityId) => {
            await communitiesApi.deleteCommunity(communityId)
            communityState = communityState.filter(c => c.id !== communityId)
        }
    }
}

export { initCommunities, initCommunity, useCommunityState }