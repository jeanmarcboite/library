<script>
    import TiZoomIn from "svelte-icons/ti/TiZoomIn.svelte";
    import TiZoomOut from "svelte-icons/ti/TiZoomOut.svelte";
</script>

<style>
    .icon {
        color: white;
        width: 32px;
        height: 32px;
    }
</style>

<button class="flex-grow-0 m-2 icon">
    <TiZoomOut />
</button>
<button class="flex-grow-0 m-2 icon">
    <TiZoomIn />
</button>
