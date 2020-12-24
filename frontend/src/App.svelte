<script>
    import Header from "./components/Header";
    import Footer from "./components/Footer";
    import Tailwind from "./Tailwind.svelte";
    import Notifications from "svelte-notifications";
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
            <Header />
        </header>

        <main class="flex-grow overflow-y" />
        <footer>
            <Footer />
        </footer>
    </div>
</Notifications>
