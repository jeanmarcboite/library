<script>
    import TiCog from "svelte-icons/ti/TiCog.svelte";
    import Overlay from "svelte-overlay";
    import { calibreDBTab } from "../../store";

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
    .content {
        border: 1px solid #ddd;
        background: #f7f7f7;
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
        class="items-center justify-center text-2xl bg-gray-800 rounded-sm shadow-lg settings">
        <Switch bind:checked={$calibreDBTab} id="uno" text="Show calibre DB" />
        <div class="flex items-center justify-center flex-grow">
            <div class="max-w-xl">
                <div class="flex justify-between p-10 m-5">
                    <Switch bind:checked={uno} id="uno" text="uno" />
                    <Switch bind:checked={dos} id="dos" text="dos" />
                    <Switch bind:checked={tres} id="tres" text="tres" />
                    <Switch
                        bind:checked={quatro}
                        disabled={true}
                        id="quatro"
                        text="quatro" />
                </div>
                <div class="mt-5">
                    <pre
                        class="p-4 font-mono text-xs bg-cyan-100">{JSON.stringify(values)}</pre>
                </div>
            </div>
        </div>
    </div>
</Overlay>
