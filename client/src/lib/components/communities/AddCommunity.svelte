<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
    let inputName = $state("");
    let inputDescription = $state("");
</script>

<input type="text" bind:value={inputName} placeholder="Community name" />
<input
    type="text"
    bind:value={inputDescription}
    placeholder="Community description"
/>
<button
    onclick={() => {
        communityState.addCommunity(inputName, inputDescription);
        inputName = "";
        inputDescription = "";
    }}>Add community</button
>
