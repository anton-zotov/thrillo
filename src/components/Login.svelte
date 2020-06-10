<script>
    import * as firebase from "firebase/app";
    import { fakeLogin } from "../user";

    let email = "";
    let password = "";
    let error = "";
    let loading = false;

    function login(event) {
        loading = true;
        error = null;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                error = err.message;
            })
            .finally(() => (loading = false));
    }
</script>

<form class="form" on:submit|preventDefault={login}>
    <h2>Login</h2>
    <label>
        <span>Email</span>
        <input type="email" bind:value={email} />
    </label>

    <label>
        <span>Password</span>
        <input type="password" bind:value={password} />
    </label>

    {#if error}
        <div class="error">{error}</div>
    {/if}

    <button type="submit" class="button form-button" disabled={loading}>Login</button>
</form>
