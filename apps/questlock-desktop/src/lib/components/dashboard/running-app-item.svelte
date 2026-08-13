<script lang="ts">
  export let appName: string;
  export let category: string;
  export let isBlocked: boolean = false;
  export let iconUrl: string = "";
  export let onKill: () => void = () => {};
</script>

<div
  class="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-800/60 rounded-xl hover:border-slate-700/80 transition-all"
>
  <div class="flex items-center space-x-3">
    <div
      class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-700/50"
    >
      {#if iconUrl}
        <img src={iconUrl} alt={appName} class="w-6 h-6 object-contain" />
      {:else}
        <span class="text-xs font-bold text-slate-400"
          >{appName.slice(0, 2).toUpperCase()}</span
        >
      {/if}
    </div>
    <div>
      <h4 class="text-sm font-semibold text-slate-100">{appName}</h4>
      <p class="text-xs text-slate-500">{category}</p>
    </div>
  </div>

  <div class="flex items-center space-x-3">
    {#if isBlocked}
      <span
        class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20"
      >
        ● Blocked
      </span>
      <button
        on:click={onKill}
        class="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-semibold rounded-lg transition-all border border-rose-500/30"
      >
        Force Kill
      </button>
    {:else}
      <span
        class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      >
        ● Active
      </span>
    {/if}
  </div>
</div>
