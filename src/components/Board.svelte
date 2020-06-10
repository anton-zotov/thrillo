<script>
    import * as firebase from "firebase/app";
    import LabelEdit from "./LabelEdit.svelte";
    import Column from "./Column.svelte";
    import { uid } from "../utils";

    let columns = [];
    let isAddingColumn = false;
    let isLoading = true;

    const db = firebase.firestore();
    const boardCollection = db.collection("board2");
    const boardDoc = boardCollection.doc("main");

    boardDoc.onSnapshot(snapshot => {
        isLoading = false;
        columns = snapshot.data().columns || [];
    });

    function onChange() {
        boardDoc.set({
            columns,
        });
    }

    function addColumn(title) {
        columns = [
            ...columns,
            {
                title,
                cards: [],
                id: uid(),
            },
        ];
        isAddingColumn = false;
        onChange();
    }

    function removeColumn(list) {
        columns = columns.filter(l => l !== list);
        onChange();
    }
</script>

<style>
    .add-column {
        background: none !important;
        padding-top: 0;
    }
</style>

{#if isLoading}
    <div class="loading">Loading...</div>
{:else}
    <div class="page">
        <div class="board">
            {#each columns as column (column.id)}
                <Column data={column} on:change={onChange} on:remove={event => removeColumn(event.detail)} />
            {/each}

            {#if isAddingColumn}
                <div class="column">
                    <LabelEdit on:save={event => addColumn(event.detail)} on:discard={() => (isAddingColumn = false)} />
                </div>
            {:else}
                <div class="column add-column">
                    <button class="button" on:click={() => (isAddingColumn = true)}>Add a list</button>
                </div>
            {/if}
        </div>
    </div>
{/if}
