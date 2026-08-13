<script lang="ts">
  export let title: string = '';
  export let value: string = '';
  export let subtitle: string = '';
  export let badgeText: string = '';
  export let badgeType: 'success' | 'warning' | 'danger' | 'info' = 'info';
  export let sparklineData: number[] = [20, 35, 25, 45, 30, 60, 55, 80]; // Data titik grafik

  const badgeStyles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/30'
  };

  // Kalkulasi sederhana untuk path SVG Sparkline
  $: maxVal = Math.max(...sparklineData, 1);
  $: points = sparklineData
    .map((val, idx) => `${(idx / (sparklineData.length - 1)) * 120},${40 - (val / maxVal) * 32}`)
    .join(' ');
  $: areaPath = `M 0 40 L ${points} L 120 40 Z`;
</script>

<div class="relative overflow-hidden bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl shadow-xl shadow-blue-950/20 hover:border-sky-500/30 transition-all duration-300">
  <div class="flex justify-between items-start mb-2">
    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
    {#if badgeText}
      <span class={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyles[badgeType]}`}>
        {badgeText}
      </span>
    {/if}
  </div>

  <div class="flex items-end justify-between mt-2">
    <div>
      <div class="text-2xl font-extrabold text-slate-100 tracking-tight">
        {value}
      </div>
      {#if subtitle}
        <p class="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
      {/if}
    </div>

    <div class="w-28 h-10">
      <svg class="w-full h-full overflow-visible" viewBox="0 0 120 40">
        <defs>
          <linearGradient id={`grad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#grad-${title.replace(/\s+/g, '')})`} />
        <polyline
          fill="none"
          stroke="#38bdf8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          points={points}
        />
      </svg>
    </div>
  </div>
</div>