<script lang="ts">
    import { selectCalibreDB } from "./../../store/db.ts";
    import Books from "./Books.svelte";
    import { afterUpdate, onMount } from "svelte";
    import moment from "moment";
    import _ from "lodash";
    import Tabulator from "../Tabulator.svelte";
    import TagEditor from "./TagEditor.svelte";

    import { saveDB, groupByAuthors, fontSize, modalState } from "../../store";
    import Modal from "./Modal.svelte";
    export let db;

    let datalist = [];
    afterUpdate(() => {});

    let tags = [];
    let editortitle = "title";
    let editor = {
        data: undefined,
        cell: undefined,
        success: undefined,
        cancel: undefined,
    };

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

    let authors = ["red", "green", "blue", "orange"]; //getAuthors(db);

    const authorEditor = (cell, onRendered, success, cancel) => {
        if (db.Books) {
            let x = Object.values(db.Authors).reduce(
                (set: Set<string>, author: any) => {
                    set.add(author.Name);

                    return set;
                },
                new Set()
            );
            datalist = [...x];
        }
        editortitle = "Author(s)";
        modalState.toggle();
        tags = [cell.getValue()];
        editor = { data: "Authors", cell, success, cancel };
    };

    const tagEditor = (cell, onRendered, success, cancel) => {
        if (db.Books) {
            let x = Object.values(db.Books).reduce(
                (set: Set<string>, book: any) => {
                    book.Tags?.forEach((element: string) => {
                        set.add(element);
                    });

                    return set;
                },
                new Set()
            );
            datalist = [...x];
        }
        editortitle = "Edit tags";
        modalState.toggle();
        tags = cell.getValue();
        editor = { data: "Tags", cell, success, cancel };
    };

    var dateEditor = function (cell, onRendered, success, cancel) {
        //cell - the cell component for the editable cell
        //onRendered - function to call when the editor has been rendered
        //success - function to call to pass the successfuly updated value to Tabulator
        //cancel - function to call to abort the edit and return to a normal cell

        //create and style input
        var cellValue = moment(cell.getValue(), "DD/MM/YYYY").format(
            "YYYY-MM-DD"
        );
        var input = document.createElement("input");

        input.setAttribute("type", "date");

        input.style.padding = "4px";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";

        input.value = cellValue;

        onRendered(function () {
            input.focus();
            input.style.height = "100%";
        });

        function onChange() {
            if (input.value != cellValue) {
                success(moment(input.value, "YYYY-MM-DD").format("DD/MM/YYYY"));
            } else {
                cancel();
            }
        }

        //submit new value on blur or change    input.addEventListener("blur", onChange);

        //submit new value on enter
        input.addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                onChange();
            }

            if (e.keyCode == 27) {
                cancel();
            }
        });

        return input;
    };

    const StringArrayFormatter = (field: string) => {
        return function (cell) {
            if (!cell || !cell._cell) return "";
            const value = cell._cell.row.data[field];
            if (!value) return "";
            if (Array.isArray(value)) {
                return value.map((p) => p.Name).toString();
            }
            return value;
        };
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
            editor: "autocomplete",
            headerFilter: true,
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
            editor: tagEditor,
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

    const save = (event) => {
        editor.cell.setValue(event.detail.tags);
        editor.success(event.detail.tags);
        console.log("save", editor.cell._cell.row.data, event.detail.tags);
        db.Books[editor.cell._cell.row.data.ID][editor.data] =
            event.detail.tags;
        saveDB(db);
    };

    const cancel = (event) => {
        editor.cancel();
    };
</script>

{#if db && db.Books}
    <div class="relative w-full h-full">
        <Modal>
            <TagEditor
                title={editortitle}
                {datalist}
                {tags}
                on:save={save}
                on:cancel={cancel} />
        </Modal>
        <Tabulator
            {db}
            {columns}
            fontSize={$fontSize}
            groupBy={$groupByAuthors ? 'Authors' : null} />
    </div>
{/if}
