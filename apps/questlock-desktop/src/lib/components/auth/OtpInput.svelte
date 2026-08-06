<script lang="ts">
  export let value: string = "";
  export let length: number = 6;

  let inputs: HTMLInputElement[] = [];
  let digits: string[] = Array(length).fill("");

  function handleInput(index: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const val = target.value.slice(-1);
    digits[index] = val;

    if (val && index < length - 1) {
      inputs[index + 1]?.focus();
    }
    value = digits.join("");
  }

  function handleKeyDown(index: number, e: KeyboardEvent) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs[index - 1]?.focus();
    }
  }
</script>

<div class="flex justify-center gap-2 sm:gap-3 my-4">
  {#each Array(length) as _, i}
    <input
      bind:this={inputs[i]}
      type="text"
      maxlength="1"
      value={digits[i]}
      on:input={(e) => handleInput(i, e)}
      on:keydown={(e) => handleKeyDown(i, e)}
      class="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-slate-950 border border-slate-800 rounded-xl text-sky-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
    />
  {/each}
</div>
