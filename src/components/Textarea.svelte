<script>
    import { createEventDispatcher } from "svelte";
    import autofocus from "../actions/autofocus";

    export let data;
    export let field;
    export let placeholder = "";
    let textarea;
    const maxHeight = 300;
    const dispatch = createEventDispatcher();

    function onKeydown(event) {
        if (event.key === "Enter" && event.ctrlKey) {
            dispatch("save");
        }
    }

    function resize(el) {
        if (el) textarea = el;
        textarea.style.height = "5px";
        textarea.style.height = textarea.scrollHeight + "px";
        if (textarea.scrollHeight >= maxHeight) {
            textarea.style.overflowY = "scroll";
        } else {
            textarea.style.overflowY = null;
        }
    }
</script>

<style>
    textarea {
        width: 100%;
        resize: none;
        overflow: hidden;
        min-height: 10px;
        max-height: 300px;
    }
</style>

<textarea
    bind:value={data[field]}
    use:resize
    use:autofocus
    on:input={() => resize()}
    on:keydown={onKeydown}
    {placeholder} />
