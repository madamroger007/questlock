<script lang="ts">
  export let chartTitle: string = 'Aktivitas Penggunaan Perangkat (Jam)';

  const weeklyData = [
    { day: 'Sen', focus: 3.5, game: 1.2 },
    { day: 'Sel', focus: 4.2, game: 0.8 },
    { day: 'Rab', focus: 2.8, game: 2.5 },
    { day: 'Kam', focus: 5.0, game: 0.5 },
    { day: 'Jum', focus: 4.5, game: 1.0 },
    { day: 'Sab', focus: 6.0, game: 3.0 },
    { day: 'Min', focus: 3.0, game: 2.0 }
  ];

  const maxHours = 7;
</script>

<div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl shadow-blue-950/20">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h3 class="text-base font-bold text-slate-100">{chartTitle}</h3>
      <p class="text-xs text-slate-400">Rasio Waktu Fokus vs Bermain Game Minggu Ini</p>
    </div>
    
    <div class="flex items-center space-x-4 text-xs font-medium">
      <div class="flex items-center space-x-1.5">
        <span class="w-3 h-3 rounded-sm bg-sky-500"></span>
        <span class="text-slate-300">Waktu Fokus</span>
      </div>
      <div class="flex items-center space-x-1.5">
        <span class="w-3 h-3 rounded-sm bg-rose-500/80"></span>
        <span class="text-slate-300">Waktu Game</span>
      </div>
    </div>
  </div>

  <div class="h-48 flex items-end justify-between gap-3 pt-4 border-b border-slate-800/80 pb-2">
    {#each weeklyData as item}
      <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
        <div class="w-full flex items-end justify-center gap-1 h-full px-1">
          <div
            style={`height: ${(item.focus / maxHours) * 100}%`}
            class="w-1/2 bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md transition-all duration-500 group-hover:brightness-125"
            title={`Fokus: ${item.focus} Jam`}
          ></div>
          <div
            style={`height: ${(item.game / maxHours) * 100}%`}
            class="w-1/2 bg-gradient-to-t from-rose-700 to-rose-500/80 rounded-t-md transition-all duration-500 group-hover:brightness-125"
            title={`Game: ${item.game} Jam`}
          ></div>
        </div>
        <span class="text-[11px] font-semibold text-slate-400">{item.day}</span>
      </div>
    {/each}
  </div>
</div>