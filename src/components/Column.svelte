<script>
    import { createEventDispatcher } from "svelte";
    import { uid } from "../utils";

    import Card from "./Card.svelte";
    import LabelEdit from "./LabelEdit.svelte";
    export let data;

    let isEditing = false;
    const dispatch = createEventDispatcher();

    function addCard() {
        data.cards = [
            ...data.cards,
            {
                text: "",
                attachments: [],
                isNew: true,
                id: uid(),
            },
        ];
    }

    function onColumnChange() {
        dispatch("change");
    }

    function removeCard(card) {
        data.cards = data.cards.filter(c => c !== card);
        onColumnChange();
    }

    function remove() {
        dispatch("remove", data);
    }

    function updateTitle(title) {
        data.title = title;
        isEditing = false;
        onColumnChange();
    }
</script>

<style>
    .column label {
        padding-bottom: 10px;
        cursor: pointer;
    }

    .label-edit {
        padding-bottom: 10px;
    }
</style>

<div class="column">
    {#if isEditing}
        <div class="label-edit">
            <LabelEdit
                text={data.title}
                on:save={event => updateTitle(event.detail)}
                on:discard={() => (isEditing = false)}
                on:remove={remove}
                hasRemove={true} />
        </div>
    {:else}
        <label on:click={() => (isEditing = true)}>{data.title}</label>
    {/if}
    {#each data.cards as card}
        <Card data={card} on:change={onColumnChange} on:remove={() => removeCard(card)} />
    {/each}
    <button class="button" on:click={addCard}>Add a card</button>
</div>
