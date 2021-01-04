<script lang="ts">
    export let datalist: string[];
    let items = datalist;
    let tags: string[] = [];
    let tag = "";

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
<input
    type="text"
    list="datalist"
    bind:value={tag}
    on:change={change}
    on:keydown={keydown} />
{#each tags as t}
    <div
        class="inline-flex items-center px-3 py-1 ml-4 text-xs font-bold text-green-700 uppercase bg-green-200 rounded-full leading-sm">
        {t}
    </div>
{/each}
