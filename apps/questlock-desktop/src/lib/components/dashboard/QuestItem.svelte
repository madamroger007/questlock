<script lang="ts">
  export let title: string;
  export let xpReward: number;
  export let category: string;
  export let isCompleted: boolean = false;
  export let onToggle: () => void = () => {};
</script>

<div
  class={`flex items-center justify-between p-4 rounded-xl border transition-all ${
    isCompleted
      ? "bg-slate-900/40 border-slate-800/40 opacity-60"
      : "bg-slate-900/90 border-slate-800 hover:border-sky-500/40"
  }`}
>
  <div class="flex items-center space-x-3">
    <button
      on:click={onToggle}
      class={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
        isCompleted
          ? "bg-emerald-500 border-emerald-500 text-slate-950"
          : "border-slate-600 hover:border-sky-400"
      }`}
    >
      {#if isCompleted}
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
        class={`text-sm font-semibold ${isCompleted ? "line-through text-slate-500" : "text-slate-200"}`}
      >
        {title}
      </h4>
      <span class="text-[11px] text-slate-500">{category}</span>
    </div>
  </div>

  <div class="flex items-center space-x-2">
    <span
      class="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-lg"
    >
      +{xpReward} XP
    </span>
  </div>
</div>
