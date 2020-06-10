<script>
    import * as firebase from "firebase/app";
    import { createEventDispatcher } from "svelte";

    let files;
    let fileInput;

    const dispatch = createEventDispatcher();

    function openFile() {
        fileInput.click();
    }

    function uploadFile() {
        setTimeout(() => {
            firebase
                .storage()
                .ref()
                .child("files/" + files[0].name)
                .put(files[0])
                .then(result => {
                    dispatch("upload", {
                        name: files[0].name,
                    });
                });
        });
    }
</script>

<style>
    .file-input {
        display: none;
    }
</style>

<button class="link" on:click={openFile}>
    <slot />
</button>

<input class="file-input" type="file" bind:files bind:this={fileInput} on:input={uploadFile} />
