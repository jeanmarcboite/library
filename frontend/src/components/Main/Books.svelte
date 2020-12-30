<script>
    import _ from "lodash";
    import Tabulator from "../Tabulator.svelte";
    import FaInfoCircle from "svelte-icons/fa/FaInfoCircle.svelte";
    import { selectCalibreDB, setDB } from "../../store";
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
        //value - original value of the cell
        //data - the data for the row
        //type - the type of mutation occurring  (data|edit)
        //params - the mutatorParams object from the column definition
        //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
        if (!value) {
            return "";
        }
        if (Array.isArray(value)) {
            return value.map((p) => p.Name).toString();
        }
        return value;
    };
    var customAccessor = function (value, data, type, params, column, row) {
        //value - original value of the cell
        //data - the data for the row
        //type - the type of access occurring  (data|download|clipboard)
        //params - the accessorParams object passed from the column definition
        //column - column component for the column this accessor is bound to
        //row - row component for the row
        console.log(value);
        return value; //return the new value for the cell data.
    };
    const columns = [
        {
            title: "Title",
            field: "Title",
            hozAlign: "left",
            widthGrow: 1,
            editor: "input",
            accessor: customAccessor,
            mutator: function (value, data, type, params, component) {
                if (type == "edit") {
                    let book = db.Books[data.ID];
                    console.log("mutator: ", book, value);
                }

                return value;
            },
        },
        {
            title: "Authors",
            field: "Authors",
            mutator: function (value, data, type, params, component) {
                let name = db?.Authors[value]?.Name;
                if (name == null) {
                    return value;
                }
                return name;
            },
            sorter: function (a, b) {
                return String(a)
                    .toLowerCase()
                    .localeCompare(String(b).toLowerCase());
            },
        },
        {
            title: "Date",
            field: "LastModified",
            mutator: function (value, data, type, params, component) {
                return value ? new Date(value).toDateString() : "";
            },
        },
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

    $: if (db && db.Books) {
        data = [...Object.keys(db.Books)].map((bookID) => {
            return _.cloneDeep(db.Books[bookID]);
        });
    }
</script>

{#if data}
    <Tabulator {data} {columns} />
{/if}
