<script>
    import "tabulator-tables/dist/css/tabulator_simple.css";
    import Tabulator from "tabulator-tables";
    import { onMount } from "svelte";

    export let data, columns;

    let tableComponent;

    onMount(() => {
        new Tabulator(tableComponent, {
            data, //link data to table
            reactiveData: true, //enable data reactivity
            columns, //define table columns
            layout: "fitDataFill", //fit columns to width of table (optional)
            rowClick: function (e, row) {
                //trigger an alert message when the row is clicked
                alert("Row " + row.getData().id + " Clicked!!!!");
            },
        });
    });
</script>

<style>
    @import "../../node_modules/tabulator-tables/dist/css/tabulator.css";

    /*Theme the Tabulator element*/
    .table-component {
        background-color: #ccc;
        border: 1px solid #333;
        border-radius: 10px;
    }

    /*Theme the header*/
    .table-component .tabulator-header {
        background-color: #333;
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

<div class="m-4 table-component" bind:this={tableComponent} />
