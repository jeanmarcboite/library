<script>
    let appInfo = { Name: "backend", Version: "0.0.0" };
    AppInfo().then((info) => (appInfo = info));
</script>

<div class="flex flex-row text-white">
    <div class="block m-2">left</div>
    <div class="flex-grow" />
    <div class="flex flex-row flex-grow-0 m-2">
        Powered by
        {appInfo.Name}, version
        {appInfo.Version}
    </div>
</div>
