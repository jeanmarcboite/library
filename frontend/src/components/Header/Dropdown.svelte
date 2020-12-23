<script>
    import Menu from "./Menu.svelte";
    import Arrow from "./Arrow.svelte";
    export let dropdown;
</script>

<style>
    /* Below styles fake what can be achieved with the tailwind config
       you need to add the group-hover variant to scale and define your custom
       min width style.
         See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
         for implementation with config file
    */
    .group:hover .group-hover\:scale-100 {
        transform: scale(1);
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
        <span class="flex-1 pr-1 font-semibold">{dropdown.name}</span>
        <span><Arrow /></span>
    </button>
    <ul
        class="absolute transition duration-150 ease-in-out origin-top transform scale-0 bg-white border rounded-sm group-hover:scale-100 min-w-32">
        {#each dropdown.items as menu}
            <Menu {menu} />
        {/each}
    </ul>
</div>
