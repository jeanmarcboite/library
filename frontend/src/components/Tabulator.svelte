<script>
    import { groupByAuthors } from "./../store.ts";
    import "tabulator-tables/dist/css/tabulator_simple.css";
    import Tabulator from "tabulator-tables";
    import { afterUpdate, onMount } from "svelte";

    export let data, columns;
    export let groupBy = null;
    let currentGroupBy = "notset";

    let tableComponent, tabulator;

    const newTabulator = () => {
        return new Tabulator(tableComponent, {
            data, //link data to table
            groupBy,
            initialSort: [
                { column: "Authors", dir: "asc" },
                { column: "Title", dir: "asc" }, //then sort by this second
            ],
            groupToggleElement: "header", //toggle group on click anywhere in the group header

            groupHeader: function (value, count, data, group) {
                return (
                    value +
                    "<span style='color:#d00; margin-left:10px;'>(" +
                    count +
                    " item)</span>"
                );
            },
            groupStartOpen: function (value, count, data, group) {
                //value - the value all members of this group share
                //count - the number of rows in this group
                //data - an array of all the row data objects in this group
                //group - the group component for the group

                return count < 2;
            },
            reactiveData: true, //enable data reactivity
            columns, //define table columns
            layout: "fitDataFill", //fit columns to width of table (optional)
            responsiveLayout: "collapse",
            responsiveLayoutCollapseStartOpen: false,

            pagination: "local",
            height: "100%",
            rowClick: function (e, row) {
                //trigger an alert message when the row is clicked
                //alert("Row " + row.getData().id + " Clicked!!!!");
            },
            cellClick: function (e, cell) {
                //e - the click event object
                //cell - cell component
                console.log(cell);
            },
            tooltips: function (cell) {
                //cell - cell component

                //function should return a string for the tooltip of false to hide the tooltip
                return cell.getColumn().getField() + " - " + cell.getValue(); //return cells "field - value";
            },
        });
    };

    onMount(() => {
        tabulator = newTabulator();
    });

    afterUpdate(() => {
        tabulator.setData(data);
        tabulator.setSort([
            { column: "Title", dir: "asc" }, //sort by this first
            { column: "Authors", dir: "asc" }, //then by this
        ]);
    });
</script>

<style>
    @import "../../node_modules/tabulator-tables/dist/css/tabulator.css";

    /*Theme the Tabulator element*/
    .table-component {
        background-color: #ccc;
        border: 1px solid blue;
        border-radius: 5px;
    }

    /*Theme the header*/
    .table-component .tabulator-header {
        background-color: rebeccapurple;
        color: #fff;
    }

    /*Allow column header names to wrap lines*/
    .table-component .tabulator-header .tabulator-col,
    .table-component .tabulator-header .tabulator-col-row-handle {
        white-space: normal;
    }

    /*Color the table rows*/
    .table-component .tabulator-tableHolder .tabulator-table .tabulator-row {
        color: #fff;
        background-color: #666;
    }

    /*Color even rows*/
    .table-component
        .tabulator-tableHolder
        .tabulator-table
        .tabulator-row:nth-child(even) {
        background-color: #444;
    }
</style>

<div class="table-component" bind:this={tableComponent} />
<svelte:window on:resize={() => tabulator.redraw()} />
