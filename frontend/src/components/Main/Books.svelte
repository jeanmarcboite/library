<script>
    import Tabulator from "../Tabulator.svelte";
    import FaInfoCircle from "svelte-icons/fa/FaInfoCircle.svelte";
    export let db;
    let data = undefined;
    var printIcon = function (cell, formatterParams, onRendered) {
        //return "<i class='fa fa-print'></i>";
        return "<span class='m-1 icon'><svelte:component this={FaInfoCircle} /></span>";
    };
    const columns = [
        { formatter: "responsiveCollapse", headerSort: false },
        {
            title: "Title",
            field: "title",
            hozAlign: "left",
            widthGrow: 1,
            editor: "input",
        },
        {
            title: "Authors",
            field: "Authors",
            sorter: function (a, b) {
                return String(a)
                    .toLowerCase()
                    .localeCompare(String(b).toLowerCase());
            },
        },
        {
            title: "Comment",
            field: "Comment",
            responsive: 10,
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

    const mapStrings = (array) =>
        array ? array.map((p) => p.Name).toString() : "";

    $: if (db && db.Books) {
        data = [...Object.keys(db.Books)].map((bookID) => {
            const b = db.Books[bookID];
            return {
                id: b.ID,
                title: b.Title,
                Authors: b.Authors.map((a) => db.Authors[a].Name).toString(),
                Comment: b.Comment,
                Date: new Date(b.LastModified.slice(0, 10)).toDateString(),
                Rating: b.Rating,
                Tags: b.Tags ? b.Tags.toString() : "",
                Series: mapStrings(b.Series),
                Publisher: mapStrings(b.Publishers),
                Size: (b.Data.UncompressedSize / 1000000).toFixed(1),
                Published: new Date(b.Pubdate).toDateString(),
            };
        });
    }
</script>

{#if data}
    <Tabulator {data} {columns} />
{/if}
