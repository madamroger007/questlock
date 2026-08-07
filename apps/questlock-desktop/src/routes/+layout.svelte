<script lang="ts">
  import "./app.css";
  import { ModeWatcher } from "mode-watcher";
  let { children } = $props();
</script>

<section
  class=""
>
  <ModeWatcher />
  {@render children()}
</section>
