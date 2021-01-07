<script lang="ts">
    import { modalState } from "../../store";
    export let title = "Tags";
    export let datalist: string[];
    let items = datalist;
    export let tags: string[] = [];
    let tag = "";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const update = (s: string) => {
        if (!datalist.includes(s)) {
            datalist.push(s);
        }
        items = datalist.filter((t) => !tags.includes(t));
    };

    const add = (s: string) => {
        if (!tags.includes(s)) {
            tags.push(s);
            tags = tags;
        }
        update(s);
        tag = "";
    };

    const remove = (s: string) => {
        if (tags.includes(s)) {
            tags = tags.filter((t) => t !== s);
            update(s);
        }
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
        // enter
        if (event.keyCode == 13) {
            add(tag);
        }
        // escape
        if (event.keyCode == 27) {
            tag = "";
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
                    class="relative inline-flex items-center px-3 py-1 ml-4 text-xs font-bold text-green-700 uppercase bg-green-200 rounded-full leading-sm">
                    <span class="mr-4">{t}</span>
                    <span class="absolute right-0" on:click={() => remove(t)}>
                        <svg
                            class="w-6 h-6 text-red-400 fill-current"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"><title>Remove</title>
                            <path
                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
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
