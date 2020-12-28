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
            layout: "fitColumns", //fit columns to width of table (optional)
            rowClick: function (e, row) {
                //trigger an alert message when the row is clicked
                alert("Row " + row.getData().id + " Clicked!!!!");
            },
        });
    });
</script>

<style global>
    @import "../../node_modules/tabulator-tables/dist/css/tabulator_simple.css";
</style>

<div bind:this={tableComponent} />
