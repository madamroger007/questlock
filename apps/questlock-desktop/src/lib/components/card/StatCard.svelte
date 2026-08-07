<script lang="ts">
  export let title: string = '';
  export let value: string = '';
  export let subtitle: string = '';
  export let badgeText: string = '';
  export let badgeType: 'success' | 'warning' | 'danger' | 'info' = 'info';

  const badgeStyles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20'
  };
</script>

<div class="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl hover:border-slate-700 transition-all">
  <div class="flex justify-between items-start mb-3">
    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
    {#if badgeText}
      <span class={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyles[badgeType]}`}>
        {badgeText}
      </span>
    {/if}
  </div>

  <div class="text-2xl font-bold text-slate-100 tracking-tight">
    {value}
  </div>

  {#if subtitle}
    <p class="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
  {/if}
</div>