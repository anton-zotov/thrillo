<script>
    import * as firebase from "firebase/app";
    import { setName, fakeLogin } from "../user";

    let name = "";
    let email = "";
    let password = "";
    let error = "";
    let loading = false;

    function register(event) {
        loading = true;
        error = null;

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                userCredentials.user.updateProfile({
                    displayName: name,
                });
                setName(name);
            })
            .catch(err => {
                error = err.message;
            })
            .finally(() => (loading = false));
    }
</script>

<form class="form" on:submit|preventDefault={register}>
    <h2>Register</h2>
    <label>
        <span>Your name</span>
        <input type="text" bind:value={name} />
    </label>

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

    <button type="submit" class="button form-button" disabled={loading}>Register</button>
</form>
