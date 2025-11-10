import { browser } from "$app/environment"
const COMMUNITIES_KEY = "communities"



let initialCommunities = [
]

if (browser && localStorage.getItem(COMMUNITIES_KEY) != null) {
    initialCommunities = JSON.parse(localStorage.getItem(COMMUNITIES_KEY));
}

let communityState = $state(initialCommunities);


const saveCommunities = () => {
    localStorage.setItem(COMMUNITIES_KEY, JSON.stringify(communityState))
}



const removeCommunity = (id) => {
    communityState = communityState.filter(community => community.id != id)
    saveCommunities()
}


const useCommunityState = () => {
    return {
        get communities() {
            return communityState
        },
        removeCommunity,
        addCommunity: (name, desc) => {
            communityState.push({ id: communityState.length + 1, name: name, description: desc }), console.log(name, desc)
            saveCommunities()
        },
        getOne: (id) => {
            return communityState.find((c) => c.id === id)
        }

    }
}

export { useCommunityState }