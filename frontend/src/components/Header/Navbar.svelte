<script>
    import Dropdown from "./Dropdown.svelte";
    import FaSearch from "svelte-icons/fa/FaSearch.svelte";
    import FaDatabase from "svelte-icons/fa/FaDatabase.svelte";

    const selectEpub = () => {
        SelectEpub().then(console.log);
    };

    const logClick = () => {
        console.log("click");
    };

    let items = [
        {
            name: "File",
            items: [
                {
                    name: "Import EPUB",
                    onclick: selectEpub,
                },
                {
                    name: "Load calibre database...",
                    icon: FaDatabase,
                    onclick: logClick,
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
