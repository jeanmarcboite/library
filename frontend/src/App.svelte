<script>
    import Header from "./components/Header";
    import Tailwind from "./Tailwind.svelte";
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
        background-color: cornflowerblue;
    }

    footer {
        width: 100%;
        background-color: darkgoldenrod;
    }
</style>

<Tailwind />
<div id="app" class="flex flex-col w-screen">
    <header>
        <Header />
    </header>

    <main class="flex-grow overflow-y">main</main>
    <footer>Footer</footer>
</div>
