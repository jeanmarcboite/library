<script>
    import { loadCalibreDB } from "../../store";
    import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

    import { CalibreDB } from "../../store";
    import Books from "./Books.svelte";
    import FouitaBooks from "./FouitaBooks.svelte";
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
        loadCalibreDB("/home/box/tmp/Calibre/metadata.db");
    });
</script>

<Tabs>
    <TabList>
        <Tab>Books</Tab>
        <Tab>FouitaBooks</Tab>
        <Tab>CalibreDB</Tab>
    </TabList>
    <TabPanel>
        <Books {db} />
    </TabPanel>
    <TabPanel>
        <FouitaBooks {db} />
    </TabPanel>
    <TabPanel>
        <JSONtree value={db} />
    </TabPanel>
</Tabs>
