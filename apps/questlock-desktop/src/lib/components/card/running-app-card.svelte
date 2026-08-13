<script lang="ts">
  export let runningApps: Array<{
    id: number;
    name: string;
    category: string;
    isBlocked: boolean;
    cpuUsage: string;
  }> = [];

  export let onKillApp: (appName: string) => void;
</script>

<div
  class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl shadow-blue-950/20 space-y-4"
>
  <div class="flex justify-between items-center">
    <div>
      <h3 class="text-base font-bold text-slate-100">
        Aplikasi Berjalan di Perangkat
      </h3>
      <p class="text-xs text-slate-400">Monitoring Process Real-Time Agent</p>
    </div>
    <span
      class="px-2.5 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-lg text-xs font-bold"
    >
      {runningApps.length} Aktif
    </span>
  </div>

  <div class="space-y-3">
    {#each runningApps as app}
      <div
        class="flex items-center justify-between p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-all"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center font-bold text-xs text-sky-400"
          >
            {app.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 class="text-sm font-semibold text-slate-100">{app.name}</h4>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[11px] text-slate-400">{app.category}</span>
              <span class="text-[10px] text-slate-500"
                >• CPU: {app.cpuUsage}</span
              >
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          {#if app.isBlocked}
            <span
              class="text-xs font-semibold px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-lg flex items-center gap-1.5"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"
              ></span> Blocked
            </span>
            <button
              on:click={() => onKillApp(app.name)}
              class="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-rose-600/20 active:scale-95"
            >
              Kill Process
            </button>
          {:else}
            <span
              class="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg"
            >
              Allowed
            </span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
