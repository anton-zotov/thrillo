<script>
    import { createEventDispatcher } from "svelte";
    import autofocus from "../actions/autofocus";

    export let text = "";
    export let hasRemove = false;
    const dispatch = createEventDispatcher();

    function onKeydown(event) {
        if (event.key === "Enter") {
            save();
        }
    }

    function save() {
        if (!text) return;
        dispatch("save", text);
    }

    function discard() {
        dispatch("discard");
    }

    function removeList() {
        dispatch("remove");
    }
</script>

<style>
    input {
        width: 100%;
    }

    .button-container {
        margin-top: 4px;
        text-align: right;
        display: flex;
        justify-content: flex-end;
    }

    .save-button {
        margin-left: 10px;
    }

    .grow {
        display: flex;
        flex-grow: 1;
    }
</style>

<input type="text" placeholder="Enter list title..." bind:value={text} use:autofocus on:keydown={onKeydown} />

<div class="button-container">
    {#if hasRemove}
        <div class="grow">
            <button class="remove-button" on:click={removeList}>Delete list</button>
        </div>
    {/if}
    <button class="link" on:click={discard}>Discard</button>
    <button type="button" class="save-button" on:click={save}>Save</button>
</div>
