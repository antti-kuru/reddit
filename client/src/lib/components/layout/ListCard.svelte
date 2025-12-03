<script>
    let { children } = $props();
</script>

<div class="card">
    {@render children()}
</div>

<style>
    .card {
        background: #ffffff20;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 5px #0002;
        border: 1px solid #ffffff30;
    }
</style>
