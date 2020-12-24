<script>
    import Menu from "./Menu.svelte";
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
    div:hover svg {
        transform: rotate(-180deg);
    }
    .scale-0 {
        transform: scale(0);
    }
    .min-w-32 {
        min-width: 8rem;
    }
    div,
    ul {
        background-color: #376e6f;
    }
</style>

<div class="inline-block m-2 group">
    <button
        class="flex items-center px-3 py-1 border rounded-sm outline-none focus:outline-none min-w-32">
        <span
            class="flex-1 pr-1 font-semibold button  {dropdown.className ? dropdown.className : 'text-white'}">{dropdown.name}</span>
        <span>
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
        class="absolute transition duration-150 ease-in-out origin-top transform scale-0 border rounded-sm group-hover:scale-100 min-w-32">
        {#each dropdown.items as menu}
            <Menu {menu} />
        {/each}
    </ul>
</div>
