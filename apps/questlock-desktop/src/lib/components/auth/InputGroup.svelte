<script lang="ts">
  export let id: string;
  export let label: string = "";
  export let type: "text" | "email" | "password" = "text";
  export let value: string = "";
  export let placeholder: string = "";
  export let required: boolean = false;
  export let error: string = "";

  let showPassword = false;

  $: currentType = type === "password" ? (showPassword ? "text" : "password") : type;
</script>

<div class="space-y-1.5 w-full">
  {#if label}
    <div class="flex justify-between items-center">
      <label for={id} class="text-xs font-semibold text-slate-300 tracking-wide uppercase">
        {label}
      </label>
      <slot name="label-extra" />
    </div>
  {/if}

  <div class="relative flex items-center">
    <input
      {id}
      type={currentType}
      bind:value
      {placeholder}
      {required}
      class={`w-full px-4 py-2.5 bg-slate-950/70 border ${
        error ? 'border-red-500/80 focus:ring-red-500' : 'border-slate-800 focus:border-sky-500 focus:ring-sky-500/20'
      } rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2`}
    />

    {#if type === "password"}
      <button
        type="button"
        on:click={() => (showPassword = !showPassword)}
        class="absolute right-3 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
        tabindex="-1"
      >
        {#if showPassword}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
        {:else}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        {/if}
      </button>
    {/if}
  </div>

  {#if error}
    <p class="text-xs text-red-400 mt-1">{error}</p>
  {/if}
</div>