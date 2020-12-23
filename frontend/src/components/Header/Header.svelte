<script>
    import Hamburger from "./Hamburger.svelte";
    import TiCog from "svelte-icons/ti/TiCog.svelte";
    import Menu from "./Navbar.svelte";
</script>

<style>
    .icon {
        color: red;
        width: 32px;
        height: 32px;
    }
</style>

<div class="bg-header-700">
    <nav>
        <div class="flex flex-row">
            <div class="block m-2 sm:hidden">
                <Hamburger />
            </div>
            <ul class="hidden sm:flex sm:flex-row" id="mobileMenu">
                <Menu />
            </ul>
            <div class="flex-grow" />
            <div class="flex flex-row flex-grow-0">
                <button class="flex-grow-0 m-2 icon">
                    <TiCog />
                </button>
            </div>
        </div>
    </nav>
</div>
