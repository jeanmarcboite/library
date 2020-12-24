<script>
    let appInfo = { Name: "backend", Version: "0.0.0" };
    AppInfo().then((info) => (appInfo = info));
</script>

<div class="flex flex-row text-gray-500">
    <div class="block m-2">Copyright &copy; 2020 — WTFPL</div>
    <div class="flex-grow" />
    <div class="flex flex-row flex-grow-0 m-2">
        Powered by
        <span class="text-red-600">{appInfo.Name}</span>, version
        <span class="text-green-600">{appInfo.Version}</span>
    </div>
</div>
