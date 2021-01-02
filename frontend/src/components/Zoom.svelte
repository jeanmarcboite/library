<script>
    import TiZoomIn from "svelte-icons/ti/TiZoomIn.svelte";
    import TiZoomOut from "svelte-icons/ti/TiZoomOut.svelte";

    import { fontSize } from "../store";
</script>

<style>
    .icon {
        color: white;
        width: 32px;
        height: 32px;
    }
</style>

<div class="m-2">
    <button class="flex-grow-0 icon" on:click={fontSize.decrement}>
        <TiZoomOut />
    </button>
    {$fontSize}px
    <button class="flex-grow-0 icon" on:click={fontSize.increment}>
        <TiZoomIn />
    </button>
</div>
