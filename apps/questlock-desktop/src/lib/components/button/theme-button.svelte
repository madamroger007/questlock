<script lang="ts">
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SunIcon from "@lucide/svelte/icons/sun";
  import { mode, toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
  function handleThemeToggle() {
    // Cek apakah browser mendukung View Transitions API
    if (!document.startViewTransition) {
      toggleMode(); // Fallback untuk browser jadul
      return;
    }

    // Jalankan animasi transisi native browser
    document.startViewTransition(() => {
      toggleMode();
    });
  }
</script>

<Button onclick={handleThemeToggle} variant="ghost" size="icon">
  <SunIcon
    class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
  />
  <MoonIcon
    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
