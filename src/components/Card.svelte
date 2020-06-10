<script>
    import { createEventDispatcher } from "svelte";
    import Textarea from "./Textarea.svelte";
    import FileUploader from "./FileUploader.svelte";
    import Attachments from "./Attachments.svelte";

    export let data;
    let isEditing = !!data.isNew;
    const dispatch = createEventDispatcher();

    function edit() {
        isEditing = true;
    }

    function save() {
        isEditing = false;
        delete data.isNew;
        onCardChange();
    }

    function remove() {
        dispatch("remove");
    }

    function addAttachment(e) {
        data.attachments = [...data.attachments, e.detail];
        onCardChange();
    }

    function onCardChange() {
        dispatch("change");
    }

    function getText() {
        return data.text.replace(/\n/g, "<br />");
    }
</script>

<style>
    .card {
        padding: 8px;
        border-radius: 6px;
        background-color: #fff;
        margin-bottom: 10px;
    }

    .actions {
        padding-top: 16px;
        display: flex;
        justify-content: space-between;
    }

    .text {
        min-height: 20px;
        cursor: pointer;
    }
</style>

<div class="card">
    {#if isEditing}
        <Textarea {data} field="text" on:save={save} placeholder="Enter card's details..." />
        <Attachments {data} field="attachments" showRemove={true} on:change={onCardChange} />
        <div class="actions">
            <FileUploader on:upload={addAttachment}>Attach file</FileUploader>
            <button class="remove-button" on:click={remove}>Delete card</button>
            <button class="save-button" on:click={save}>Save</button>
        </div>
    {:else}
        <div class="text" on:click={() => (isEditing = true)}>
            {@html getText()}
        </div>
        <Attachments {data} field="attachments" />
    {/if}
</div>
