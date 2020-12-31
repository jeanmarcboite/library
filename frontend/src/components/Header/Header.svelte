<script>
    import Settings from "./Settings.svelte";
    import Hamburger from "./Hamburger.svelte";
    import Navbar from "./Navbar.svelte";

    export let menu = [];
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
            <Navbar {menu} />
        </ul>
        <div class="flex-grow" />
        <div class="flex flex-row flex-grow-0">
            <Settings />
        </div>
    </div>
</nav>
