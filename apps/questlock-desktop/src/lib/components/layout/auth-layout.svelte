<script lang="ts">
  export let title: string = "QuestLock";
  export let subtitle: string = "";
</script>

<div
  class="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 overflow-hidden select-none"
>
  <div
    class="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/15 rounded-full blur-[128px] pointer-events-none"
  ></div>
  <div
    class="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/15 rounded-full blur-[128px] pointer-events-none"
  ></div>
  <div
    class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
  ></div>

  <div class="relative z-10 text-center mb-6 space-y-2">
    <div
      class="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl shadow-sky-950/50 mb-1"
    >
      <svg
        class="w-8 h-8 text-sky-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"
        />
        <path d="M12 11a2 2 0 100 4 2 2 0 000-4z" />
        <path d="M12 15v2" />
      </svg>
    </div>
    <h1
      class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent"
    >
      {title}
    </h1>
    {#if subtitle}
      <p
        class="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed"
      >
        {subtitle}
      </p>
    {/if}
  </div>

  <div class="relative z-10 w-full max-w-md">
    <slot />
  </div>

  <div class="relative z-10 mt-8 text-center text-xs text-slate-600">
    &copy; {new Date().getFullYear()} QuestLock &bull; Gamified Productivity & Device
    Guard
  </div>
</div>
