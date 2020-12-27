<script>
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();

    export const notify = addNotification;
</script>
