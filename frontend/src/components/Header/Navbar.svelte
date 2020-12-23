<script>
    import Dropdown from "./Dropdown.svelte";

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
                    name: "Load ...",
                },
            ],
        },
        {
            name: "Edit",
            items: [
                {
                    name: "Find",
                    icon: "loop",
                    items: [{ name: "Python" }, { name: "Go" }],
                },
            ],
        },
    ];
</script>

{#each items as dropdown}
    <Dropdown {dropdown} />
{/each}
