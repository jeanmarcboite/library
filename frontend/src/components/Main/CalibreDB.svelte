<script>
    import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

    import { CalibreDB } from "../../store";

    let db;

    const unsubscribe = CalibreDB.subscribe((value) => {
        //db = JSON.stringify(value);
        console.log(value);
    });
</script>

<Tabs>
    <TabList>
        <Tab>CalibreDB</Tab>
    </TabList>
    <TabPanel>{db}</TabPanel>
</Tabs>
