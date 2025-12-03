<script>
    import { useAuthState } from "$lib/states/authState.svelte";
    import HomePageList from "$lib/components/homePage/HomePageList.svelte";
    import { initHomePage } from "$lib/states/homePageState.svelte";
    let authState = useAuthState();

    $effect(() => {
        initHomePage();
    });
</script>

<p class="text-xl mt-10 text-center">Welcome to the home page!</p>

<HomePageList />

{#if authState.user}
    <a href="/communities">Go to communities</a>
{/if}
