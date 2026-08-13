<script lang="ts">
  export let quests: Array<{
    id: number;
    title: string;
    category: string;
    xp: number;
    isCompleted: boolean;
  }> = [];

  export let onToggleQuest: (id: number) => void;
</script>

<div
  class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl shadow-blue-950/20 space-y-4"
>
  <div class="flex justify-between items-center">
    <div>
      <h3 class="text-base font-bold text-slate-100">Quest Misi Hari Ini</h3>
      <p class="text-xs text-slate-400">
        Selesaikan misi untuk membongkar kunci game
      </p>
    </div>
    <span
      class="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg"
    >
      Total XP: {quests
        .filter((q) => q.isCompleted)
        .reduce((acc, q) => acc + q.xp, 0)}
    </span>
  </div>

  <div class="space-y-3">
    {#each quests as quest}
      <div
        class={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
          quest.isCompleted
            ? "bg-slate-950/40 border-slate-800/50 opacity-60"
            : "bg-slate-950/80 border-slate-800 hover:border-sky-500/40"
        }`}
      >
        <div class="flex items-center space-x-3">
          <button
            on:click={() => onToggleQuest(quest.id)}
            class={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
              quest.isCompleted
                ? "bg-emerald-500 border-emerald-500 text-slate-950"
                : "border-slate-600 hover:border-sky-400"
            }`}
          >
            {#if quest.isCompleted}
              <svg
                class="w-3.5 h-3.5 stroke-[3]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            {/if}
          </button>
          <div>
            <h4
              class={`text-sm font-semibold ${quest.isCompleted ? "line-through text-slate-500" : "text-slate-200"}`}
            >
              {quest.title}
            </h4>
            <span class="text-[11px] text-slate-500">{quest.category}</span>
          </div>
        </div>

        <span
          class="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-lg"
        >
          +{quest.xp} XP
        </span>
      </div>
    {/each}
  </div>
</div>
