<script>
    import Arrow from "./Arrow.svelte";

    let menu = [
        {
            name: "File",
            menu: [
                {
                    name: "Languages",
                    menu: [{ name: "Python" }, { name: "Go" }],
                },
            ],
        },
        {
            name: "Edit",
            menu: [
                {
                    name: "Find",
                    menu: [{ name: "Python" }, { name: "Go" }],
                },
            ],
        },
    ];
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

{#each menu as item}
    <div class="inline-block m-2 group">
        <button
            class="flex items-center px-3 py-1 text-white border rounded-sm outline-none focus:outline-none min-w-32">
            <span class="flex-1 pr-1 font-semibold">{item.name}</span>
            <span><Arrow /></span>
        </button>
        <ul>
            {#each item.menu as subitem}{subitem.name}{/each}
        </ul>
    </div>
{/each}

<div class="inline-block m-2 group">
    <button
        class="flex items-center px-3 py-1 text-black border rounded-sm outline-none focus:outline-none min-w-32">
        <span class="flex-1 pr-1 font-semibold">File</span>
        <span><Arrow /></span>
    </button>
    <ul
        class="absolute transition duration-150 ease-in-out origin-top transform scale-0 bg-white border rounded-sm group-hover:scale-100 min-w-32">
        <li class="px-3 py-1 rounded-sm hover:bg-gray-100">Open database...</li>
        <li class="px-3 py-1 rounded-sm hover:bg-gray-100">DevOps</li>
        <li class="relative px-3 py-1 rounded-sm hover:bg-gray-100">
            <button
                class="flex items-center w-full text-left outline-none focus:outline-none">
                <span class="flex-1 pr-1">Langauges</span>
                <span class="mr-auto">
                    <Arrow />
                </span>
            </button>
            <ul
                class="absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left bg-white border rounded-sm min-w-32 ">
                <li class="px-3 py-1 hover:bg-gray-100">Javascript</li>
                <li class="relative px-3 py-1 rounded-sm hover:bg-gray-100">
                    <button
                        class="flex items-center w-full text-left outline-none focus:outline-none">
                        <span class="flex-1 pr-1">Python</span>
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
                        class="absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left bg-white border rounded-sm min-w-32 ">
                        <li class="px-3 py-1 hover:bg-gray-100">2.7</li>
                        <li class="px-3 py-1 hover:bg-gray-100">3+</li>
                    </ul>
                </li>
                <li class="px-3 py-1 hover:bg-gray-100">Go</li>
                <li class="px-3 py-1 hover:bg-gray-100">Rust</li>
            </ul>
        </li>
        <li class="px-3 py-1 rounded-sm hover:bg-gray-100">Testing</li>
    </ul>
</div>
