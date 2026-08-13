<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils";
  let { content, children } = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger
      class={cn(buttonVariants({ variant: "ghost" }), "size-10")}
    >
      {@render children()}
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>{content}</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
