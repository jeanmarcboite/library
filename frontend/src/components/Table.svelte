<script>
    import "tabulator-tables/dist/css/tabulator_simple.css";
    import Tabulator from "tabulator-tables";
    import { onMount } from "svelte";

    export let data, columns;

    let tableComponent;

    onMount(() => {
        new Tabulator(tableComponent, {
            data: data, //link data to table
            reactiveData: true, //enable data reactivity
            columns: columns, //define table columns
        });
    });
</script>

<style global>
    @import "../../node_modules/tabulator-tables/dist/css/tabulator_simple.css";
</style>

<div bind:this={tableComponent} />
