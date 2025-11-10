import { browser } from "$app/environment"
const POSTS_KEY = "posts"

let initialPosts = []

if (browser && localStorage.getItem(POSTS_KEY) != null) {
    initialPosts = JSON.parse(localStorage.getItem(POSTS_KEY));
}

let postState = $state(initialPosts);

const savePosts = () => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(postState))
}


const removePost = (communityId, postId) => {
    postState[communityId] = postState[communityId].filter((post) => post.id != postId)
    savePosts()
}

const usePostState = () => {
    return {
        get posts() {
            return postState
        },
        getPost: (communityId, postId) => {
            return postState[communityId].find(p => p.id === postId)
        },
        addPost: (communityId, title, content) => {
            if (!postState[communityId]) {
                postState[communityId] = []
            }
            postState[communityId].push({ id: postState[communityId].length + 1, title: title, content: content })
            savePosts()
        },
        removePost
    }
}

export { usePostState }