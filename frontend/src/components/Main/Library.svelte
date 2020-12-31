<script>
    import { loadCalibreDB, calibreDBTab } from "../../store";
    import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

    import { CalibreDB } from "../../store";
    import Books from "./Books.svelte";
    import JSONtree from "../JSONTree.svelte";
    import { onMount } from "svelte";

    let db = {};

    const unsubscribe = CalibreDB.subscribe((value) => {
        if (value && value.Authors) {
            db = value;
        }
    });

    onMount(() => {
        loadCalibreDB();
    });
</script>

{#if !$calibreDBTab}
    <div class="wrapper" style="height: 88vh;">
        <Books {db} />
    </div>
{:else}
    <Tabs>
        <TabList>
            <Tab>Books</Tab>
            <Tab>CalibreDB</Tab>
        </TabList>
        <TabPanel>
            <div class="wrapper" style="height: 78vh;">
                <Books {db} />
            </div>
        </TabPanel>
        <TabPanel>
            <JSONtree value={db} />
        </TabPanel>
    </Tabs>
{/if}
