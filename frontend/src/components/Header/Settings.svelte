<script>
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
        background-color: burlywood;
        color: black;
        padding: 1em;
        width: max-content;
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
        <Switch
            bind:checked={$calibreDBTab}
            id="calibreDBTab"
            text="Show calibre DB" />
        <Switch
            class="pl-40"
            bind:checked={$groupByAuthors}
            id="groupByAuthors"
            text="group by Author" />
    </div>
</Overlay>
