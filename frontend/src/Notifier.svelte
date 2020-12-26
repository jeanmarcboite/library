<script lang="typescript">
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();

    export const notify = addNotification;
    export { addNotification };
</script>
