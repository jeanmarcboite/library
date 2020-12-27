<script>
    import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

    import { CalibreDB } from "../../store";
    import JSONtree from "../JSONTree.svelte";

    let db = {};

    const unsubscribe = CalibreDB.subscribe((value) => {
        if (value && value.Authors) {
            db = value;
        }
        console.log(value);
    });
</script>

<Tabs>
    <TabList>
        <Tab>CalibreDB</Tab>
    </TabList>
    <TabPanel>
        <JSONtree value={db} />
    </TabPanel>
</Tabs>
