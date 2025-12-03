import { browser } from "$app/environment"
import * as commentsApi from "$lib/apis/commentsApi"

let commentState = $state({})

const initComments = async (communityId, postId) => {
    if (browser) {
        if (!commentState[communityId]) {
            commentState[communityId] = {}
        }
        commentState[communityId][postId] = await commentsApi.readComments(communityId, postId);
    }
}


const useCommentState = () => {
    return {
        get comments() {
            return commentState;
        },

        addComment: async (communityId, postId, comment) => {
            const newComment = await commentsApi.createComment(communityId, postId, comment);

            if (!commentState[communityId]) commentState[communityId] = {};
            if (!commentState[communityId][postId]) commentState[communityId][postId] = [];

            commentState[communityId][postId].push(newComment);
        },

        removeComment: async (communityId, postId, commentId) => {
            await commentsApi.deleteComment(communityId, postId, commentId);

            if (!commentState[communityId] || !commentState[communityId][postId]) {
                return
            }

            commentState[communityId][postId] = commentState[communityId][postId].filter(
                c => c.id !== commentId
            );
        },
        upvote: async (communityId, postId, commentId) => {
            const comment = await commentsApi.upvote(communityId, postId, commentId);
            commentState[communityId][postId] = commentState[communityId][postId].map(c => c.id === commentId ? comment : c);
        },
        downvote: async (communityId, postId, commentId) => {
            const comment = await commentsApi.downvote(communityId, postId, commentId);
            commentState[communityId][postId] = commentState[communityId][postId].map(c => c.id === commentId ? comment : c);
        }
    };
};

export { initComments, useCommentState };