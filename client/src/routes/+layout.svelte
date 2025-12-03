<script>
  import "../app.css";
  import { useAuthState } from "$lib/states/authState.svelte.js";
  let { children } = $props();
  const authState = useAuthState();
</script>

<header
  class="bg-blue-900 p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
>
  <nav>
    <ul class="flex space-x-4">
      <li><a class="anchor" href="/">Home</a></li>
      <li><a class="anchor" href="/communities">Communities</a></li>
    </ul>
  </nav>

  <!-- Right-aligned auth area, unchanged logic -->
  <div class="flex items-center space-x-4 mt-4 sm:mt-0">
    {#if authState.user}
      <div>
        <span>
          Hello, {authState.user.email}!
          {#if authState.user.roles?.length}
            (Roles: {authState.user.roles.join(", ")})
          {/if}
        </span>
        {#if authState.user.roles?.includes("ADMIN")}
          <ul>
            <li><a href="/admin">Admin</a></li>
          </ul>
        {/if}
        <button onclick={() => authState.logout()}>Logout</button>
      </div>
    {:else}
      <div class="flex space-x-4">
        <p>Hello anonymous!</p>
        <ul class="flex space-x-4">
          <li><a href="/auth/login">Login</a></li>
          <li><a href="/auth/register">Register</a></li>
        </ul>
      </div>
    {/if}
  </div>
</header>

<main class="bg-blue-500 flex-grow">
  {@render children()}
</main>
