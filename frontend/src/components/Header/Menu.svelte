<script>
    import Arrow from "./Arrow.svelte";
    export let menu;
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
    li {
        background-color: #376e6f;
        color: floralwhite;
    }
    li:hover {
        background-color: #2f4454;
    }
    li svg {
        transform: rotate(-90deg);
    }
    li:hover svg {
        transform: rotate(-270deg);
    }
</style>

{#if !menu.items}
    <li class="px-3 py-1 rounded-sm">{menu.name}</li>
{:else}
    <li class="relative px-3 py-1 rounded-sm">
        <button
            class="flex items-center w-full text-left outline-none focus:outline-none">
            <span class="flex-1 pr-1">{menu.name}</span>
            <span class="mr-auto">
                <svg
                    class="w-4 h-4 transition duration-150 ease-in-out fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </span>
        </button>
        <ul
            class="absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left border rounded-sm min-w-32 ">
            {#each menu.items as submenu}
                <svelte:self menu={submenu} />
            {/each}
        </ul>
    </li>
{/if}
