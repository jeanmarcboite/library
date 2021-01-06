<script lang="ts">
    import { modalState } from "../../store";
    export let title = "Tags";
    export let datalist: string[];
    let items = datalist;
    export let tags: string[] = [];
    let tag = "";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const add = (s: string) => {
        if (!tags.includes(s)) {
            tags.push(s);
            tags = tags;
        }
        if (!datalist.includes(s)) {
            datalist.push(s);
        }
        items = datalist.filter((t) => !tags.includes(t));
        console.log(tags, items, datalist);
        tag = "";
    };
    function save() {
        dispatch("save", { tags });
        modalState.close();
    }
    function cancel() {
        dispatch("cancel", { tags });
        modalState.close();
    }

    const select = (event) => {
        console.log(event.type, event, tag);
        add(event.detail.selected);
    };
    const change = (event) => {
        console.log(event.type, event, tag);
        add(tag);
    };
    const keydown = (event) => {
        if (event.keyCode == 13) {
            console.log(event.type, event, tag);
            add(tag);
        }
        if (event.keyCode == 27) {
            tag = "";
            add(tag);
        }
    };
</script>

<datalist id="datalist">
    {#each items as item}
        <option value={item} />
    {/each}
</datalist>

<div class="relative w-full h-full text-center bg-blue-800 shadow-2xl">
    <h1 class="text-3xl font-extrabold text-center text-gray-200">{title}</h1>
    <form class="m-2 text-black" method="" action="">
        <input
            type="text"
            list="datalist"
            bind:value={tag}
            on:change={change}
            on:keydown={keydown} />
        <div class="flex flex-row mt-4">
            {#each tags as t}
                <div
                    class="inline-flex items-center px-3 py-1 ml-4 text-xs font-bold text-green-700 uppercase bg-green-200 rounded-full leading-sm">
                    {t}
                </div>
            {/each}
        </div>
    </form>
    <div class="absolute bottom-0 right-0 ">
        <button
            on:click={cancel}
            class="px-4 py-3 mr-6 font-bold text-blue-500 transition duration-300 ease-in-out border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">
            Cancel
        </button>
        <button
            on:click={save}
            class="px-4 py-3 mr-6 font-bold text-blue-500 transition duration-300 ease-in-out border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">
            Save
        </button>
    </div>
</div>
