<script lang="ts">
    import { modalState } from "../../store";

    function keydown(e: KeyboardEvent) {
        e.stopPropagation();
        if (e.key === "Escape") {
            modalState.close();
        }
    }
</script>

<style>
    .modal {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        display: table;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
    }
</style>

{#if false}
    <!-- tabindex is required, because it tells the browser that this div element is focusable and hence triggers the keydown event -->
    <div
        on:keydown={keydown}
        tabindex={0}
        autofocus
        class="fixed z-50 flex overflow-auto modal animated fadeIn pin bg-smoke-dark">
        <slot />
    </div>
{/if}
{#if true}
    <div
        class="absolute inset-0 z-50 object-center w-1/2 m-auto text-white bg-gray-700 border-4 border-red-700 border-solid h-1/2">
        <slot />
    </div>
{/if}
