<script>
    import { selectFilter } from "./../../store/settings";
    import TiCog from "svelte-icons/ti/TiCog.svelte";
    import Overlay from "svelte-overlay";
    import { calibreDBTab, groupByAuthors } from "../../store";

    import Switch from "../Switch.svelte";

    let uno = false;
    let dos = true;
    let tres = false;
    let quatro = true;

    $: values = { uno, dos, tres, quatro };
</script>

<style>
    .icon {
        color: red;
        width: 32px;
        height: 32px;
    }
    .settings {
        border: 1px solid rgb(221, 221, 221);
        background-color: #ccc;
        color: black;
        padding: 1em;
        width: max-content;
    }
    fieldset {
        border: 2px solid grey;
        border-radius: 8px;

        background-color: #ccc;
        padding: 16px;
    }
    legend {
        color: grey;
        padding: 3px 6px;
    }
</style>

<Overlay closeOnClickOutside position="top-left">
    <!-- TRIGGER -->
    <button
        class="flex-grow-0 m-2 icon"
        slot="parent"
        let:toggle
        on:click={toggle}>
        <TiCog />
    </button>
    <!-- CONTENT -->
    <div
        slot="content"
        class="flex items-center justify-center text-2xl bg-gray-800 rounded-sm shadow-lg settings">
        <form>
            <fieldset>
                <legend>Table</legend>

                <Switch
                    class="pl-40"
                    bind:checked={$groupByAuthors}
                    id="groupByAuthors"
                    text="group by Author" />
                <Switch
                    class="pl-40"
                    bind:checked={$selectFilter}
                    id="selectFilter"
                    text="filter" />
            </fieldset>
            <fieldset>
                <legend>Debug</legend>
                <Switch
                    bind:checked={$calibreDBTab}
                    id="calibreDBTab"
                    text="Show calibre DB" />
            </fieldset>
        </form>
    </div>
</Overlay>
