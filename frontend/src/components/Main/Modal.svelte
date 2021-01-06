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
    <div
        class="absolute inset-0 z-50 flex flex-col object-center w-1/2 m-auto text-white bg-gray-700 border-4 border-red-700 border-solid animated fadeIn opacity-80 h-1/2">
        <div class="h-full">
            <slot />
        </div>
    </div>
{/if}
