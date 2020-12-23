<script>
    import Dropdown from "./Dropdown.svelte";
    import FaSearch from "svelte-icons/fa/FaSearch.svelte";
    import FaDatabase from "svelte-icons/fa/FaDatabase.svelte";

    let items = [
        {
            name: "File",
            items: [
                {
                    name: "Languages",
                    items: [
                        {
                            name: "Python",
                            items: [{ name: "2.7" }, { name: "3+" }],
                        },
                        { name: "Go" },
                    ],
                },
                {
                    name: "Load database...",
                    icon: FaDatabase,
                },
            ],
        },
        {
            name: "Edit",
            items: [
                {
                    name: "Find",
                    icon: FaSearch,
                    items: [{ name: "Python" }, { name: "Go" }],
                },
            ],
        },
    ];
</script>

<div>
    {#each items as dropdown}
        <Dropdown {dropdown} />
    {/each}
</div>
