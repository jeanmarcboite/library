<script>
    import Arrow from "./Arrow.svelte";
    export let submenu;
</script>

<style>
    /* since nested groupes are not supported we have to use 
       regular css for the nested dropdowns 
    */
    li > ul {
        transform: translatex(100%) scale(0);
    }
    li:hover > ul {
        transform: translatex(101%) scale(1);
    }
    .min-w-32 {
        min-width: 8rem;
    }
</style>

{#if !submenu.menu}
    <li class="px-3 py-1 rounded-sm hover:bg-blue-200">{submenu.name}</li>
{:else}
    <li class="relative px-3 py-1 rounded-sm hover:bg-blue-200">
        <button
            class="flex items-center w-full text-left outline-none focus:outline-none">
            <span class="flex-1 pr-1">{submenu.name}</span>
            <span class="mr-auto">
                <Arrow />
            </span>
        </button>
        <ul
            class="absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left bg-white border rounded-sm min-w-32 ">
            {#each submenu.menu as subsubmenu}
                <svelte:self submenu={subsubmenu} />
            {/each}
        </ul>
    </li>
{/if}
