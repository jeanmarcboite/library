<script lang="ts">
    import { modalState } from "../../store";

    function keydown(e: KeyboardEvent) {
        e.stopPropagation();
        if (e.key === "Escape") {
            modalState.close();
        }
    }
</script>

{#if $modalState}
    <!-- tabindex is required, because it tells the browser that this div element is focusable and hence triggers the keydown event -->
    <div
        on:keydown={keydown}
        tabindex={0}
        autofocus
        class="fixed z-50 flex overflow-auto modal animated fadeIn pin bg-smoke-dark">
        <slot />
    </div>
{/if}
