<script>
    import Dropdown from "./Dropdown.svelte";
    import FaSearch from "svelte-icons/fa/FaSearch.svelte";
    import FaDatabase from "svelte-icons/fa/FaDatabase.svelte";
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();

    export let loadCalibreDB;

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
                    className: "text-gray-300",
                },
                {
                    name: "Load calibre database...",
                    icon: FaDatabase,
                    onclick: loadCalibreDB,
                    className: "text-red-300",
                },
                {
                    name: "Exit",
                    onclick: () => quit(),
                },
            ],
        },
        {
            name: "Edit",
            className: "disabled text-red-900",
            items: [
                {
                    name: "Find",
                    className: "disabled text-red-900",
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
