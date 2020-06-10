<script>
    import * as firebase from "firebase/app";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import Board from "./Board.svelte";
    import { user, isLoading } from "../stores";

    let showLogin = false;

    function logout() {
        firebase.auth().signOut();
    }
</script>

<header>
    <h1>Thrillo</h1>
    {#if $user}
        <div>{$user.displayName}</div>
        <button class="link" on:click={logout}>Logout</button>
    {/if}
</header>

<main>
    {#if $isLoading}
        <div class="loading">Loading...</div>
    {:else if $user}
        <Board />
    {:else if showLogin}
        <Login />
        <div class="login-switch">
            Don't have an account yet?
            <button class="link" on:click={() => (showLogin = !showLogin)}>Register</button>
        </div>
    {:else}
        <Register />
        <div class="login-switch">
            Already have an account?
            <button class="link" on:click={() => (showLogin = !showLogin)}>Login</button>
        </div>
    {/if}
</main>
