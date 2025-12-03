import { browser } from "$app/environment"
import * as postsApi from "$lib/apis/postsApi"

let postState = $state({});

const initCommunityPosts = async (communityId) => {
    if (browser) {
        postState[communityId] = await postsApi.readPosts(communityId)
    }
}

const initPost = async (communityId, postId) => {
    if (browser) {
        if (!postState[communityId]) {
            postState[communityId] = [];
        }
        console.log(postId)
        console.log(communityId)
        const post = await postsApi.readPost(communityId, postId)


        if (post) {
            postState[communityId].push(post)
        }
    }
}

const usePostState = () => {
    return {
        get posts() {
            return postState
        },
        addPost: async (communityId, post) => {
            const newPost = await postsApi.createPost(communityId, post)
            const posts = postState[communityId] || []
            posts.push(newPost)
            postState[communityId] = posts
        },
        removePost: async (communityId, postId) => {
            await postsApi.deletePost(communityId, postId)
            postState[communityId] = postState[communityId].filter(p => p.id !== postId)
        },
        upvote: async (communityId, postId) => {
            const post = await postsApi.upvote(communityId, postId)
            postState[communityId] = postState[communityId].map(p => p.id === postId ? post : p)
        },
        downvote: async (communityId, postId) => {
            const post = await postsApi.downvote(communityId, postId)
            postState[communityId] = postState[communityId].map(p => p.id === postId ? post : p)
        }
    }
}

export { initCommunityPosts, initPost, usePostState }