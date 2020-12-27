<script>
    import Header from "./components/Header";
    import Footer from "./components/Footer";
    import Main from "./components/Main/CalibreDB.svelte";
    import Tailwind from "./Tailwind.svelte";
    import Notifications from "svelte-notifications";

    import { menu } from "./menu";
    import Notifier from "./Notifier.svelte";
    import { onMount } from "svelte";

    import { SetAppNotifier } from "./store";

    let notifier;
    onMount(() => {
        SetAppNotifier(notifier);
    });
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
            <Header {menu} />
        </header>

        <main class="flex-grow overflow-y">
            <Main />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
    <Notifier bind:this={notifier} />
</Notifications>
