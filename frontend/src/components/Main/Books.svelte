<script>
    import DataTable from "@fouita/data-table";
    import JSONtree from "../JSONTree.svelte";
    export let db;
    let books = [];
    const head = {
        ID: "ID",
        Title: "Title",
        Authors: "Author(s)",
        Date: "Date",
        Size: "Size (MB)",
        Rating: "Rating",
        Tags: "Tags",
        Series: "Series",
        Publisher: "Publisher",
        Published: "Published",
    };
    $: if (db && db.Books) {
        books = [...Object.keys(db.Books)].map((bookID) => {
            const b = db.Books[bookID];
            return {
                ID: b.ID,
                Title: b.Title,
                Authors: "Authors",
                Date: "Date",
                Rating: "Rating",
                Tags: "Tags",
                Series: "Series",
                Publisher: b.Publishers.map((p) => p.Name).toString(),
                Size: (b.Data.UncompressedSize / 1000000).toFixed(1),
                Published: b.Pubdate,
            };
        });
    }
</script>

{#if db && db.Books}
    <h1>{db.Filename}</h1>
    {#each books as book}
        <h2>{book.Title}</h2>
        <JSONtree value={book} />
    {/each}
    <DataTable {head} rows={books} hover />
{/if}
