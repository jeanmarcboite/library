<script>
    import Table from "../Table.svelte";
    export let db;
    let data = undefined;
    const columns = [
        { title: "Title", field: "title", hozAlign: "left", width: 64 },
        { title: "Authors(s)", field: "Authors" },
        { title: "Date", field: "Date" },
        { title: "Size (MB)", field: "Size" },
        { title: "Rating", field: "Rating" },
        { title: "Tags", field: "Tags" },
        { title: "Series", field: "Series" },
        { title: "Publisher", field: "Publisher" },
        { title: "Published", field: "Published" },
    ];
    var tabledata = [
        { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
        { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
        {
            id: 3,
            name: "Christine Lobowski",
            age: "42",
            col: "green",
            dob: "22/05/1982",
        },
        {
            id: 4,
            name: "Brendon Philips",
            age: "125",
            col: "orange",
            dob: "01/08/1980",
        },
        {
            id: 5,
            name: "Margret Marmajuke",
            age: "16",
            col: "yellow",
            dob: "31/01/1999",
        },
    ];
    $: if (db && db.Books) {
        data = [...Object.keys(db.Books)].map((bookID) => {
            const b = db.Books[bookID];
            return {
                id: b.ID,
                title: b.Title,
                col: b.Authors.map((a) => db.Authors[a].Name).toString(),
                Date: new Date(b.LastModified.slice(0, 10)).toDateString(),
                Rating: b.Rating,
                Tags: b.Tags ? b.Tags.toString() : "",
                Series: b.Series ? b.Series.map((s) => s.Name).toString() : "",
                Publisher: b.Publishers.map((p) => p.Name).toString(),
                Size: (b.Data.UncompressedSize / 1000000).toFixed(1),
                Published: new Date(b.Pubdate).toDateString(),
            };
        });
        console.log(data);
        console.log(tabledata);
    }

    var tablecolumns = [
        //Define Table Columns
        { title: "Name", field: "name", width: 150 },
        { title: "Favourite Color", field: "col" },
    ];
</script>

{#if data}
    <Table {data} {columns} />
{/if}
