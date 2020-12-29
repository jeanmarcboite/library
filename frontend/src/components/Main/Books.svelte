<script>
    import Tabulator from "../Tabulator.svelte";
    export let db;
    let data = undefined;
    const columns = [
        { title: "Title", field: "title", hozAlign: "left", width: 256 },
        {
            title: "Authors(s)",
            field: "Authors",
            sorter: function (a, b) {
                return String(a)
                    .toLowerCase()
                    .localeCompare(String(b).toLowerCase());
            },
        },
        { title: "Date", field: "Date" },
        { title: "Size (MB)", field: "Size", hozAlign: "center" },
        {
            title: "Rating",
            field: "Rating",
            hozAlign: "center",
        },
        { title: "Tags", field: "Tags", width: 64 },
        { title: "Series", field: "Series" },
        { title: "Publisher", field: "Publisher" },
        { title: "Published", field: "Published" },
    ];
    $: if (db && db.Books) {
        data = [...Object.keys(db.Books)].map((bookID) => {
            const b = db.Books[bookID];
            return {
                id: b.ID,
                title: b.Title,
                Authors: b.Authors.map((a) => db.Authors[a].Name).toString(),
                Date: new Date(b.LastModified.slice(0, 10)).toDateString(),
                Rating: b.Rating,
                Tags: b.Tags ? b.Tags.toString() : "",
                Series: b.Series ? b.Series.map((s) => s.Name).toString() : "",
                Publisher: b.Publishers.map((p) => p.Name).toString(),
                Size: (b.Data.UncompressedSize / 1000000).toFixed(1),
                Published: new Date(b.Pubdate).toDateString(),
            };
        });
    }
</script>

{#if data}
    <Tabulator {data} {columns} />
{/if}
