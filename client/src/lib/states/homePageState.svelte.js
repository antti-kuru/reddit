import { browser } from "$app/environment"
import * as postsApi from "$lib/apis/postsApi"

let homepageState = $state([]);


const initHomePage = async () => {
    if (browser) {
        homepageState = await postsApi.getHomepagePosts()
    }
}


const useHomePageState = () => {
    return {
        get posts() {
            return homepageState
        }
    }
}

export { initHomePage, useHomePageState }