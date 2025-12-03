<script>
    import { goto } from "$app/navigation";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    let { data } = $props();
    let message = $state("");
    let errorMessage = $state("");
    let isLoading = $state(false);

    const authState = useAuthState();

    const handleForm = async (e) => {
        e.preventDefault();
        errorMessage = "";
        message = "";
        isLoading = true;

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            if (data.action === "login") {
                await authState.login(email, password);
                message = "Login successful! Redirecting...";
                setTimeout(() => goto("/"), 1000);
            } else {
                await authState.register(email, password);
                message = "Registration successful! You can now log in.";
                setTimeout(() => goto("/auth/login"), 2000);
            }
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    };
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-xl shadow-2xl">
    <h2 class="text-3xl font-extrabold text-blue-300 mb-6 text-center">
        {data.action === "login" ? "Login to Account" : "Create Account"}
    </h2>

    {#if message}
        <div
            class="bg-green-600/20 text-green-300 p-4 rounded-lg border border-green-500 mb-4"
        >
            <p>{message}</p>
        </div>
    {/if}

    {#if errorMessage}
        <div
            class="bg-red-600/20 text-red-300 p-4 rounded-lg border border-red-500 mb-4"
        >
            <p>{errorMessage}</p>
        </div>
    {/if}

    <form onsubmit={handleForm} class="space-y-4">
        <label class="block">
            <span class="text-sm font-medium text-gray-300 block mb-1"
                >Email</span
            >
            <input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                class="w-full p-3 rounded-lg border-2 border-blue-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
        </label>

        <label class="block">
            <span class="text-sm font-medium text-gray-300 block mb-1"
                >Password</span
            >
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                class="w-full p-3 rounded-lg border-2 border-blue-700 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
        </label>

        <button
            type="submit"
            disabled={isLoading}
            class="w-full btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading
                ? "Processing..."
                : data.action === "login"
                  ? "Login"
                  : "Register"}
        </button>
    </form>

    <p class="text-center mt-6 text-sm text-gray-400">
        {#if data.action === "login"}
            Don't have an account?
            <a
                href="/auth/register"
                class="text-blue-400 hover:text-blue-300 font-semibold transition duration-200"
                >Register here</a
            >
        {:else}
            Already have an account?
            <a
                href="/auth/login"
                class="text-blue-400 hover:text-blue-300 font-semibold transition duration-200"
                >Login here</a
            >
        {/if}
    </p>
</div>
