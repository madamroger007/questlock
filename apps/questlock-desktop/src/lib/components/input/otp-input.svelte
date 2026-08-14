<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp";
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
  export let value: string = "";
  export let length: number = 6;
</script>

<div class="flex justify-center my-4">
  <InputOTP.Root
    bind:value
    maxlength={length}
    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
  >
    {#snippet children({ cells })}
      <InputOTP.Group class="flex gap-2 sm:gap-3">
        {#each cells as cell (cell)}
          <InputOTP.Slot {cell} class="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-slate-950 border border-slate-800 rounded-xl text-sky-400 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all"/>
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>
</div>

