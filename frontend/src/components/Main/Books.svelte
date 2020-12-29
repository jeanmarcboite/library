<script>
    import Tabulator from "../Tabulator.svelte";
    import FaInfoCircle from "svelte-icons/fa/FaInfoCircle.svelte";
    export let db;
    let data = undefined;
    var printIcon = function (cell, formatterParams, onRendered) {
        //return "<i class='fa fa-print'></i>";
        return "<span class='m-1 icon'><svelte:component this={FaInfoCircle} /></span>";
    };
    //define custom mutator
    const SizeMutator = function (value, data, type, params, component) {
        //value - original value of the cell
        //data - the data for the row
        //type - the type of mutation occurring  (data|edit)
        //params - the mutatorParams object from the column definition
        //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
        return (data.Data.UncompressedSize / 1000000).toFixed(1);
        //return value > mutatorParams.threshold; //return the new value for the cell data.
    };

    const StringArrayMutator = function (value, data, type, params, component) {
        if (!value) {
            return "";
        }
        if (Array.isArray(value)) {
            return value.map((p) => p.Name).toString();
        }
        return value;
    };

    const columns = [
        {
            title: "Title",
            field: "Title",
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
        { title: "Date", field: "Date" },
        {
            title: "Size (MB)",
            field: "Size",
            hozAlign: "center",
            mutator: SizeMutator,
        },
        {
            title: "Rating",
            field: "Rating",
            hozAlign: "center",
        },
        { title: "Tags", field: "Tags", width: 64 },
        {
            title: "Series",
            field: "Series",
            mutator: StringArrayMutator,
        },
        {
            title: "Publishers",
            field: "Publishers",
            mutator: StringArrayMutator,
        },
        {
            title: "Published",
            field: "Pubdate",
            mutator: function (value, data, type, params, component) {
                return new Date(value).toDateString();
            },
        },
    ];

    const mapStrings = (array) =>
        array ? array.map((p) => p.Name).toString() : "";

    $: if (db && db.Books) {
        data = [...Object.keys(db.Books)].map((bookID) => {
            const b = db.Books[bookID];
            return b;
            return {
                ID: b.ID,
                title: b.Title,
                Authors: b.Authors.map((a) => db.Authors[a].Name).toString(),
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
