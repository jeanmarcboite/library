<script>
    import SubMenu from "./SubMenu.svelte";

    let items = [
        {
            name: "File",
            menu: [
                {
                    name: "Languages",
                    menu: [
                        {
                            name: "Python",
                            menu: [{ name: "2.7" }, { name: "3+" }],
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
            menu: [
                {
                    name: "Find",
                    menu: [{ name: "Python" }, { name: "Go" }],
                },
            ],
        },
    ];

    let menus = {};
</script>

{#each items as menu}
    <SubMenu {menu} />
{/each}
