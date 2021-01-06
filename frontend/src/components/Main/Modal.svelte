<script lang="ts">
    import { modalState } from "../../store";

    function keydown(e: KeyboardEvent) {
        e.stopPropagation();
        if (e.key === "Escape") {
            modalState.close();
        }
    }

    function save() {
        modalState.close();
    }
</script>

{#if $modalState}
    <div
        class="absolute inset-0 z-50 flex flex-col object-center w-1/2 m-auto text-white bg-gray-700 border-4 border-red-700 border-solid animated fadeIn opacity-80 h-1/2">
        <div class="h-full">
            <slot />
        </div>
        <div class="absolute bottom-0 right-0 ">
            <button
                on:click={modalState.close}
                class="px-4 py-3 mr-6 font-bold text-blue-500 transition duration-300 ease-in-out border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">
                Cancel
            </button>
            <button
                on:click={save}
                class="px-4 py-3 mr-6 font-bold text-blue-500 transition duration-300 ease-in-out border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">
                Save
            </button>
        </div>
    </div>
{/if}
