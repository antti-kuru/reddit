<script>
    import { useAuthState } from "$lib/states/authState.svelte";

    let authState = useAuthState();
</script>

<p>Welcome to the home page!</p>

{#if authState.user}
    <a href="/communities">Go to communities</a>
{/if}
