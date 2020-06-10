<script>
    import * as firebase from "firebase/app";
    import { createEventDispatcher } from "svelte";

    export let data;
    export let field;
    export let showRemove = false;

    let fileLinkEl;
    const dispatch = createEventDispatcher();

    function download(attachment) {
        firebase
            .storage()
            .ref("files/" + attachment.name)
            .getDownloadURL()
            .then(url => {
                fileLinkEl.href = url;
                fileLinkEl.click();
            });
    }

    function remove(attachment) {
        data[field] = data[field].filter(att => att !== attachment);
        dispatch("change");
    }
</script>

<style>
    .attachments {
        margin-top: 12px;
    }

    .link {
        text-align: left;
    }

    .remove {
        margin-left: 4px;
    }

    .hidden {
        display: none;
    }
</style>

{#if data[field] && data[field].length}
    <div class="attachments">
        {#each data[field] as attachment}
            <div class="attachment">
                <span class="link">
                    <span on:click={() => download(attachment)}>{attachment.name}</span>
                    {#if showRemove}
                        <button class="remove" on:click={() => remove(attachment)}>✖</button>
                    {/if}
                </span>
            </div>
        {/each}
        <a class="hidden" href="https://google.com" bind:this={fileLinkEl} target="_blank">Donwload</a>
    </div>
{/if}
