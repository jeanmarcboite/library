<script>
    import { loadCalibreDB } from "../../store";
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
        console.log(value);
    });

    onMount(() => {
        loadCalibreDB();
    });
</script>

<Tabs>
    <TabList>
        <Tab>Books</Tab>
        <Tab>CalibreDB</Tab>
    </TabList>
    <TabPanel>
        <Books {db} />
    </TabPanel>
    <TabPanel>
        <JSONtree value={db} />
    </TabPanel>
</Tabs>
