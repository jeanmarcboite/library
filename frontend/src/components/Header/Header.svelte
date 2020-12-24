<script>
    import Hamburger from "./Hamburger.svelte";
    import TiCog from "svelte-icons/ti/TiCog.svelte";
    import Navbar from "./Navbar.svelte";

    AppInfo().then(console.log);
</script>

<style>
    .icon {
        color: red;
        width: 32px;
        height: 32px;
    }
    .menu {
        background-color: #376e6f;
        color: floralwhite;
    }
</style>

<nav class="menu">
    <div class="flex flex-row">
        <div class="block m-2 sm:hidden">
            <Hamburger />
        </div>
        <ul class="hidden sm:flex sm:flex-row" id="mobileMenu">
            <Navbar />
        </ul>
        <div class="flex-grow" />
        <div class="flex flex-row flex-grow-0">
            <button class="flex-grow-0 m-2 icon">
                <TiCog />
            </button>
        </div>
    </div>
</nav>
