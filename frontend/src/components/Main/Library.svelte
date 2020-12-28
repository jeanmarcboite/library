<script>
    import { loadCalibreDB } from "../../store";
    import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

    import { CalibreDB } from "../../store";
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
        <Tab>FouitaBooks</Tab>
        <Tab>CalibreDB</Tab>
    </TabList>
    <TabPanel>
        <FouitaBooks {db} />
    </TabPanel>
    <TabPanel>
        <JSONtree value={db} />
    </TabPanel>
</Tabs>
