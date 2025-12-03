<script>
    import CommunityList from "$lib/components/communities/CommunityList.svelte";
    import CommunityForm from "$lib/components/communities/CommunityForm.svelte";
    import { initCommunities } from "$lib/states/communityState.svelte";

    $effect(() => {
        initCommunities();
    });
</script>

<h1 class="text-3xl font-bold">Communities</h1>

<CommunityList />
<CommunityForm />
