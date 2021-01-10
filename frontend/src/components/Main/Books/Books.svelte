<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import _ from "lodash";
    import Tabulator from "../../Tabulator.svelte";
    import TagEditor from "../TagEditor.svelte";

    import {
        saveDB,
        groupByAuthors,
        fontSize,
        modalState,
    } from "../../../store";

    import { tagEditor, tagList, save, cancel } from "./editors";
    import { Mutator } from "./mutators";
    import { titleSorter, authorSorter } from "./sorters";
    import { StringArrayFormatter } from "./formatters";

    import Modal from "../Modal.svelte";
    export let db;

    let datalist: string[] = [];
    afterUpdate(() => {});

    let tags = [];
    let editortitle = "title";

    const getAuthors = (db) => {
        if (db.Books) {
            let x = Object.values(db.Authors).reduce(
                (set: Set<string>, author: any) => {
                    set.add(author.Name);

                    return set;
                },
                new Set()
            );
            console.log("authors", [...x]);
            //return ["red", "green", "blue", "orange"];
            return [...x];
        }

        return [];
    };

    const columnsSort = [
        { column: "Title", dir: "asc" }, //sort by this first
        { column: "Authors", dir: "asc" }, //then by this
    ];

    const columns = [
        {
            title: "Author(s)",
            field: "Authors",
            editor: "autocomplete",
            headerFilter: "input",
            editorParams: () => {
                return {
                    showListOnEmpty: true, //show all values when the list is empty,
                    freetext: true, //allow the user to set the value of the cell to a free text entry
                    allowEmpty: true, //allow empty string values
                    searchingPlaceholder: "Filtering ...", //set the search placeholder
                    emptyPlaceholder: "(no matching results found)", //set the empty list placeholder
                    values: getAuthors(db),
                    sortValuesList: "asc", //if creating a list of values from values:true then choose how it should be sorted
                    verticalNavigation: "hybrid", //navigate to new row when at the top or bottom of the selection list
                };
            },
            mutator: function (value, data, type, params, component) {
                if (type == "edit") {
                    let book = db.Books[data.ID];
                    console.log("mutator: ", book, value);
                    //book.Title = value;
                    //conso

                    saveDB(db);

                    return value;
                }
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
            headerFilter: true,

            hozAlign: "left",
            widthGrow: 1,
            editor: "input",
            mutator: Mutator(db, "Title"),
        },
        {
            title: "Date",
            field: "LastModified",
            mutator: function (value, data, type, params, component) {
                return value ? new Date(value).toDateString() : "";
            },
            editor: false,
        },
        {
            title: "Size (MB)",
            field: "Size",
            hozAlign: "center",
            formatter: (cell) =>
                (cell._cell.row.data.Data.UncompressedSize / 1000000).toFixed(
                    1
                ),
        },
        {
            title: "Rating",
            field: "Rating",
            hozAlign: "center",
        },
        {
            title: "Tags",
            field: "Tags",
            width: 64,
            editor: (cell, onRendered, success, cancel) => {
                datalist = tagList(db);
                tags = cell.getValue();
                console.log("tag editor: ", tags, datalist);
                return tagEditor(db, cell, onRendered, success, cancel);
            },
        },
        {
            title: "Series",
            field: "Series",
            mutator: StringArrayFormatter("Series"),
        },
        {
            title: "Publishers",
            field: "Publishers",
            mutator: StringArrayFormatter("Publishers"),
        },
        {
            title: "Published",
            field: "Pubdate",
            mutator: function (value, data, type, params, component) {
                return new Date(value).toDateString();
            },
        },
    ];
</script>

{#if db && db.Books}
    <div class="relative w-full h-full">
        <Modal>
            <TagEditor
                title={editortitle}
                {datalist}
                {tags}
                on:save={(event) => save(db, event)}
                on:cancel={cancel} />
        </Modal>
        <Tabulator
            {db}
            {columns}
            {columnsSort}
            fontSize={$fontSize}
            groupBy={$groupByAuthors ? 'Authors' : null} />
    </div>
{/if}