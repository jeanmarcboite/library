<script>
    import Dropdown from "./Dropdown.svelte";
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();

    export let menu = [];

    const selectEpub = () => {
        SelectEpub().then(console.log);
    };

    const logClick = () => {
        console.log("click");
    };
</script>

<div>
    {#each menu as dropdown}
        <Dropdown {dropdown} />
    {/each}
</div>
