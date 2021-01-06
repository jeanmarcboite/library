<script>
    import { afterUpdate, onMount } from "svelte";
    import _ from "lodash";
    import Tabulator from "../Tabulator.svelte";
    import TagEditor from "./TagEditor.svelte";

    import FaInfoCircle from "svelte-icons/fa/FaInfoCircle.svelte";
    import {
        selectCalibreDB,
        setDB,
        saveDB,
        groupByAuthors,
        fontSize,
        modalState,
    } from "../../store";
    import Modal from "./Modal.svelte";
    export let db;

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
    const titleSorter = function (a, b, aRow, bRow, column, dir, sorterParams) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    };

    const authorSorter = function (
        a,
        b,
        aRow,
        bRow,
        column,
        dir,
        sorterParams
    ) {
        //a, b - the two values being compared
        //aRow, bRow - the row components for the values being compared (useful if you need to access additional fields in the row data for the sort)
        //column - the column component for the column being sorted
        //dir - the direction of the sort ("asc" or "desc")
        //sorterParams - sorterParams object from column definition array
        //console.log(a, b, aRow, bRow, column, dir, sorterParams);
        let as = aRow._row.data.AuthorSort;
        let bs = bRow._row.data.AuthorSort;

        return as.toLowerCase().localeCompare(bs.toLowerCase());
    };
    const columns = [
        {
            title: "Author(s)",
            field: "Authors",
            editor: "input",
            mutator: function (value, data, type, params, component) {
                let name = db?.Authors[value]?.Name;
                //console.log(value, name);
                if (name == null) {
                    return value;
                }
                return name;
            },
            sorter: authorSorter,
        },
        {
            title: "Title",
            field: "Title",
            sorter: titleSorter,

            hozAlign: "left",
            widthGrow: 1,
            editor: "input",
            accessor: customAccessor,
            mutator: function (value, data, type, params, component) {
                if (type == "edit") {
                    let book = db.Books[data.ID];
                    //console.log("mutator: ", book, value);
                    book.Title = value;
                    //console.log("mutator: ", book);
                    saveDB(db);
                }

                return value;
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

    let datalist = ["toread", "reading", "html", "css"];
</script>

{#if true}
    <button on:click={modalState.toggle}>Toggle</button>
    <Modal>
        <div>
            <TagEditor {datalist} />

            <span on:click={modalState.close} class="absolute top-0 right-0">
                <svg
                    class="w-12 h-12 text-grey hover:text-grey-darkest"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"><title>Close</title>
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>
    </Modal>
{:else}
    <div
        class="fixed flex flex-col justify-end w-full max-w-md align-top shadow-inner animated fadeInUp md:relative md:justify-center md:rounded md:h-auto md:shadow" />
    <TagEditor {datalist} />
    {#if db && db.Books}
        <Tabulator
            {db}
            {columns}
            fontSize={$fontSize}
            groupBy={$groupByAuthors ? 'Authors' : null} />
    {/if}
{/if}
