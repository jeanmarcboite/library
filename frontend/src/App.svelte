<script>
    import Header from "./components/Header";
    import Footer from "./components/Footer";
    import Tailwind from "./Tailwind.svelte";
    import Notifications from "svelte-notifications";
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();

    let CalibreDB = {};
    const loadCalibreDB = () => {
        LoadCalibreDB().then(
            (db) => {
                CalibreDB = db;
                addNotification({
                    type: "success",
                    text: `Loaded ${db.Filename} [${db.ID}]`,
                    position: "bottom-right",
                    removeAfter: 3000,
                });
            },
            (error) => {
                addNotification({
                    type: "danger",
                    text: error,
                    position: "bottom-right",
                    removeAfter: 6000,
                });
            }
        );
    };
</script>

<style>
    #app {
        height: 100vh;
    }
    header {
        overflow: visible;
        background-color: blueviolet;
    }
    main {
        overflow: auto;
        background-color: burlywood;
    }

    footer {
        width: 100%;
        background-color: black;
    }
</style>

<Tailwind />

<Notifications>
    <div id="app" class="flex flex-col w-screen">
        <header>
            <Header {loadCalibreDB} />
        </header>

        <main class="flex-grow overflow-y" />
        <footer>
            <Footer />
        </footer>
    </div>
</Notifications>
