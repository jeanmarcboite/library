<script>
    import SubsubMenu from "./Subsubmenu.svelte";
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
    li > button svg {
        transform: rotate(-90deg);
    }
    li:hover > button svg {
        transform: rotate(-270deg);
    }

    /* Below styles fake what can be achieved with the tailwind config
       you need to add the group-hover variant to scale and define your custom
       min width style.
         See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
         for implementation with config file
    */
    .group:hover .group-hover\:scale-100 {
        transform: scale(1);
    }
    .group:hover .group-hover\:-rotate-180 {
        transform: rotate(180deg);
    }
    .scale-0 {
        transform: scale(0);
    }
    .min-w-32 {
        min-width: 8rem;
    }
</style>

<div class="inline-block m-2 group">
    <button
        class="flex items-center px-3 py-1 text-black border rounded-sm outline-none focus:outline-none min-w-32">
        <span class="flex-1 pr-1 font-semibold">{menu.name}</span>
        <span><Arrow /></span>
    </button>
    <ul
        class="absolute transition duration-150 ease-in-out origin-top transform scale-0 bg-white border rounded-sm group-hover:scale-100 min-w-32">
        {#each menu.menu as submenu}
            <SubsubMenu {submenu} />
        {/each}
    </ul>
</div>
