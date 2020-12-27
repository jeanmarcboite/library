<script>
    import App from "../../App.svelte";
    import JSONtree from "../JSONTree.svelte";
    export let db;
</script>

{#if db && db.Books}
    <h1>{db.Filename}</h1>
    {#each [...Object.keys(db.Books)] as bookID}
        {db.Books[bookID].Title}
        <JSONtree value={db.Books[bookID]} />
    {/each}
{/if}
