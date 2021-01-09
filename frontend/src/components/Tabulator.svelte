<script lang="ts">
    import _ from "lodash";
    import "tabulator-tables/dist/css/tabulator_simple.css";
    import Tabulator from "tabulator-tables";
    import { afterUpdate, onMount } from "svelte";

    export let db, columns;
    export let groupBy = null;
    export let fontSize = 16;
    export let index = "ID";
    let tableComponent, tabulator;

    var clearFilters = () => {};

    onMount(() => {
        //Define variables for input elements
        var fieldEl = document.getElementById("filter-field");
        var typeEl = document.getElementById("filter-type");
        var valueEl = document.getElementById("filter-value");

        //Custom filter example
        function customFilter(data) {
            return data.car && data.rating < 3;
        }

        //Trigger setFilter function with correct parameters
        function updateFilter() {
            var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
            var typeVal = typeEl.options[typeEl.selectedIndex].value;

            var filter = filterVal == "function" ? customFilter : filterVal;

            if (filterVal == "function") {
                typeEl.disabled = true;
                valueEl.disabled = true;
            } else {
                typeEl.disabled = false;
                valueEl.disabled = false;
            }

            if (filterVal) {
                tabulator.setFilter(filter, typeVal, valueEl.value);
            }
        }

        //Update filters on value change
        document
            .getElementById("filter-field")
            .addEventListener("change", updateFilter);
        document
            .getElementById("filter-type")
            .addEventListener("change", updateFilter);
        document
            .getElementById("filter-value")
            .addEventListener("keyup", updateFilter);

        clearFilters = () => {
            fieldEl.value = "";
            typeEl.value = "=";
            valueEl.value = "";

            tabulator.clearFilter();
        };
    });

    const newTabulator = () => {
        let data = [...Object.keys(db.Books)].map((bookID) => {
            return _.cloneDeep(db.Books[bookID]);
        });
        return new Tabulator(tableComponent, {
            data, //link data to table
            index,
            groupBy,
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

    afterUpdate(() => {
        tabulator = newTabulator();
        tabulator.setSort([
            { column: "Title", dir: "asc" }, //sort by this first
            { column: "Authors", dir: "asc" }, //then by this
        ]);
        console.log("tabulator afterUpdate", db);
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

<div>
    <select id="filter-field">
        {#each columns as col}
            <option value={col.field}>{col.title}</option>
        {/each}
    </select>

    <select id="filter-type">
        <option value="like">like</option>
        <option value="=">=</option>
        <option value="!=">!=</option>
    </select>

    <input id="filter-value" type="text" placeholder="value to filter" />
    <button
        on:click={clearFilters}
        class="px-3 py-1 border rounded-sm outline-none focus:outline-none min-w-32">Clear
        Filters</button>
</div>

<div
    class="table-component"
    style="font-size: {fontSize}px;"
    bind:this={tableComponent} />
<svelte:window on:resize={() => tabulator.redraw()} />
